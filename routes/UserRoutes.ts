// src/routes/userRoutes.ts
import express from 'express';
import { signup } from '../controllers/UserController';

const router = express.Router();

router.post('/signup', signup);

export default router;
