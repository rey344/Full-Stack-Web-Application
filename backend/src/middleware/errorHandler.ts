import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { logger } from '../utils/logger';
import { sendError } from '../utils/response';

// Validation error handler middleware
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendError(
      res,
      'Validation failed',
      'VALIDATION_ERROR',
      400,
      errors.array()
    );
    return;
  }
  next();
};

// Global error handler
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error('Error occurred:', err);

  // Database errors
  if (err.code === '23505') {
    sendError(res, 'Duplicate entry', 'DUPLICATE_ERROR', 409);
    return;
  }

  if (err.code === '23503') {
    sendError(res, 'Referenced resource not found', 'FOREIGN_KEY_ERROR', 404);
    return;
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  
  sendError(res, message, 'SERVER_ERROR', statusCode);
};

// 404 handler
export const notFoundHandler = (
  req: Request,
  res: Response
): void => {
  sendError(res, 'Route not found', 'NOT_FOUND', 404);
};
