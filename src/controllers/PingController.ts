import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../utils/error';

export class PingController {
  static ping(_: Request, res: Response, next: NextFunction) {
    try {
      res.paginated([], {
        size: 12,
        page: 12,
        total_data: 12,
        page_count: 12,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static notFound(_: Request, res: Response, next: NextFunction) {
    try {
      throw new NotFoundError('Not Found');
    } catch (err) {
      next(err);
    }
  }
}
