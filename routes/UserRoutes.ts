import express from 'express';
import { signup, login } from '../controllers/UserController';
import { authSchema, loginSchema } from '../zodSchemas/auth_schema';
import { validate } from '../middleware/validationMiddleware';

const router = express.Router();

// Use the validate middleware with the schema
router.post('/signup', validate(authSchema), signup);
router.post('/login', validate(loginSchema), login);
export default router;
