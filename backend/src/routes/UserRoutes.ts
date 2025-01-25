import express from 'express';
import {
  signup,
  login,
  logout,
  forgotUsernameController,
  getAllUsers,
} from '../controllers/UserController';
import { authSchema, loginSchema } from '../zodSchemas/auth_schema';
import { validate } from '../middleware/validationMiddleware';
import {
  globalLimiter,
  registerLimiter,
  loginLimiter,
} from '../utils/ratelimit';

const router = express.Router();
// Use the validate middleware with the schema
router.post('/signup', registerLimiter, validate(authSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);

router.post('/forgot-username', forgotUsernameController);
router.get('/allusers', getAllUsers);
export default router;
