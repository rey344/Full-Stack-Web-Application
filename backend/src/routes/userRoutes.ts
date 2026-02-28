import { Router } from 'express';
import { userController } from '../controllers/userController';
import {
  createUserValidation,
  updateUserValidation,
  idParamValidation,
  paginationValidation,
} from '../middleware/validation';
import { handleValidationErrors } from '../middleware/errorHandler';

const router = Router();

// Create a new user
router.post(
  '/',
  createUserValidation,
  handleValidationErrors,
  userController.createUser
);

// Get all users
router.get(
  '/',
  paginationValidation,
  handleValidationErrors,
  userController.getAllUsers
);

// Get user by ID
router.get(
  '/:id',
  idParamValidation,
  handleValidationErrors,
  userController.getUserById
);

// Update user
router.put(
  '/:id',
  updateUserValidation,
  handleValidationErrors,
  userController.updateUser
);

// Delete user
router.delete(
  '/:id',
  idParamValidation,
  handleValidationErrors,
  userController.deleteUser
);

export default router;
