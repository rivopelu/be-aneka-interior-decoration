import { db } from '../db/database';
import { Cart } from '../entities/Cart';
import { eq, and, desc } from 'drizzle-orm';
import { Product } from '../entities/Product';
import { Category } from '../entities/Category';

export class CartRepository {
  static async getList(userId: string) {
    return db
      .select()
      .from(Cart)
      .leftJoin(Product, eq(Cart.productId, Product.id))
      .leftJoin(Category, eq(Product.categoryId, Category.id))
      .orderBy(desc(Cart.createdDate))
      .where(eq(Cart.accountId, userId));
  }
  static async findOne(id: string) {
    const result = await db
      .select()
      .from(Cart)
      .where(and(eq(Cart.id, id)));
    return result[0];
  }
  static async findChart(userId: string, productId: string) {
    const result = await db
      .select()
      .from(Cart)
      .where(and(eq(Cart.productId, productId), eq(Cart.accountId, userId)));

    return result[0];
  }
}
