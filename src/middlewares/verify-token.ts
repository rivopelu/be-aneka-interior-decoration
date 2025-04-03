import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/error';
import { IUser } from '../types/type/IAuthUser';
import { ENV } from '../constants/env';
import { ACCOUNT_ROLE_ENUM } from '../enums/account-role-enum';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('No token provided or invalid format');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, ENV.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new UnauthorizedError('Unauthorized'));
    }

    req.user = decoded as IUser;
    next();
  });
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('No token provided or invalid format');
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, ENV.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new UnauthorizedError('Unauthorized'));
    }

    const user = decoded as IUser;
    if (user.role !== ACCOUNT_ROLE_ENUM.ADMIN) {
      return next(
        new UnauthorizedError(
          'You do not have permission to perform this action',
        ),
      );
    }
    req.user = user;
    next();
  });
};

export default verifyToken;
