import * as t from 'drizzle-orm/mysql-core';
import { mysqlTable as table } from 'drizzle-orm/mysql-core';
import { baseEntity } from '../db/base-entity';
import { Product } from './Product';
import { account } from './account';
import { Order } from './Order';

export const OrderProduct = table("order_product", {
  ...baseEntity,
  productId: t
    .varchar('product_id', { length: 255 })
    .notNull()
    .references(() => Product.id),
  accountId: t
    .varchar('account_id', { length: 255 })
    .notNull()
    .references(() => account.id),
  orderId: t
    .varchar('order_id', { length: 255 })
    .notNull()
    .references(() => Order.id),
  qty: t.int("qty").notNull(),
  total_price: t.int("total_price").notNull(),
  price_per_qty: t.int("price_per_qty").notNull(),
})