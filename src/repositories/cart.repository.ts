import { db } from '../db/database';
import { Cart } from '../entities/Cart';
import { eq, and } from 'drizzle-orm';

export class CartRepository {
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
