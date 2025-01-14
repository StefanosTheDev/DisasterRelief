import { Request, Response, NextFunction } from 'express';
import { UserService } from '../service/UserService';

export class UserController {
  public static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await UserService.signUp(req.body);

      return res.status(201).json({
        message: 'User created successfully',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
