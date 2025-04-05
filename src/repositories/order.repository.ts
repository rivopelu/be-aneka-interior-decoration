import { and, eq } from "drizzle-orm";
import { db } from "../db/database";
import { Order } from "../entities/Order";

export class OrderRepository {
  async findById(id: string) {
    const result = await db.select().from(Order).where(
      and(eq(Order.id, id), eq(Order.active, true))
    ).limit(1)
    return result[0]
  }
}