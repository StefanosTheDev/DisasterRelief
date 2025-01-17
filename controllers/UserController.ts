import { Request, Response, NextFunction } from 'express';
import { registerUser } from '../service/UserService';

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await registerUser(req.body);

    return res.status(201).json({
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
}
