import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';
import { sendSuccess, sendError } from '../utils/response';
import { logger } from '../utils/logger';

export const userController = {
  // Create a new user
  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, name } = req.body;

      // Check if email already exists
      const exists = await userService.emailExists(email);
      if (exists) {
        sendError(res, 'Email already exists', 'DUPLICATE_EMAIL', 409);
        return;
      }

      const user = await userService.createUser(email, password, name);
      logger.info(`User created: ${user.id}`);
      sendSuccess(res, user, 'User created successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  // Get user by ID
  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await userService.getUserById(id);

      if (!user) {
        sendError(res, 'User not found', 'NOT_FOUND', 404);
        return;
      }

      sendSuccess(res, user);
    } catch (error) {
      next(error);
    }
  },

  // Get all users
  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { users, total } = await userService.getAllUsers(page, limit);

      sendSuccess(res, {
        users,
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

  // Update user
  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;

      // Check if trying to update email to one that already exists
      if (updates.email) {
        const exists = await userService.emailExists(updates.email);
        if (exists) {
          const existingUser = await userService.getUserById(id);
          if (existingUser && existingUser.email !== updates.email) {
            sendError(res, 'Email already exists', 'DUPLICATE_EMAIL', 409);
            return;
          }
        }
      }

      const user = await userService.updateUser(id, updates);

      if (!user) {
        sendError(res, 'User not found', 'NOT_FOUND', 404);
        return;
      }

      logger.info(`User updated: ${id}`);
      sendSuccess(res, user, 'User updated successfully');
    } catch (error) {
      next(error);
    }
  },

  // Delete user
  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await userService.deleteUser(id);

      if (!deleted) {
        sendError(res, 'User not found', 'NOT_FOUND', 404);
        return;
      }

      logger.info(`User deleted: ${id}`);
      sendSuccess(res, null, 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  },
};
