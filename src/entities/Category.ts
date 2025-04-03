import * as t from 'drizzle-orm/mysql-core';
import { mysqlTable as table } from 'drizzle-orm/mysql-core';
import { baseEntity } from '../db/base-entity';

export const Category = table('category', {
  ...baseEntity,
  name: t.varchar('name', { length: 256 }).notNull(),
  id: t.varchar('id', { length: 256 }).notNull(),
  slug: t.varchar('slug', { length: 256 }).notNull().unique(),
});
