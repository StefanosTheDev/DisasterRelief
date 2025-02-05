import { Request, Response, NextFunction } from 'express';
import { UserRequest } from '../types/index';
import {
  getUserRecords,
  updateUserRecordByID,
  softDeleteUserRecord,
  getUserRecordByID,
} from '../service/userService';
import AppError from '../error/appError';
/**
 * This file is served to only handle operations related to User.
 */
export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const allusers = await getUserRecords();
    res.status(200).json({
      status: 'success',
      data: allusers,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserByID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userObj = { ...req.params, ...req.body };
    const user = await updateUserRecordByID(userObj);
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserByID(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await getUserRecordByID(req.params);
    console.log('User Found In Controller', user);
    res.status(200).json({
      status: 'User Found',
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function softDeleteUserByID(
  req: UserRequest,
  // Explicitly Type Req.params
  res: Response,
  next: NextFunction
) {
  try {
    // Review and make my case for this.
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError('Could not find user.id on the request', 400);
    }
    const delUser = await softDeleteUserRecord({ userId });
    res.status(200).json({
      status: 'User Deleted',
      data: delUser,
    });
  } catch (error) {
    next(error);
  }
}
