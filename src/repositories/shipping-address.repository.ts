import { db } from '../db/database';
import { and, eq } from 'drizzle-orm';
import { ShippingAddress } from '../entities/ShippingAddress';

export class ShippingAddressRepository {
  static async findShippingAddressByDestinationCodeAndAccountId(
    code: string,
    accountId: string,
  ) {
    const data = await db
      .select()
      .from(ShippingAddress)
      .where(
        and(
          eq(ShippingAddress.destinationCode, code),
          eq(ShippingAddress.accountId, accountId),
        ),
      );
    return data[0];
  }

  static async getListAllAddressByUserId(userId: string) {
    return db
      .select()
      .from(ShippingAddress)
      .where(eq(ShippingAddress.accountId, userId));
  }
}
