export type Product_type = {
  amount?: 10;
  category?: {
    category_id?: 1;
    category_name?: "keyboards";
  };
  description?: "test";
  img_url?: "uploads\\default.png";
  name?: "test";
  price?: 10;
  product_id?: 2;
};

export type Error_type = {
  message?: string;
  field?: string;
};
