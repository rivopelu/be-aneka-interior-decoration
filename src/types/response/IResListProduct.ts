export interface IResListProduct {
  name?: string;
  id?: string;
  slug?: string;
  description?: string | null;
  category_name?: string;
  category_id?: string;
  category_slug?: string;
  image?: string;
  price?: number;
  created_date?: Date
}
