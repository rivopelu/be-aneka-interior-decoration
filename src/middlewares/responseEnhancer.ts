// src/middleware/responseEnhancer.ts
import { Request, Response, NextFunction } from 'express';
import { ResponseHelper } from '../helper/ResponseHelper.js';

declare global {
  namespace Express {
    interface Response {
      success(message: string, statusCode?: number): Response;
      data<T>(data: T, statusCode?: number): Response;
      paginated<T>(
        response_data: T,
        paginated_data: {
          total_data: number;
          page_count: number;
          size: number;
          page: number;
        },
        statusCode?: number,
        message?: string,
      ): Response;
      error(message: string, statusCode?: number): Response;
    }
  }
}

export const responseEnhancer = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.success = (message: string, statusCode = 200) => {
    return res.status(statusCode).json(ResponseHelper.success(message));
  };

  res.data = function <T>(data: T, statusCode = 200) {
    return res.status(statusCode).json(ResponseHelper.data(data));
  };

  res.paginated = function <T>(
    response_data: T,
    paginated_data: {
      total_data: number;
      page_count: number;
      size: number;
      page: number;
    },
    statusCode = 200,
    message: 'success',
  ) {
    return res
      .status(statusCode)
      .json(
        ResponseHelper.paginated(
          response_data,
          paginated_data.total_data,
          paginated_data.page,
          paginated_data.size,
          message,
        ),
      );
  };

  res.error = (message: string, statusCode = 400) => {
    return res.status(statusCode).json(ResponseHelper.error(message));
  };

  next();
};
