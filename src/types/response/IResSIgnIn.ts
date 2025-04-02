import { IUser } from '../type/IAuthUser';

export interface IResSIgnIn {
  access_token: string;
  user_data: IUser;
}
