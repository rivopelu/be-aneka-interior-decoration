import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/error';
import { IUser } from '../types/type/IAuthUser';
import { ENV } from '../constants/env';

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

    req.user = decoded as IUser; // Ensure req.user is typed correctly
    next();
  });
};

export default verifyToken;
