import { NextFunction, Request, Response } from 'express';
import { db } from '../db/database';
import { eq } from 'drizzle-orm';
import { account } from '../entities/account';
import { UnauthorizedError } from '../utils/error';
import { IUser } from '../types/type/IAuthUser';
import { ACCOUNT_ROLE_ENUM } from '../enums/account-role-enum';

export class AccountController {
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
        role: user.role as ACCOUNT_ROLE_ENUM,
        name: user.name,
      };
      res.data(response);
    } catch (error) {
      next(error);
    }
  }
}
