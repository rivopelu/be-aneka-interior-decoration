import { Request } from 'express';
import { ACCOUNT_ROLE_ENUM } from '../../enums/account-role-enum';

export interface AuthRequest extends Request {
  user: IUser;
}

export interface IUser {
  email: string;
  name: string;
  id: string;
  role: ACCOUNT_ROLE_ENUM;
}
