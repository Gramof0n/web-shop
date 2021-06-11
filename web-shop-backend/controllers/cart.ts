import { Cart } from "../entities/Cart";
import { Product } from "../entities/Product";
import { WebshopUser } from "../entities/WebshopUser";
import { getRepository } from "typeorm";
import { req, res } from "../types";

//get cart
export const getUsersCart = async (req: req, res: res) => {
  try {
    const userRepository = getRepository(WebshopUser);
    const cartRepository = getRepository(Cart);

    const dbUser = await userRepository.findOne({
      where: { webshop_user_id: req.params.user_id },
    });
    const dbCart = await cartRepository.findOne({
      relations: ["user", "products"],
      where: { user: dbUser },
    });

    if (Object.keys(dbCart!).length === 0) {
      throw new Error();
    }

    res.json(dbCart);
  } catch (err) {
    res.json({ error: { message: "No such user" } });
  }
};

//add to cart
export const addProductToCart = async (req: req, res: res) => {
  try {
    const productRepository = getRepository(Product);
    const userRepository = getRepository(WebshopUser);
    const cartRepository = getRepository(Cart);

    const dbProduct = await productRepository
      .createQueryBuilder("product")
      .setLock("pessimistic_write")
      .useTransaction(true)
      .where("product_id=:id", { id: req.params.product_id })
      .getOne();

    const dbUser = await userRepository.findOne({
      where: { webshop_user_id: req.params.user_id },
    });
    const dbCart = await cartRepository.findOne({
      relations: ["user", "products"],
      where: { user: dbUser },
    });

    for (let p of dbCart?.products!) {
      console.table({ product: p, DataBaseProduct: dbProduct });
      if (p.product_id === dbProduct?.product_id) {
        res.json({
          error: { field: "exists", message: "Product already in cart" },
        });
        return;
      }
    }
    dbCart?.products.push(dbProduct!);

    let total_price = 0;
    for (let p of dbCart?.products!) {
      total_price += p.price;
    }
    dbCart!.total_price = total_price;
    await cartRepository.save(dbCart!);

    res.json({ message: "Product successfully added to cart", cart: dbCart });
  } catch (err) {
    res.json({ error: err });
  }
};

//remove from cart
export const removeProductFromCart = async (req: req, res: res) => {
  try {
    const productRepository = getRepository(Product);
    const userRepository = getRepository(WebshopUser);
    const cartRepository = getRepository(Cart);

    const dbProduct = await productRepository.findOne({
      where: { product_id: req.params.product_id },
    });
    const dbUser = await userRepository.findOne({
      where: { webshop_user_id: req.params.user_id },
    });
    const dbCart = await cartRepository.findOne({
      relations: ["user", "products"],
      where: { user: dbUser },
    });

    if (dbCart!.products.length === 0) {
      res.json({ error: { field: "empty", message: "Cart is empty" } });
      return;
    }

    const id = dbCart!.products.find(
      (product) => product.product_id === dbProduct!.product_id
    );

    if (typeof id === "undefined") {
      res.json({
        error: { field: "no_product", message: "No such product in cart" },
      });
      return;
    }
    dbCart!.products = dbCart!.products.filter((product, _) => {
      console.table({
        FilterProductId: product.product_id,
        DbProductId: dbProduct?.product_id,
      });
      return product.product_id !== dbProduct!.product_id;
    });

    let total_price = 0;
    for (let p of dbCart?.products!) {
      total_price += p.price;
    }
    dbCart!.total_price = total_price;

    await cartRepository.save(dbCart!);

    res.json({ message: "Product removed", cart: dbCart });
  } catch (err) {
    res.json({ error: err });
  }
};

//remove everything
export const removeAllFromCart = async (req: req, res: res) => {
  try {
    const userRepository = getRepository(WebshopUser);
    const cartRepository = getRepository(Cart);

    const dbUser = await userRepository.findOne({
      where: { webshop_user_id: req.params.user_id },
    });
    const dbCart = await cartRepository.findOne({
      relations: ["user", "products"],
      where: { user: dbUser },
    });

    if (dbCart!.products.length === 0) {
      res.json({ error: { field: "empty", message: "Cart is empty" } });
      return;
    }

    dbCart!.products = [];
    dbCart!.total_price = 0;

    await cartRepository.save(dbCart!);

    res.json({ message: "Cart cleared", cart: dbCart });
  } catch (err) {
    res.json({ error: err });
  }
};
