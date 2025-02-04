import express from 'express';
import { signup, login, logout } from '../controllers/authController';
import { authSchema, loginSchema } from '../zodSchemas/authSchema';
import { validate } from '../middleware/validationMiddleware';
import { registerLimiter } from '../utils/ratelimit';

const router = express.Router();

// Use the validate middleware with the schema
router.post('/signup', validate(authSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);

export default router;
