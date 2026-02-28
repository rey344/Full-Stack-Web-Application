import { Request, Response, NextFunction } from 'express';
import { taskService } from '../services/taskService';
import { sendSuccess, sendError } from '../utils/response';
import { logger } from '../utils/logger';

export const taskController = {
  // Create a new task
  async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskData = req.body;
      const task = await taskService.createTask(taskData);
      
      logger.info(`Task created: ${task.id}`);
      sendSuccess(res, task, 'Task created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  // Get task by ID
  async getTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const task = await taskService.getTaskById(id);

      if (!task) {
        sendError(res, 'Task not found', 'NOT_FOUND', 404);
        return;
      }

      sendSuccess(res, task);
    } catch (error) {
      next(error);
    }
  },

  // Get all tasks
  async getAllTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const filters = {
        project_id: req.query.project_id ? parseInt(req.query.project_id as string) : undefined,
        status: req.query.status as string,
        priority: req.query.priority as string,
      };

      const { tasks, total } = await taskService.getAllTasks(filters, page, limit);

      sendSuccess(res, {
        tasks,
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

  // Update task
  async updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;

      const task = await taskService.updateTask(id, updates);

      if (!task) {
        sendError(res, 'Task not found', 'NOT_FOUND', 404);
        return;
      }

      logger.info(`Task updated: ${id}`);
      sendSuccess(res, task, 'Task updated successfully');
    } catch (error) {
      next(error);
    }
  },

  // Delete task
  async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await taskService.deleteTask(id);

      if (!deleted) {
        sendError(res, 'Task not found', 'NOT_FOUND', 404);
        return;
      }

      logger.info(`Task deleted: ${id}`);
      sendSuccess(res, null, 'Task deleted successfully');
    } catch (error) {
      next(error);
    }
  },

  // Get tasks by project
  async getTasksByProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projectId = parseInt(req.params.projectId);
      const tasks = await taskService.getTasksByProject(projectId);

      sendSuccess(res, tasks);
    } catch (error) {
      next(error);
    }
  },
};
