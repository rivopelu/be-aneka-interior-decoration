import { NextFunction, Request, Response } from 'express';
import { IReqSignUp } from '../types/request/iReqSignUp';
import { account } from '../entities/account';
import { count, eq } from 'drizzle-orm';
import { db } from '../db/database';
import { BadRequestError } from '../utils/error';

export class AuthController {
  static async signUp(request: Request, res: Response, next: NextFunction) {
    const body: IReqSignUp = request.body;
    try {
      const findAccount = await db
        .select({ count: count() })
        .from(account)
        .where(eq(account.email, body.email));
      const doesExist = findAccount[0]?.count > 0;
      if (doesExist) {
        throw new BadRequestError('Email already exists');
      } else {
        await db.insert(account).values({
          email: body.email,
          name: body.name,
          password: body.password,
        });

        res.success(body.name);
      }
    } catch (error) {
      next(error);
    }
  }
}
