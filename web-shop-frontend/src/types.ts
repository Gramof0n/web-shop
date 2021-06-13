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

export type Cart_type = {
  products: [Product_type];
  total_price: number;
};

export type User_type = {
  webshop_user_id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
};
