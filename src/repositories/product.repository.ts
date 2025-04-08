import { and, eq, inArray } from 'drizzle-orm';
import { db } from '../db/database';
import { Product } from '../entities/Product';

export class ProductRepository {
  static async findProductById(id: string) {
    const data = await db
      .select()
      .from(Product)
      .where(and(eq(Product.id, id), eq(Product.active, true)));
    return data[0];
  }

  static async findProductByIdNotFilter(id: string) {
    const data = await db
      .select()
      .from(Product)
      .where(and(eq(Product.id, id), eq(Product.active, true)));
    return data[0];
  }

  static async findInProductId(ids: string[]) {
    return db.select().from(Product)
      .where(inArray(Product.id, ids));
  }
}
