import * as t from 'drizzle-orm/mysql-core';
import { mysqlTable as table } from 'drizzle-orm/mysql-core';
import { baseEntity } from '../db/base-entity';
import { Category } from './Category';
import { relations } from 'drizzle-orm';

export const Product = table('product', {
  ...baseEntity,
  name: t.varchar('name', { length: 256 }).notNull(),
  description: t.text(),
  image: t.text().notNull(),
  categoryId: t
    .varchar('category_id', { length: 255 })
    .references(() => Category.id, {
      onDelete: 'cascade',
    }),
  price: t.int().notNull(),
  slug: t.varchar('slug', { length: 256 }).notNull().unique(),
});

export const ProductRelations = relations(Product, ({ one }) => ({
  category: one(Category, {
    fields: [Product.categoryId],
    references: [Category.id],
  }),
}));

export const CategoryRelations = relations(Category, ({ many }) => ({
  posts: many(Product),
}));
