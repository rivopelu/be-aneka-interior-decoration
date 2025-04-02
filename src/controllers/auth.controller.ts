import { NextFunction, Request, Response } from 'express';
import { IReqSignUp } from '../types/request/iReqSignUp';
import { db } from '../db/database';
import { account } from '../entities/account';
import { eq } from 'drizzle-orm';

export class AuthController {
  static async signUp(request: Request, res: Response, next: NextFunction) {
    const body: IReqSignUp = request.body;
    try {
      const findAccount = await db
        .select()
        .from(account)
        .where(eq(account.email, body.email));
      console.log(findAccount);
      res.success(body.name);
    } catch (error) {
      next(error);
    }
  }
}
