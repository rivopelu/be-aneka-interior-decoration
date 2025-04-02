import * as t from 'drizzle-orm/mysql-core';
import { v4 as uuidv4 } from 'uuid';

export const baseEntity = {
  id: t
    .varchar({ length: 255 })
    .primaryKey()
    .unique()
    .$defaultFn(() => uuidv4()),
  active: t.boolean().default(true).notNull(),
  createdDate: t.timestamp('created_date').notNull().defaultNow(),
  createdBy: t
    .varchar('created_by', { length: 256 })
    .notNull()
    .default('SYSTEM'),
  updatedDate: t.timestamp('updated_date'),
  updatedBy: t.varchar('updated_by', { length: 256 }),
  deletedBy: t.varchar('deleted_by', { length: 256 }),
  deletedDate: t.timestamp('deleted_date'),
};
