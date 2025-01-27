// authController.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserRequest } from '../types/index';
import AppError from '../error/appError';
import prisma from '../prisma/prismaClient';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/config';

// 1. Sign token (remains async because the rest of your flow is likely async)
export async function signToken(userId: string) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// 2. Protect middleware
export async function protect(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // 2a. Get token from Authorization header
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      return next(new AppError('This route is protected. Please log in.', 401));
    }

    const token = req.headers.authorization.split(' ')[1]; // after "Bearer"

    // 2b. Verify token synchronously
    //    - If invalid, it will throw an error that we catch below.
    const decoded = jwt.verify(token, JWT_SECRET);

    // 2c. Ensure the decoded payload has an 'id' (it might be string or object)
    if (typeof decoded !== 'object' || !('id' in decoded)) {
      return next(new AppError('Token invalid: missing user ID.', 401));
    }

    // 2d. Check if the user still exists in DB
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id as string },
    });
    if (!currentUser) {
      return next(new AppError('No user found with this token.', 401));
    }
    req.user = currentUser; // REview the notion doc i made.
    return next();
  } catch (error) {
    // Any errors from jwt.verify or DB calls will end up here
    return next(error);
  }
}
