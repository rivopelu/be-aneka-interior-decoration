import { eq } from "drizzle-orm";
import { db } from "../db/database";
import { ShippingAddress } from "../entities/ShippingAddress";

export class DeliveryAddressRepository {
  static async findById(id: string) {
    const result = await db.select().from(ShippingAddress)
      .where(eq(ShippingAddress.id, id))
    return result[0]
  }
}