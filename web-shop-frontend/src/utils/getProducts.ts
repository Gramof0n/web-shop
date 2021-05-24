import axios from "axios";

const urlProducts = "http://localhost:4000/api/v1";

export const getProducts = async (setProducts) => {
  const res = await axios.get(urlProducts + "/products");
  console.log(res.data);
  setProducts(res.data);
};
