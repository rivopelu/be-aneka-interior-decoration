import * as t from 'drizzle-orm/mysql-core';
import { mysqlTable as table } from 'drizzle-orm/mysql-core';
import { ACCOUNT_ROLE_ENUM } from '../enums/account-role-enum';
import { baseEntity } from '../db/base-entity';
import { sql } from 'drizzle-orm';

export const account = table('account', {
  ...baseEntity,
  name: t.varchar('name', { length: 256 }).notNull(),
  email: t.varchar({ length: 256 }).notNull().unique(),
  password: t.text().notNull(),
  role: t
    .mysqlEnum([ACCOUNT_ROLE_ENUM.USER, ACCOUNT_ROLE_ENUM.ADMIN])
    .default(ACCOUNT_ROLE_ENUM.USER),
});
