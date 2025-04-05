export interface IReqCreateOrder {
  delivery_cost: number,
  delivery_service_name: string;
  delivery_service_description: string;
  delivery_service_estimated: string;
  shipping_address_id: string;
  products: {
    id: string;
    qty: number
  }[]
}