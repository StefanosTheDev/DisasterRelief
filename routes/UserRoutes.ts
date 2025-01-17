import express from 'express';
import { signup } from '../controllers/UserController';
import { authSchema } from '../zodSchemas/auth_schema';
import { validate } from '../middleware/validationMiddleware';

const router = express.Router();

// Use the validate middleware with the schema
router.post('/signup', validate(authSchema), signup);

export default router;
