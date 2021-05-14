import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  database: "webshop",
  password: "postgres",
  host: "localhost",
  port: 5432,
});
