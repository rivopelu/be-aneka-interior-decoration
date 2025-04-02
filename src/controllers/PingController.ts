import { NextFunction, Request, Response } from 'express';
import { ResponseHelper } from '../helper/ResponseHelper';

export class PingController {
  static ping(_: Request, res: Response, next: NextFunction) {
    try {
      res.json(ResponseHelper.success('Pong'));
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static notFound(_: Request, res: Response, next: NextFunction) {
    try {
      res.json(ResponseHelper.success('Resource Not Found'));
    } catch (err) {
      next(err);
    }
  }
}
