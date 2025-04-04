import { NextFunction, Request, Response } from 'express';
import { HttpService } from '../services/http.service';
import { ENV } from '../constants/env';
import { EXTERNAL_ENDPOINT } from '../constants/endpoint';
import { BadRequestError } from '../utils/error';

export class OrderController {
  async getShippingDestination(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const httpService = new HttpService(ENV.SHIPPING_SERVICE_ENDPOINT);

    const q = String(req.query.q);
    if (!q) {
      res.data([]);
    }

    try {
      const response = await httpService.GET(
        EXTERNAL_ENDPOINT.GET_DESTINATION(q),
      );
      res.data(response.data?.data?.sicepat?.results);
    } catch (e) {
      next(e);
    }
  }
}
