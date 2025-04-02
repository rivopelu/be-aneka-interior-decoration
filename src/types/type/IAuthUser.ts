import { Request } from 'express';
import { ACCOUNT_ROLE_ENUM } from '../../enums/account-role-enum';

export interface IUser {
  email: string;
  name: string;
  id: string;
  role: ACCOUNT_ROLE_ENUM;
  created_date: Date;
  created_by: string;
}
