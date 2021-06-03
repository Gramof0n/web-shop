import axios, { Canceler } from "axios";
import { useEffect, useState } from "react";
import { Product_type, Error_type } from "../types";
import { ApiCalls } from "./apiCalls";

export default function useGetProducts(
  category: string | string[],
  searchTerm: string,
  pageNo: number
) {
  const [products, setProducts] = useState<Array<Product_type>>([]);
  const [errors, setErrors] = useState<Error_type>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>();

  const api = ApiCalls.getInstance();
  let srch = typeof searchTerm === "undefined" ? "%" : searchTerm;

  useEffect(() => {
    setProducts([]);
    setErrors(null);
  }, [searchTerm, category]);

  useEffect(() => {
    setIsFetchingMore(true);
    console.log("FETCHING");
    api
      .get(
        `${
          typeof category === "undefined"
            ? `/products?page=${pageNo}&search_term=${srch}`
            : `/products/category/${category}?page=${pageNo}&search_term=${srch}`
        }`
      )
      .then((res) => {
        if (res.data.error) {
          setErrors(res.data.error);
          return;
        }

        setProducts((previous_products) => {
          return [...previous_products, ...res.data.products];
        });

        console.log(res.data);

        setHasMore(typeof res.data.pagination_data.next !== "undefined");
        setIsLoading(false);
        setIsFetchingMore(false);
        setErrors(null);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [pageNo, category, searchTerm]);

  return { products, errors, isLoading, hasMore, isFetchingMore };
}
