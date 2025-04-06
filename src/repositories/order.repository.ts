import { and, count, desc, eq, inArray, like, sql } from 'drizzle-orm';
import { db } from '../db/database';
import { Order } from '../entities/Order';
import { OrderProduct } from '../entities/OrderProduct';
import { Product } from '../entities/Product';
import { ShippingAddress } from '../entities/ShippingAddress';
import { account } from '../entities/account';
import { ORDER_STATUS_ENUM } from '../enums/order-status-enum';

export class OrderRepository {
  static async getAllOrderProductByOrderStatus(status: ORDER_STATUS_ENUM[]) {
    const result = await db
      .select()
      .from(OrderProduct)
      .leftJoin(Order, eq(OrderProduct.orderId, Order.id))
      .where(inArray(Order.status, status));
    return result;
  }
  static async getCountOrderByStatus(status: ORDER_STATUS_ENUM[]) {
    const result = await db
      .select({ count: count() })
      .from(Order)
      .where(and(inArray(Order.status, status), eq(Order.active, true)));
    return result[0].count;
  }

  static async getAllOrderByStatus(status: ORDER_STATUS_ENUM) {
    return db
      .select()
      .from(Order)
      .leftJoin(OrderProduct, eq(OrderProduct.orderId, Order.id))
      .where(and(eq(Order.status, status), eq(Order.active, true)));
  }

  static async findOrderByUser(userId: string) {
    return db
      .select()
      .from(Order)
      .leftJoin(
        ShippingAddress,
        eq(Order.shippingAddressId, ShippingAddress.id),
      )
      .where(and(eq(Order.active, true), eq(Order.accountId, userId)))
      .orderBy(desc(Order.createdDate));
  }
  static async getListOrderAdmin(offset: number, limit: number, id: string) {
    const conditions = [];
    conditions.push(eq(Order.active, true));
    if (id) conditions.push(like(Order.id, `%${id}%`));

    const orderQuery = db
      .select()
      .from(Order)
      .leftJoin(
        ShippingAddress,
        eq(Order.shippingAddressId, ShippingAddress.id),
      )
      .leftJoin(account, eq(Order.accountId, account.id))
      .where(and(...conditions))
      .offset(offset)
      .limit(limit)
      .orderBy(desc(Order.createdDate));

    const totalData = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(Order)
      .where(and(...conditions))
      .then((res) => res[0]?.count ?? 0);

    const [orders, totalRecords] = await Promise.all([orderQuery, totalData]);

    return {
      orders,
      totalRecords,
    };
  }

  static async findById(id: string) {
    const rows = await db
      .select()
      .from(Order)
      .leftJoin(account, eq(Order.accountId, account.id))
      .leftJoin(
        ShippingAddress,
        eq(Order.shippingAddressId, ShippingAddress.id),
      )
      .leftJoin(OrderProduct, eq(OrderProduct.orderId, Order.id))
      .leftJoin(Product, eq(Product.id, OrderProduct.productId))
      .where(and(eq(Order.id, id), eq(Order.active, true)));

    if (!rows.length) return null;

    const order = rows[0].order ?? rows[0].order;
    const accountData = rows[0].account ?? rows[0].account;
    const shippingAddress = rows[0].shipping_address;
    const orderProducts = rows
      .filter((row) => row.order_product?.id)
      .map((row) => ({
        ...row.order_product,
        product: row.product,
      }));
    return {
      order,
      orderProducts,
      shippingAddress,
      account: accountData,
    };
  }
}
