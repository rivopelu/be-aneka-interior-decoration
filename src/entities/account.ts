import * as t from 'drizzle-orm/mysql-core';
import { mysqlTable as table } from 'drizzle-orm/mysql-core';
import { ACCOUNT_ROLE_ENUM } from '../enums/account-role-enum';
import { baseEntity } from '../db/base-entity';

export const account = table('account', {
  id: t.varchar({ length: 255 }).primaryKey().unique().default('uuid'),
  name: t.varchar('name', { length: 256 }).notNull(),
  email: t.varchar({ length: 256 }).notNull().unique(),
  role: t
    .mysqlEnum([ACCOUNT_ROLE_ENUM.USER, ACCOUNT_ROLE_ENUM.ADMIN])
    .default(ACCOUNT_ROLE_ENUM.USER),
  ...baseEntity,
});
