import { Grid } from "@chakra-ui/layout";
import { Flex, Spinner } from "@chakra-ui/react";
import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import { BASE_API_URL } from "../constants";
import useGetProducts from "../utils/useGetProducts";
import { Product } from "./Product";

interface ProductDisplayProps {
  category?: string | string[];
  searchTerm?: string;
}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({
  category,
  searchTerm,
}) => {
  const [pageNo, setPageNo] = useState<number>(1);

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    setPageNo(1);
  }, [category, searchTerm]);

  const { products, errors, isLoading, hasMore, isFetchingMore } =
    useGetProducts(category, searchTerm, pageNo);

  const lastProductRef = useCallback(
    (product) => {
      console.log(`HAS MORE PRODUCTS? ${hasMore}`);
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNo((previousPage) => previousPage + 1);
        }
      });

      if (product) observer.current.observe(product);
    },
    [isLoading, hasMore]
  );

  return (
    <Flex
      flexGrow={1}
      width="100%"
      flexDir="row"
      justifyContent="center"
      backgroundColor="#f5f5f5"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid
          templateColumns={{
            lg: "repeat(4,2fr)",
            md: "repeat(2,2fr)",
            sm: "repeat(1,2fr)",
            "2xl": "repeat(5,2fr)",
          }}
          gap="5"
          boxShadow="2xl"
          m="0"
          p="10"
          maxW={{ sm: "100%", md: "100%", lg: "100%", "2xl": "70%" }}
          flex={1}
        >
          {errors !== null ? (
            <Flex>{errors.message}</Flex>
          ) : (
            <>
              {products.map((data, index) => {
                if (products.length === index + 1) {
                  return (
                    <Product
                      refs={lastProductRef}
                      key={index}
                      name={data.name}
                      description={data.description}
                      productImage={BASE_API_URL + data.img_url}
                      amount={data.amount}
                      price={data.price}
                      category={data.category.category_name}
                      id={data.product_id}
                    />
                  );
                }
                return (
                  <Product
                    key={index}
                    name={data.name}
                    description={data.description}
                    productImage={BASE_API_URL + data.img_url}
                    amount={data.amount}
                    price={data.price}
                    category={data.category.category_name}
                    id={data.product_id}
                  />
                );
              })}
              {isFetchingMore ? (
                <Flex w="100%" alignContent="center" justifyContent="center">
                  <Spinner size="xl" />
                </Flex>
              ) : (
                ""
              )}
            </>
          )}
        </Grid>
      )}
    </Flex>
  );
};
