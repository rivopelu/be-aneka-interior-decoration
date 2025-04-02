import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/error';
import { AuthRequest, IUser } from '../types/type/IAuthUser';

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      throw new UnauthorizedError('Unauthorized');
    }
    req.user = decoded as IUser;
    next();
  });
};

export default verifyToken;
