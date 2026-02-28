import { Request, Response, NextFunction } from 'express';
import { projectService } from '../services/projectService';
import { sendSuccess, sendError } from '../utils/response';
import { logger } from '../utils/logger';

export const projectController = {
  // Create a new project
  async createProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projectData = req.body;
      const project = await projectService.createProject(projectData);
      
      logger.info(`Project created: ${project.id}`);
      sendSuccess(res, project, 'Project created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  // Get project by ID
  async getProjectById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const project = await projectService.getProjectById(id);

      if (!project) {
        sendError(res, 'Project not found', 'NOT_FOUND', 404);
        return;
      }

      sendSuccess(res, project);
    } catch (error) {
      next(error);
    }
  },

  // Get all projects
  async getAllProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const filters = {
        user_id: req.query.user_id ? parseInt(req.query.user_id as string) : undefined,
        status: req.query.status as string,
      };

      const { projects, total } = await projectService.getAllProjects(filters, page, limit);

      sendSuccess(res, {
        projects,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Update project
  async updateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;

      const project = await projectService.updateProject(id, updates);

      if (!project) {
        sendError(res, 'Project not found', 'NOT_FOUND', 404);
        return;
      }

      logger.info(`Project updated: ${id}`);
      sendSuccess(res, project, 'Project updated successfully');
    } catch (error) {
      next(error);
    }
  },

  // Delete project
  async deleteProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await projectService.deleteProject(id);

      if (!deleted) {
        sendError(res, 'Project not found', 'NOT_FOUND', 404);
        return;
      }

      logger.info(`Project deleted: ${id}`);
      sendSuccess(res, null, 'Project deleted successfully');
    } catch (error) {
      next(error);
    }
  },

  // Get projects by user
  async getProjectsByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const projects = await projectService.getProjectsByUser(userId);

      sendSuccess(res, projects);
    } catch (error) {
      next(error);
    }
  },
};
