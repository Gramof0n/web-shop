import { Request, Response } from "express";
import { Session, SessionData } from "express-session";

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
};
export type Product = {
  name: string;
  description: string;
  productImage?: string;
  amount?: any;
  category: string;
  price?: any;
};
