import { Product } from "../entities/Product";
import { getRepository } from "typeorm";
import { Product_type, res } from "../types";

export const productValidation = async (res: res, Prod: Product_type) => {
  try {
    const productRepository = getRepository(Product);

    const data = await productRepository.find();

    if (data.length === 0) {
      return true;
    }

    const dbProduct = await productRepository.find({
      name: Prod.name,
      category: Prod.category,
    });

    console.log(dbProduct);
    //already exists
    if (Object.keys(dbProduct).length > 0) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({ error: { message: "Item already in database" } });
      return false;
    }

    //name empty
    if (!Prod.name || Prod.name.length === 0) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: { field: "name", message: "Name must not be empty" },
          });
      return false;
    }

    //description empty

    if (!Prod.description || Prod.description.length === 0) {
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
    if (!Prod.category) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: { field: "category", message: "Category must not be empty" },
          });
      return false;
    }

    //price empty
    if (!Prod.price) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: {
              field: "price",
              message: "Price must not be empty",
            },
          });
      return false;
    } else if (isNaN(Prod.price)) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: {
              field: "price",
              message: "Price must be numeric",
            },
          });
      return false;
    } else if (Prod.price < 0) {
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
    if (!Prod.amount) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: {
              field: "amount",
              message: "Amount must not be empty",
            },
          });
      return false;
    } else if (isNaN(Prod.amount)) {
      process.env.NODE_ENV == "test"
        ? ""
        : res.json({
            error: {
              field: "amount",
              message: "Amount must be numeric",
            },
          });
      return false;
    } else if (Prod.amount < 0) {
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
    return false;
  }
};
