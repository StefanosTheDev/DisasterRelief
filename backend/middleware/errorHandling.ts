import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import AppError from '../error/AppError';

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
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Log error to file in production
    const errorLog = `Time: ${new Date().toISOString()}\nError: ${
      err.message
    }\nStatus: ${err.statusCode || 500}\nStack: ${err.stack}\n\n`;

    try {
      fs.appendFileSync(
        '/Users/stefanossophocleous/Desktop/CEO Developers/CEO-Developers/backend/logs/prod_errors.log',
        errorLog
      );
    } catch (loggingError) {
      console.error('Failed to write to log file', loggingError);
    }

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

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err } as AppError;

    // Handle specific AppError instances
    if (err instanceof AppError) {
      error = err;
    }

    sendErrorProd(error, res);
  }
}
