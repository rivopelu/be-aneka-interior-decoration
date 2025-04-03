import { NextFunction, Request, Response } from 'express';

export class ProductController {
  static createNewCategory = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.success('category created successfully');
    } catch (error) {
      next(error);
    }
  };
}
