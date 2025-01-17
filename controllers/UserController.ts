import { Request, Response, NextFunction } from 'express';
import { registerUser } from '../service/UserService';

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await registerUser(req.body);

    res.status(201).json({
      message: 'User created successfully',
      data: newUser,
    }); // No explicit `return`
  } catch (error) {
    next(error); // Pass the error to Express error handling middleware
  }
}
