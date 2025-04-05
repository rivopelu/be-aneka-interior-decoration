import { NextFunction, Request, Response } from 'express';
import { EXTERNAL_ENDPOINT } from '../constants/endpoint';
import { ENV } from '../constants/env';
import { db } from '../db/database';
import { Order } from '../entities/Order';
import { OrderProduct } from '../entities/OrderProduct';
import { ORDER_STATUS_ENUM } from '../enums/order-status-enum';
import { DeliveryAddressRepository } from '../repositories/delivery-address.repository';
import { OrderRepository } from '../repositories/order.repository';
import { ProductRepository } from '../repositories/product.repository';
import { HttpService } from '../services/http.service';
import { IReqCreateOrder } from '../types/request/IReqCreateOrder';
import { IResCheckDeliveryFee } from '../types/response/IResCheckDeliveryFee';
import {
  IResDetailOrder,
  IResOrderProduct,
} from '../types/response/IResDetailOrder';
import { IResListOrder } from '../types/response/IResListOrder';
import { IUser } from '../types/type/IAuthUser';
import { BadRequestError, NotFoundError } from '../utils/error';
import { Cart } from '../entities/Cart';
import { eq } from 'drizzle-orm';

export class OrderController {
  async getListOrderUser(req: Request, res: Response, next: NextFunction) {
    const user: IUser = req.user;
    const list = await OrderRepository.findOrderByUser(user.id);
    const responseData: IResListOrder[] = list.map((e) => {
      return {
        id: e.order.id,
        created_date: e.order.createdDate,
        status: e.order.status,
        total_payment: e.order.total_payment,
        delivery_service_name: e.order.deliveryServiceName,
        delivery_service_description: e.order.deliveryServiceDescription,
        delivery_service_estimated: e.order.deliveryServiceEstimated,
        delivery_address: {
          destination_code: e.shipping_address?.destinationCode,
          city: e.shipping_address?.city,
          subdistrict: e.shipping_address?.subdistrict,
          province: e.shipping_address?.province,
          address: e.shipping_address?.address,
          id: e.shipping_address?.id,
          created_date: e.shipping_address?.createdDate,
        },
      };
    });

    try {
      res.data(responseData);
    } catch (e) {
      next(e);
    }
  }

  async getDetailOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderRepository.findById(String(req.params.id));
      if (!order) {
        throw new NotFoundError('Order not found');
      }

      const products: IResOrderProduct[] = order.orderProducts.map((e) => {
        return {
          total_price: (e?.qty || 0) * (e.product?.price || 0) || 0,
          qty: e?.qty || 0,
          price_per_qty: e.price_per_qty,
          name: e.product?.name,
          id: e.product?.id,
          slug: e.product?.slug,
          description: e.product?.description,
          image: e.product?.image,
          price: e.product?.price,
          created_date: e.product?.createdDate,
        };
      });

      const responseData: IResDetailOrder = {
        delivery_cost: order.order.delivery_cost,
        delivery_service_name: order.order.deliveryServiceName,
        delivery_service_description: order.order.deliveryServiceDescription,
        delivery_service_estimated: order.order.deliveryServiceEstimated,
        total_payment: order.order.total_payment,
        total_for_goods_payment: order.order.total_for_goods_payment,
        status: order.order.status,
        delivery_address: {
          address: order.shippingAddress?.address,
          city: order.shippingAddress?.city,
          created_date: order?.shippingAddress?.createdDate,
          destination_code: order?.shippingAddress?.destinationCode,
        },
        products: products,
      };

      res.data(responseData);
    } catch (e) {
      next(e);
    }
  }

  async createOrder(req: Request, res: Response, next: NextFunction) {
    const data = req.body as IReqCreateOrder;
    const deliverAddress = await DeliveryAddressRepository.findById(
      data.shipping_address_id,
    );
    if (!deliverAddress) {
      throw new NotFoundError('Delivery address not found');
    }
    const products = await ProductRepository.findInProductId(
      data.products.map((e) => e.id),
    );
    if (products.length != data.products.length) {
      throw new BadRequestError('Products not found');
    }

    const findProduct = data.products.map((e) => {
      const product = products.find((pr) => (pr.id = e.id));
      if (!product) throw new BadRequestError('Product not found');
      return {
        ...product,
        total_price: product.price * e.qty,
        qty: e.qty,
      };
    });
    const productPriceSum = findProduct
      .map((e) => e.total_price)
      .reduce((acc, curr) => acc + curr, 0);
    const totalPayment = productPriceSum + data.delivery_cost;
    const createOrder = await db
      .insert(Order)
      .values({
        delivery_cost: data.delivery_cost,
        deliveryServiceName: data.delivery_service_name,
        deliveryServiceDescription: data.delivery_service_description,
        deliveryServiceEstimated: data.delivery_service_estimated,
        total_payment: totalPayment,
        total_for_goods_payment: productPriceSum,
        accountId: String(req.user.id),
        shippingAddressId: deliverAddress.id,
        status: ORDER_STATUS_ENUM.WAITING_PAYMENT,
        createdBy: String(req.user.id),
      })
      .$returningId();

    const orderId = createOrder[0].id;
    await db.insert(OrderProduct).values(
      findProduct.map((e) => ({
        createdBy: String(req.user.id),
        accountId: String(req.user.id),
        productId: e.id,
        orderId: orderId,
        qty: e.qty,
        total_price: e.total_price,
        price_per_qty: e.price,
      })),
    );

    await db.delete(Cart).where(eq(Cart.accountId, req.user.id));

    try {
      res.success('Oke');
    } catch (e) {
      next(e);
    }
  }
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
      origin: ENV.SHIPPING_STORE_ORIGIN_CODE,
      destination: destinationCode,
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
