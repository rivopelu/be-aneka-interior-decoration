import * as t from 'drizzle-orm/mysql-core';

export const baseEntity = {
  active: t.boolean().default(true).notNull(),
  createdDate: t.timestamp('created_date').notNull().defaultNow(),
  createdBy: t.varchar({ length: 256 }).notNull(),
  updatedDate: t.timestamp('updated_date'),
  updatedBy: t.varchar({ length: 256 }),
  deletedBy: t.varchar({ length: 256 }),
  deletedDate: t.timestamp('deleted_date'),
};
