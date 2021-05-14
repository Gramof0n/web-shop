import { pool } from "../db";
import { Product, req, res } from "../types";
import { productValidation } from "../validation/productValidation";

//get all
export const getAllProducts = async (_: req, res: res) => {
  try {
    const data = await pool.query("SELECT * FROM product");

    if (data.rowCount > 0) {
      res.json(data.rows);
      return;
    }

    res.json({ error: { message: "Table is empty" } });
  } catch (err) {
    res.json({ error: err });
  }
};

//get one
export const getSingleProduct = async (req: req, res: res) => {
  try {
    const data = await pool.query(
      `SELECT * FROM product WHERE product_id = ${req.params.id}`
    );

    if (data.rowCount > 0) {
      console.log("http://localhost:4000/" + data.rows[0].img_url);
      res.json(data.rows[0]);
      return;
    } else {
      res.json({ error: { message: "No such product" } });
    }
  } catch (err) {
    res.json({ error: err });
  }
};

//add
export const addProduct = async (req: req, res: res) => {
  try {
    let productImage;

    if (!req.file) {
      productImage = `uploads\\default.png`;
    } else {
      productImage = req.file.path;
      console.log(req.file.path);
    }

    const Product: Product = {
      name: req.body.name,
      description: req.body.description,
      productImage,
      amount: req.body.amount,
      category: req.body.category,
      price: req.body.price,
    };

    //validate
    if (!(await productValidation(res, Product))) return;

    const values = [
      Product.name,
      Product.description,
      Product.productImage,
      Product.amount,
      Product.category,
      Product.price,
    ];

    await pool.query(
      `INSERT INTO product (name, description, img_url, amount, category, price ) VALUES ($1,$2,$3,$4,$5,$6)`,
      values
    );

    res.json({ message: "Added product successfully" });
  } catch (err) {
    res.json(err);
  }
};

//delete
export const deleteProduct = async (req: req, res: res) => {
  try {
    await pool.query(`DELETE FROM product WHERE product_id = ${req.params.id}`);
    res.json({ message: "Product successfully deleted" });
  } catch (err) {
    res.json({ message: "No such product", error: err });
  }
};

//update
