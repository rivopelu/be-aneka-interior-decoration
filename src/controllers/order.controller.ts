import { NextFunction, Request, Response } from 'express';
import { HttpService } from '../services/http.service';
import { ENV } from '../constants/env';
import { EXTERNAL_ENDPOINT } from '../constants/endpoint';
import { BadRequestError } from '../utils/error';
import { IResCheckDeliveryFee } from '../types/response/IResCheckDeliveryFee';

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

  async cekDeliveryFee(req: Request, res: Response, next: NextFunction) {
    const httpService = new HttpService(ENV.SHIPPING_SERVICE_ENDPOINT);
    const destinationCode = req.query.code;
    if (!destinationCode) {
      throw new BadRequestError('Destination Code is required');
    }
    const data = {
      origin: 'JOG',
      destination: 'MDC20400',
      weight: '1',
      p: '12',
      l: '12',
      t: '12',
    };
    const resCheck = await httpService.POST(
      EXTERNAL_ENDPOINT.CHECK_DELIVERY_FEE(),
      data,
    );
    const parseData: any[] = resCheck.data?.data?.sicepat?.results || [];
    const resData: IResCheckDeliveryFee[] = parseData.map((e) => {
      return {
        cost: e?.tariff,
        service_name: e?.service,
        description: e?.description,
        estimated: e?.etd,
      };
    });
    try {
      res.data(resData);
    } catch (e) {
      next(e);
    }
  }
}
