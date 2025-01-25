import express from 'express';
import { createCampaign } from '../controllers/DonationsController';
import { protect } from '../jwt/jwtSecurity';
const router = express.Router();

router.route('/:id').post(protect, createCampaign);
export default router;
