import express from 'express';
import { getUsers, updateUserByID } from '../controllers/userController';

const router = express.Router();

// Routes
router.route('/:id').put(updateUserByID).get(getUsers);
router.get('/', getUsers);

export default router;
