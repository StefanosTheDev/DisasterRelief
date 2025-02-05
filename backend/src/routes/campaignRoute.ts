import express from 'express';
import { createCampaign } from '../controllers/campaignController';
import { protect } from '../jwt/jwtSecurity';
const router = express.Router();

router.route('/').post(protect, createCampaign);
export default router;
