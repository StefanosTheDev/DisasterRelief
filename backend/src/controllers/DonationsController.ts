import { Request, Response, NextFunction } from 'express';
import { _createCampaign } from '../service/DonationService';
import { UserRequest } from '../types/index';

export async function createCampaign(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const campaign = await _createCampaign({
      userId: req.user?.id,
      ...req.body,
    });
    res.status(201).json({
      message: 'Campaign Created',
      campaign,
    });
  } catch (error) {
    next(error);
  }
}
