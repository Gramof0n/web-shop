import { pool } from "../db";
import { Product, res } from "../types";

export const productValidation = async (res: res, Product: Product) => {
  try {
    let { rowCount } = await pool.query(`SELECT * FROM product`);

    if (rowCount !== 0) {
      const dbProduct = await pool.query(
        `SELECT * FROM product WHERE name = '${Product.name}' AND category = '${Product.category}'`
      );

      //already exists
      if (dbProduct.rowCount > 0) {
        process.env.NODE_ENV == "test"
          ? ""
          : res.json({ error: { message: "Item already in database" } });
        return false;
      }
    }

    //name empty
    if (!Product.name || Product.name.length === 0) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: { field: "name", message: "Name must not be empty" },
          });
      return false;
    }

    //description empty

    if (!Product.description || Product.description.length === 0) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: {
              field: "description",
              message: "Description must not be empty",
            },
          });
      return false;
    }

    //category empty
    if (!Product.category || Product.category.length === 0) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: { field: "category", message: "Category must not be empty" },
          });
      return false;
    }

    //price empty
    if (!Product.price) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: {
              field: "price",
              message: "Price must not be empty",
            },
          });
      return false;
    } else if (isNaN(Product.price)) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: {
              field: "price",
              message: "Price must be numeric",
            },
          });
      return false;
    } else if (Product.price < 0) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: {
              field: "price",
              message: "Price must be positive",
            },
          });
      return false;
    }

    //amount empty
    if (!Product.amount) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: {
              field: "amount",
              message: "Amount must not be empty",
            },
          });
      return false;
    } else if (isNaN(Product.amount)) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: {
              field: "amount",
              message: "Amount must be numeric",
            },
          });
      return false;
    } else if (Product.amount < 0) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: {
              field: "amount",
              message: "Amount must be positive",
            },
          });
      return false;
    }

    //all good
    return true;
  } catch (err) {
    res.json({ error: err });
    return false;
  }
};
