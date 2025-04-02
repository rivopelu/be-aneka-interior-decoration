import { NextFunction, Request, Response } from 'express';
import { db } from '../db/database';
import { desc, eq, like } from 'drizzle-orm';
import { account } from '../entities/account';
import { UnauthorizedError } from '../utils/error';
import { IUser } from '../types/type/IAuthUser';
import { ACCOUNT_ROLE_ENUM } from '../enums/account-role-enum';

export class AccountController {
  static async assignAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      res.success(req.params.id);
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
      };
      res.data(response);
    } catch (error) {
      next(error);
    }
  }

  static async listAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 0, size = 10, name = '' } = req.query;

      const offset = Number(page) * Number(size); // Offset starts at 0 for page 0
      const limit = Number(size);

      // Using a single query to fetch both paginated accounts and the total count
      const accountsQuery = db
        .select()
        .from(account)
        .where(like(account.name, `%${name}%`)) // Like filter for name
        .offset(offset)
        .limit(limit)
        .orderBy(desc(account.createdDate)); // Order by createdDate in descending order

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
