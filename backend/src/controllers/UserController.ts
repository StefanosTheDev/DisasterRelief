import { Request, Response, NextFunction } from 'express';
import { UserRequest } from '../types/index';
import {
  getUserRecords,
  updateUserRecordByID,
  deleteUserRecordByID,
  getUserRecordByID,
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

export async function deleteUserByID(
  req: Request<{ id: string }>, // Explicitly Type Req.params
  res: Response,
  next: NextFunction
) {
  try {
    const delUser = await deleteUserRecordByID(req.params);
    res.status(200).json({
      status: 'User Deleted',
      data: delUser,
    });
  } catch (error) {
    next(error);
  }
}
