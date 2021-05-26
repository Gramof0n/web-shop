import { ApiCalls } from "./apiCalls";

const api = ApiCalls.getInstance();

export const getProducts = async (
  setProducts: Function,
  setErrors: Function,
  category?: string | string[]
) => {
  let res;
  console.log("Kategorija ulazni parametar: " + category);
  if (typeof category !== "undefined") {
    res = await api.get(`/products/category/${category}`);
    console.log("KATEGORIJA PRODUCT");
  } else {
    res = await api.get("/products");
    console.log("SVI PRODUCT");
  }
  console.log("DATA");
  if (res.data.error) {
    console.log(res.data.error);
    setErrors(res.data.error);
    return;
  }
  console.log(res.data);
  setProducts(res.data);
};
