import { ORDER_STATUS_ENUM } from "../../enums/order-status-enum";
import { IResListProduct } from "./IResListProduct";
import { IResShippingAddress } from "./IResShippingAddress";

export interface IResDetailOrder {
  id: string;
  delivery_cost: number;
  delivery_service_name: string;
  delivery_service_description: string;
  delivery_service_estimated: string;
  total_payment: number;
  total_for_goods_payment: number;
  delivery_address: IResShippingAddress
  status: ORDER_STATUS_ENUM,
  products: IResOrderProduct[]
  created_date: Date,
  payment_image_url?: string | null;
  reject_reason?: string | null;
  account_name?: string | null;
  account_profile_picture?: string | null;
  account_email?: string | null;
  account_id?: string | null
  delivery_code?: string | null
}


export interface IResOrderProduct extends IResListProduct {
  qty?: number
  total_price?: number
  price_per_qty?: number
}