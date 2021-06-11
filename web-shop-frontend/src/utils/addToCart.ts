import { UseToastOptions } from "@chakra-ui/toast";
import { ApiCalls } from "./apiCalls";

export const addToCart = async (
  product_id: number
): Promise<UseToastOptions> => {
  try {
    const api = ApiCalls.getInstance();
    const res = await api.get("/user/me");
    if (Object.keys(res.data.user).length === 0) {
      return {
        title: "Error adding to cart",
        description: "You need to login first!",
        status: "error",
        duration: 2000,
      };
    }

    const user_id: number = res.data.user.id;

    const res_cart = await api.get(
      `/cart/add/user_id=${user_id}&product_id=${product_id}`
    );

    console.log(res_cart.data);

    if (res_cart.data.error) {
      return {
        title: "Error adding to cart",
        description: "Product is already in cart!",
        status: "error",
        duration: 2000,
      };
    }

    return {
      title: "Product added",
      description: "Product has been successfully added to cart!",
      status: "success",
      duration: 2000,
    };
  } catch (err) {
    return {
      title: "Error adding to cart",
      description: "Something went wrong;",
      status: "error",
      duration: 2000,
    };
  }
};
