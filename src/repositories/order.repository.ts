import { and, desc, eq, like, sql } from "drizzle-orm";
import { db } from "../db/database";
import { Order } from "../entities/Order";
import { OrderProduct } from "../entities/OrderProduct";
import { Product } from "../entities/Product";
import { ShippingAddress } from "../entities/ShippingAddress";
import { count } from "console";

export class OrderRepository {

  static async findOrderByUser(userId: string,) {
    return db.select().from(Order)
      .leftJoin(ShippingAddress, eq(Order.shippingAddressId, ShippingAddress.id))
      .where(and(
        eq(Order.active, true),
        eq(Order.accountId, userId),
      )).orderBy(desc(Order.createdDate))
  }
  static async getListOrderAdmin(offset: number, limit: number, id: string) {
    const conditions = [];
    conditions.push(eq(Order.active, true))
    if (id) conditions.push(like(Order.id, `%${id}%`));

    const orderQuery = db.select().from(Order)
      .leftJoin(ShippingAddress, eq(Order.shippingAddressId, ShippingAddress.id))
      .where(and(...conditions))
      .offset(offset)
      .limit(limit)
      .orderBy(desc(Order.createdDate))


    const totalData = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(Order)
      .where(and(...conditions))
      .then((res) => res[0]?.count ?? 0);

    const [orders, totalRecords] = await Promise.all([
      orderQuery,
      totalData,
    ]);

    return {
      orders,
      totalRecords
    }

  }

  static async findById(id: string) {
    const rows = await db
      .select()
      .from(Order)
      .leftJoin(ShippingAddress, eq(Order.shippingAddressId, ShippingAddress.id))
      .leftJoin(OrderProduct, eq(OrderProduct.orderId, Order.id))
      .leftJoin(Product, eq(Product.id, OrderProduct.productId))
      .where(and(eq(Order.id, id), eq(Order.active, true)));

    if (!rows.length) return null;

    const order = rows[0].order ?? rows[0].order;
    const shippingAddress = rows[0].shipping_address
    const orderProducts = rows
      .filter(row => row.order_product?.id)
      .map(row => ({
        ...row.order_product,
        product: row.product,
      }));
    return {
      order,
      orderProducts,
      shippingAddress
    }
  }
}