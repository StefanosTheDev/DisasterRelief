import { Request, Response, NextFunction } from 'express';
import { UserRequest } from '../types/index';

/**
 * This file is served to only handle operations related to User.
 */

export async function getUsers() {}

export async function updateUserRecord() {}

export async function getUserByID(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {}
