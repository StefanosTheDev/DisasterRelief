import { Response, NextFunction } from 'express';
import { createCampaignRecord } from '../service/donationService';
import { UserRequest } from '../types/index';

export async function createCampaign(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const campaign = await createCampaignRecord({
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
