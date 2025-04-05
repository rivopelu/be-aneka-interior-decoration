import { ORDER_STATUS_ENUM } from "../../enums/order-status-enum";
import { IResShippingAddress } from "./IResShippingAddress";

export interface IResListOrderAdmin {
  id: string;
  created_date: Date,
  status: ORDER_STATUS_ENUM,
  total_payment: number
  delivery_service_name: string;
  delivery_service_description: string;
  delivery_service_estimated: string;
  delivery_address: IResShippingAddress,
  account_id?: string | null;
  account_name?: string | null;
  account_profile_picture?: string | null;
  account_email?: string | null;
}