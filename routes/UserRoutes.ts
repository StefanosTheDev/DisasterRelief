import express from 'express';
import {
  signup,
  login,
  logout,
  forgotUsernameController,
  forgotPasswordController,
  resetPasswordController,
} from '../controllers/UserController';
import { authSchema, loginSchema } from '../zodSchemas/auth_schema';
import { validate } from '../middleware/validationMiddleware';

const router = express.Router();

// Use the validate middleware with the schema
router.post('/signup', validate(authSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);

router.post('/forgot-username', forgotUsernameController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);
export default router;
