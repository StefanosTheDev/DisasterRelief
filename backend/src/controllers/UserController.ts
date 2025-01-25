import { Request, Response, NextFunction } from 'express';
import {
  registerUser,
  loginUser,
  forgotUsername,
  getUsers,
} from '../service/UserService';
import { logoutUser } from '../service/UserService';

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await registerUser(req.body);
    res.status(201).json({
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    next(error); // Pass the error to Express error handling middleware
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await loginUser(req.body);
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

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getUsers();
    res.status(200).json({
      message: 'All Users',
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

// export async function searchByID(
//   req: Request<{ id: string }>,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const getUserByID = await searchUserByID(req.params);

//     res.status(200).json({
//       message: 'Item found.',
//       data: {
//         getUserByID,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// }
