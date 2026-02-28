import { Router } from 'express';
import { taskController } from '../controllers/taskController';
import {
  createTaskValidation,
  updateTaskValidation,
  idParamValidation,
  paginationValidation,
} from '../middleware/validation';
import { handleValidationErrors } from '../middleware/errorHandler';

const router = Router();

// Create a new task
router.post(
  '/',
  createTaskValidation,
  handleValidationErrors,
  taskController.createTask
);

// Get all tasks
router.get(
  '/',
  paginationValidation,
  handleValidationErrors,
  taskController.getAllTasks
);

// Get task by ID
router.get(
  '/:id',
  idParamValidation,
  handleValidationErrors,
  taskController.getTaskById
);

// Update task
router.put(
  '/:id',
  updateTaskValidation,
  handleValidationErrors,
  taskController.updateTask
);

// Delete task
router.delete(
  '/:id',
  idParamValidation,
  handleValidationErrors,
  taskController.deleteTask
);

// Get tasks by project
router.get(
  '/project/:projectId',
  idParamValidation,
  handleValidationErrors,
  taskController.getTasksByProject
);

export default router;
