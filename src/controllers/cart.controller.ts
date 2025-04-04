import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../utils/error';

export class ChartController {
  static async addToChart(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError('id required');
    }
    try {
      res.success(id);
    } catch (e) {
      next(e);
    }
  }
}
