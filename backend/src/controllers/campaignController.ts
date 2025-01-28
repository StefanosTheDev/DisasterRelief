import { Request, Response, NextFunction } from 'express';
import {
  createCampaignRecord,
  deleteCampaignRecordByID,
  getAllCampaignRecords,
} from '../service/campaignService';
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

export async function getAllCampaigns(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const campaigns = await getAllCampaignRecords();
    res.status(200).json({
      message: 'Campaigns Fetched',
      data: campaigns,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteCampaignByID(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Understand why this didnt work they i wanted with spread.
    // TypeScript infers the type of req.user.id to be string | undefined
    if (!req.user?.id) throw new Error('Could not find user.id on the request');

    const delCampaign = await deleteCampaignRecordByID({
      userId: req.user.id,
      id: req.params.id,
    });
    res.status(200).json({
      message: 'Campaign Delete',
      data: delCampaign,
    });
  } catch (error) {
    next(error);
  }
}
