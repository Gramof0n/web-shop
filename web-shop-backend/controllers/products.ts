import { Product } from "../entities/Product";
import { getRepository } from "typeorm";
import { Product_type, req, res } from "../types";
import { productValidation } from "../validation/productValidation";
import { Category } from "../entities/Category";

//get all
export const getAllProducts = async (_: req, res: res) => {
  try {
    const productRepository = getRepository(Product);
    const data = await productRepository.find({ relations: ["category"] });

    if (data.length > 0) {
      res.json(data);
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
    const productRepository = getRepository(Product);

    const data = await productRepository.findOne({
      where: { product_id: req.params.id },
      relations: ["category"],
    });

    if (Object.keys(data!).length > 0) {
      res.json(data);
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

    const productRepository = getRepository(Product);
    const categoryRepository = getRepository(Category);

    if (!req.file) {
      productImage = `uploads\\default.png`;
    } else {
      productImage = req.file.path;
      console.log(req.file.path);
    }

    const dbCategory = await categoryRepository.findOne({
      where: { category_name: req.body.category },
    });

    if (typeof dbCategory === "undefined") {
      res.json({ error: { field: "category", message: "No such category" } });
      return;
    }

    console.log(dbCategory);

    const prod: Product_type = {
      name: req.body.name,
      description: req.body.description,
      img_url: productImage,
      amount: req.body.amount,
      category: dbCategory,
      price: req.body.price,
    };

    //validate
    if (!(await productValidation(res, prod))) return;

    await productRepository.save(prod);

    res.json({ message: "Added product successfully" });
  } catch (err) {
    res.json(err);
  }
};

//delete
export const deleteProduct = async (req: req, res: res) => {
  try {
    const productRepository = getRepository(Product);

    await productRepository.delete(req.params.id);
    res.json({ message: "Product successfully deleted" });
  } catch (err) {
    res.json({ message: "No such product", error: err });
  }
};

//update
export const updateProduct = async (req: req, res: res) => {
  try {
    let productImage;

    const productRepository = getRepository(Product);
    const categoryRepository = getRepository(Category);

    const dbCategory = await categoryRepository.findOne({
      where: { category_name: req.body.category },
    });

    if (typeof dbCategory === "undefined") {
      res.json({
        error: { field: "category", message: "No such category" },
      });
      return;
    }

    if (!req.file) {
      productImage = `uploads\\default.png`;
    } else {
      productImage = req.file.path;
      console.log(req.file.path);
    }

    const prod: Product_type = {
      product_id: parseInt(req.params.id),
      name: req.body.name,
      description: req.body.description,
      img_url: productImage,
      amount: req.body.amount,
      category: dbCategory,
      price: req.body.price,
    };

    await productRepository.save(prod);
    res.json({ message: "Product updated successfully" });
  } catch (err) {
    res.json({ message: "No such product", error: err });
  }
};

//get by category
export const getProductByCategory = async (req: req, res: res) => {
  try {
    const productRepository = getRepository(Product);
    const categoryRepository = getRepository(Category);

    const dbCategory = await categoryRepository.findOne({
      where: { category_name: req.params.category },
    });

    if (typeof dbCategory === "undefined") {
      res.json({
        error: { field: "category", message: "No such category" },
      });
      return;
    }

    const product = await productRepository.find({
      where: { category: dbCategory },
      relations: ["category"],
    });

    if (product.length === 0) {
      res.json({
        error: { field: "category", message: "No products for this category" },
      });
      return;
    }

    res.json(product);
  } catch (err) {
    res.json({ error: err });
  }
};
