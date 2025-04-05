import { mysqlTable as table } from 'drizzle-orm/mysql-core';
import { baseEntity } from '../db/base-entity';
import * as t from 'drizzle-orm/mysql-core';
import { account } from './account';
import { ShippingAddress } from './ShippingAddress';

export const Order = table('order', {
  ...baseEntity,
  delivery_cost: t.int("delivery_cost").notNull(),
  deliveryServiceName: t.varchar("delivery_service_name", { length: 255 }).notNull(),
  deliveryServiceDescription: t.varchar("delivery_service_description", { length: 255 }).notNull(),
  deliveryServiceEstimated: t.varchar("delivery_service_estimated", { length: 255 }).notNull(),
  total_payment: t.int("total_payment").notNull(),
  total_for_goods_payment: t.int("total_for_goods_payment").notNull(),
  accountId: t
    .varchar('account_id', { length: 255 })
    .notNull()
    .references(() => account.id),
  shippingAddressId: t
    .varchar('shipping_address_id', { length: 255 })
    .notNull()
    .references(() => ShippingAddress.id),

});
