import { Category } from "./entities/Category";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Cart } from "entities/Cart";

export type res = Response;
export type req = Request & {
  session: Session &
    Partial<SessionData> & {
      userId?: number;
      username?: string;
      isAdmin?: boolean;
    };
};
export type User = {
  name: string;
  surname: string;
  username: string;
  password: string;
  email: string;
  cart?: Cart;
};
export type Product_type = {
  product_id?: number;
  name: string;
  description: string;
  img_url?: string;
  amount?: any;
  category?: Category;
  price?: any;
};
