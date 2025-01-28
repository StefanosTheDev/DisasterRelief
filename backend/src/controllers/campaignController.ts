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
    const { id } = req.params;

    const delCampaign = await deleteCampaignRecordByID({
      userId: req.user?.id as string,
      id,
    });
    res.status(200).json({
      message: 'Campaign Delete',
      data: delCampaign,
    });
  } catch (error) {
    next(error);
  }
}
