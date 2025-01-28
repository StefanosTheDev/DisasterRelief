import express from 'express';
import {
  createCampaign,
  deleteCampaignByID,
} from '../controllers/campaignController';
import { protect } from '../jwt/jwtSecurity';
const router = express.Router();

router
  .route('/:id')
  .post(protect, createCampaign)
  .delete(protect, deleteCampaignByID);
export default router;
