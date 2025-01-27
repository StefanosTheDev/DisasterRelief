import { Request, Response, NextFunction } from 'express';
import { UserRequest } from '../types/index';
import {
  getUserRecords,
  updateUserRecordByID,
  deleteUserRecordByID,
} from '../service/userService';

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
  req: UserRequest,
  res: Response,
  next: NextFunction
) {}

export async function deleteUserByID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const delUser = await deleteUserRecordByID(req.params);
    res.status(200).json({
      status: 'User Deleted',
    });
  } catch (error) {
    next(error);
  }
}
