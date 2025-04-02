// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/error';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      status: 'error',
      status_code: err.statusCode,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    status_code: 500,
    message: 'Internal server error',
  });
}
