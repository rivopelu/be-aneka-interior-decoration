import { NextFunction, Request, Response } from 'express';
import { db } from '../db/database';
import { desc, eq, like } from 'drizzle-orm';
import { account } from '../entities/account';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/error';
import { IUser } from '../types/type/IAuthUser';
import { ACCOUNT_ROLE_ENUM } from '../enums/account-role-enum';
import { IReqCreateShippingAddress } from '../types/request/IReqCreateShippingAddress';
import { ShippingAddress } from '../entities/ShippingAddress';
import { ShippingAddressRepository } from '../repositories/shipping-address.repository';
import { IResShippingAddress } from '../types/response/IResShippingAddress';

export class AccountController {
  static async getShippingAddress(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await ShippingAddressRepository.getListAllAddressByUserId(
        req.user.id,
      );
      const resData: IResShippingAddress[] = data.map((e) => {
        return {
          destination_code: e.destinationCode,
          city: e.city,
          subdistrict: e.subdistrict,
          province: e.province,
          address: e.address,
          created_date: e.createdDate,
        };
      });
      res.data(resData);
    } catch (err) {
      next(err);
    }
  }

  static async createShippingAddress(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data: IReqCreateShippingAddress = req.body;
      const findAddress =
        await ShippingAddressRepository.findShippingAddressByDestinationCodeAndAccountId(
          data.destination_code,
          req.user.id,
        );
      if (findAddress) {
        throw new BadRequestError(
          `alamat dengan kode ${data.destination_code} sudah ada`,
        );
      }
      await db.insert(ShippingAddress).values({
        accountId: String(req.user.id),
        destinationCode: data.destination_code,
        city: data.city,
        subdistrict: data.subdistrict,
        province: data.province,
        address: data.address,
        createdBy: String(req.user.id),
      });
      res.data(data);
    } catch (e) {
      next(e);
    }
  }
  static async assignAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await db
        .select()
        .from(account)
        .where(eq(account.id, userId));
      if (!user.length) {
        throw new NotFoundError('Account does not exist');
      }

      const currentRole = user[0].role;

      const newRole =
        currentRole === ACCOUNT_ROLE_ENUM.ADMIN
          ? ACCOUNT_ROLE_ENUM.USER
          : ACCOUNT_ROLE_ENUM.ADMIN;

      await db
        .update(account)
        .set({ role: newRole })
        .where(eq(account.id, userId));

      res.success(`User role changed from ${currentRole} to ${newRole}`);
    } catch (err) {
      next(err);
    }
  }
  static async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const findAccount = await db
        .select()
        .from(account)
        .where(eq(account.id, req.user.id));
      if (!findAccount) {
        throw new UnauthorizedError('No token provided');
      }
      const user = findAccount[0];
      const response: IUser = {
        id: user.id,
        email: user.email,
        created_date: user.createdDate,
        created_by: user.createdBy,
        role: user.role as ACCOUNT_ROLE_ENUM,
        name: user.name,
        profile_picture: user.profilePicture,
      };
      res.data(response);
    } catch (error) {
      next(error);
    }
  }

  static async listAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 0, size = 10, name = '' } = req.query;

      const offset = Number(page) * Number(size);
      const limit = Number(size);

      const accountsQuery = db
        .select()
        .from(account)
        .where(like(account.name, `%${name}%`))
        .offset(offset)
        .limit(limit)
        .orderBy(desc(account.createdDate));

      const totalCountQuery = db
        .select()
        .from(account)
        .where(like(account.name, `%${name}%`));

      const [accounts, totalRecords] = await Promise.all([
        accountsQuery,
        totalCountQuery,
      ]);

      const totalData = totalRecords.length;
      const response: IUser[] = accounts.map((user) => ({
        id: user.id,
        created_date: user.createdDate,
        created_by: user.createdBy,
        email: user.email,
        role: user.role as ACCOUNT_ROLE_ENUM,
        name: user.name,
        profile_picture: user.profilePicture,
      }));

      res.paginated(response, {
        total_data: totalData,
        page_count: Math.ceil(totalData / limit),
        size: limit,
        page: Number(page),
      });
    } catch (error) {
      next(error);
    }
  }
}
