import express from 'express';
import {
  softDeleteUserByID,
  getUserByID,
  getUsers,
  updateUserByID,
} from '../controllers/userController';
import { userSchema, validateIDSchema } from '../zodSchemas/userSchema';
import { validate } from '../middleware/validationMiddleware';
import { protect } from '../jwt/jwtSecurity';

const router = express.Router();

// Routes
router
  .route('/')
  .put(protect, validate(userSchema), updateUserByID)
  .get(protect, getUserByID)
  .delete(protect, softDeleteUserByID);

router.get('/users', protect, getUsers);
export default router;
