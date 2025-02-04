import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import AppError from '../error/appError';
import { Prisma } from '@prisma/client';

/**
 * Handles errors in development mode by sending detailed error responses.
 * @param err - The error object.
 * @param res - The Express response object.
 */
const sendErrorDev = (err: AppError, res: Response): void => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * Handles errors in production mode by sending sanitized error responses.
 * If the error is not operational, it logs the error and sends a generic message.
 * @param err - The error object.
 * @param res - The Express response object.
 */
const sendErrorProd = (err: AppError, res: Response): void => {
  // Operational errors: Send a meaningful message
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or unknown errors: Don't leak error details
    console.error('ERROR 💥:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

/**
 * Global error handling middleware for Express.
 * Differentiates between development and production modes.
 */
export function globalErrorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Set default error properties
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Check for Prisma DB errors and wrap them in an AppError (Database connectivity issues)
  if (err instanceof Prisma.PrismaClientInitializationError) {
    err = new AppError(
      'Database connection error: Unable to reach the database. Please try again later.',
      503
    );
  }

  // Handle different environments
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
}

/**
 * Parse a caught Prisma error on the service level and return a formatted message depending on the error code.
 */
export const parsePrismaError = function <T extends Error | unknown>({
  error,
  codes,
}: {
  error: T;
  codes: Record<
    string,
    Error | ((e: Prisma.PrismaClientKnownRequestError) => Error)
  >;
}): T | Error {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return error;
  }

  const codeHandler = codes[error.code];
  if (!codeHandler) return error;

  return codeHandler instanceof Error ? codeHandler : codeHandler(error);
};
