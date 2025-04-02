import { NextFunction, Request, Response } from 'express';
import { IReqSignUp } from '../types/request/iReqSignUp';
import { account } from '../entities/account';
import { count, eq } from 'drizzle-orm';
import { db } from '../db/database';
import { BadRequestError } from '../utils/error';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV } from '../constants/env';

export class AuthController {
  static async signIn(request: Request, res: Response, next: NextFunction) {
    try {
      const findAccount = await db
        .select({
          email: account.email,
          password: account.password, // Explicitly selecting only required fields
        })
        .from(account)
        .where(eq(account.email, request.body.email));
      if (findAccount.length === 0) {
        throw new BadRequestError('Sign in failed');
      }
      const user = findAccount[0];
      const passwordMatch = await bcrypt.compare(
        request.body.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new BadRequestError('Sign in failed');
      }
      const token = jwt.sign({ email: user.email }, ENV.JWT_SECRET);
      res.data({ access_token: token });
    } catch (error) {
      next(error);
    }
  }
  static async signUp(request: Request, res: Response, next: NextFunction) {
    const body: IReqSignUp = request.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);

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
          profilePicture: 'https://robohash.org/' + body.name,
          password: hashedPassword,
        });

        res.success(body.name);
      }
    } catch (error) {
      next(error);
    }
  }
}
