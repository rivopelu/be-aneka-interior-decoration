export interface IResListCart {
  cart_id?: string;
  product_id?: string | null;
  name?: string | null;
  category_name?: string;
  category_id?: string;
  category_slug?: string;
  image?: string | null;
  price_per_qty?: number | null;
  total_price?: number;
  created_date?: Date | null;
  qty?: number;
}
