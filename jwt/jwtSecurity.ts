// authController.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import AppError from '../error/AppError';
import prisma from '../prisma/prismaClient';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/config';
import { isBlacklisted } from './tokenBlacklist';
// 1. Sign token (remains async because the rest of your flow is likely async)
export async function signToken(userId: string) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// 2. Protect middleware
export async function protect(req: Request, res: Response, next: NextFunction) {
  try {
    // 2a. Get token from Authorization header
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      return next(new AppError('This route is protected. Please log in.', 401));
    }

    const token = req.headers.authorization.split(' ')[1]; // after "Bearer"

    // 2. Check if the token is blacklisted
    if (isBlacklisted(token)) {
      throw new AppError(
        'Token has been invalidated. Please log in again.',
        401
      );
    }

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
    req.user = currentUser;
    return next();
  } catch (error) {
    // Any errors from jwt.verify or DB calls will end up here
    return next(error);
  }
}
