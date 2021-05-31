import { AxiosResponse } from "axios";
import { Product_type } from "../types";
import { ApiCalls } from "./apiCalls";

const api = ApiCalls.getInstance();

export const getProducts = async (
  setProducts: Function,
  setErrors: Function,
  setIsLoading: Function,
  category?: string | string[],
  searchTerm?: string
) => {
  let res: AxiosResponse<any>;
  console.log("Kategorija ulazni parametar: " + category);
  if (typeof category !== "undefined") {
    res = await api.get(`/products/category/${category}`);
    console.log("KATEGORIJA PRODUCT");
  } else {
    res = await api.get("/products");
    console.log("SVI PRODUCT");
  }

  if (res.data.error) {
    console.log(res.data.error);
    setErrors(res.data.error);
    return;
  }

  console.log("SEARCH TERM: " + searchTerm);
  if (typeof searchTerm !== "undefined") {
    res.data.products = res.data.products.filter((product: Product_type) => {
      return product.name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase());
    });
  }
  console.log("DATA");
  console.log(res.data);

  setProducts(res.data.products);
  setIsLoading(false);
};
