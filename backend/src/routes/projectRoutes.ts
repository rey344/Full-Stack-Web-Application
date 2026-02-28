import { Router } from 'express';
import { projectController } from '../controllers/projectController';
import {
  createProjectValidation,
  updateProjectValidation,
  idParamValidation,
  paginationValidation,
} from '../middleware/validation';
import { handleValidationErrors } from '../middleware/errorHandler';

const router = Router();

// Create a new project
router.post(
  '/',
  createProjectValidation,
  handleValidationErrors,
  projectController.createProject
);

// Get all projects
router.get(
  '/',
  paginationValidation,
  handleValidationErrors,
  projectController.getAllProjects
);

// Get project by ID
router.get(
  '/:id',
  idParamValidation,
  handleValidationErrors,
  projectController.getProjectById
);

// Update project
router.put(
  '/:id',
  updateProjectValidation,
  handleValidationErrors,
  projectController.updateProject
);

// Delete project
router.delete(
  '/:id',
  idParamValidation,
  handleValidationErrors,
  projectController.deleteProject
);

// Get projects by user
router.get(
  '/user/:userId',
  idParamValidation,
  handleValidationErrors,
  projectController.getProjectsByUser
);

export default router;
