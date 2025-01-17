import { Request, Response, NextFunction } from 'express';
import {
  registerUser,
  loginUser,
  forgotUsername,
  forgotPassword,
  resetPassword,
} from '../service/UserService';
import { logoutUser } from '../service/UserService';

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

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    // Pass the raw header to the service; validation happens in the service
    await logoutUser(authHeader);

    res.status(200).json({ message: 'Successfully logged out.' });
  } catch (error) {
    next(error);
  }
}
export async function forgotUsernameController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;
    await forgotUsername(email);
    res.status(200).json({ message: 'Username has been sent to your email.' });
  } catch (error) {
    next(error);
  }
}

export async function forgotPasswordController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;
    await forgotPassword(email);
    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
    next(error);
  }
}

export async function resetPasswordController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { token, newPassword } = req.body;
    await resetPassword(token, newPassword);
    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    next(error);
  }
}
