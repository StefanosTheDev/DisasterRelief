import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../service/UserService';

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

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { user, token } = await loginUser(req.body);
    res.status(200).json({
      message: 'User Logged In!',
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}
