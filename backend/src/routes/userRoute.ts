import express from 'express';
import {
  deleteUserByID,
  getUserByID,
  getUsers,
  updateUserByID,
} from '../controllers/userController';
import { userSchema } from '../zodSchemas/userSchema';
import { validate } from '../middleware/validationMiddleware';
import { protect } from '../jwt/jwtSecurity';
import { authSchema, loginSchema } from '../zodSchemas/authSchema';

const router = express.Router();

// Routes
router
  .route('/:id')
  .put(protect, validate(userSchema), updateUserByID)
  .get(getUserByID)
  .delete(deleteUserByID);
router.get('/', getUsers);

export default router;
