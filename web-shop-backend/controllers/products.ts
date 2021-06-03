import { Product } from "../entities/Product";
import { getRepository, ILike } from "typeorm";
import { Product_type, req, res } from "../types";
import { productValidation } from "../validation/productValidation";
import { Category } from "../entities/Category";
import { pagination } from "../utils/pagination";

//get all
export const getAllProducts = async (req: req, res: res) => {
  try {
    const productRepository = getRepository(Product);

    const searchTerm =
      typeof req.query.search_term !== "undefined"
        ? req.query.search_term
        : "%";

    const count = await productRepository.count({
      where: { name: ILike(`%${searchTerm}%`) },
    });

    //pagination
    const [pagination_data, take, skip] = pagination(req.query.page, count);

    console.log("Search term: " + searchTerm);

    const data = await productRepository.find({
      relations: ["category", "carts"],
      where: { name: ILike(`%${searchTerm}%`) },
      skip: skip,
      take: take,
    });

    if (data.length > 0) {
      res.json({ found: count, pagination_data, products: data });
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
      relations: ["category", "carts"],
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

    const searchTerm =
      typeof req.query.search_term !== "undefined"
        ? req.query.search_term
        : "%";

    const count = await productRepository.count({
      where: { category: dbCategory, name: ILike(`%${searchTerm}%`) },
    });

    //pagination
    const [pagination_data, take, skip] = pagination(req.query.page, count);

    const product = await productRepository.find({
      where: { category: dbCategory, name: ILike(`%${searchTerm}%`) },
      relations: ["category"],
      skip,
      take,
    });

    if (product.length === 0) {
      res.json({
        error: { field: "category", message: "No products for this category" },
      });
      return;
    }

    res.json({ found: count, pagination_data, products: product });
  } catch (err) {
    res.json({ error: err });
  }
};

//decrement amount (call on purchase)
export const purchaseProduct = async (req: req, res: res) => {
  try {
    const productRepository = getRepository(Product);
    const dbProduct = await productRepository
      .createQueryBuilder("product")
      .setLock("pessimistic_write")
      .useTransaction(true)
      .where("product_id=:id", { id: req.params.id })
      .getOne();

    dbProduct!.amount -= 1;

    await productRepository.save(dbProduct!);

    res.json({
      message: "Transaction complete, item purchased",
      product: dbProduct,
    });
  } catch (err) {
    res.json({
      error: {
        field: "",
        message: "Something went wrong, try again later",
        error: err,
      },
    });
  }
};
