import { Request, Response, NextFunction } from 'express';
import { createUserRecord, validateUserRecord } from '../service/authService';

/**
 * This file is served to only handle authentication process.
 */

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await createUserRecord(req.body);
    res.status(201).json({
      message: 'User Registered',
      data: newUser,
    });
  } catch (error) {
    next(error); // Pass the error to Express error handling middleware
  }
}
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await validateUserRecord(req.body);
    res.status(200).json({
      message: 'User Logged In!',
      data,
    });
  } catch (error) {
    next(error);
  }
}
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ message: 'Successfully logged out.' });
  } catch (error) {
    next(error);
  }
}
