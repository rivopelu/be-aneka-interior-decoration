import * as t from 'drizzle-orm/mysql-core';
import { mysqlTable as table } from 'drizzle-orm/mysql-core';
import { baseEntity } from '../db/base-entity';
import { Product } from './Product';
import { account } from './account';

export const Cart = table('cart', {
  ...baseEntity,
  productId: t
    .varchar('product_id', { length: 255 })
    .notNull()
    .references(() => Product.id),
  accountId: t
    .varchar('account_id', { length: 255 })
    .notNull()
    .references(() => account.id),
  qty: t.int().notNull(),
});
