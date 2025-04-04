import * as t from 'drizzle-orm/mysql-core';
import { mysqlTable as table } from 'drizzle-orm/mysql-core';
import { baseEntity } from '../db/base-entity';
import { Product } from './Product';
import { account } from './account';

export const ShippingAddress = table('shipping_address', {
  ...baseEntity,
  accountId: t
    .varchar('account_id', { length: 255 })
    .notNull()
    .references(() => account.id),
  destinationCode: t.varchar('destination_code', { length: 255 }).notNull(),
  city: t.varchar('city', { length: 255 }).notNull(),
  subdistrict: t.varchar('subdistrict', { length: 255 }).notNull(),
  province: t.varchar('province', { length: 255 }).notNull(),
  address: t.text('address').notNull(),
});
