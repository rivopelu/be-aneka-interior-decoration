import { ACCOUNT_ROLE_ENUM } from '../../enums/account-role-enum';

export interface IResSIgnIn {
  access_token: string;
  user_data: {
    email: string;
    name: string;
    role: ACCOUNT_ROLE_ENUM | null;
    profile_picture: string | null;
  };
}
