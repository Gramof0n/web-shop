import { Grid } from "@chakra-ui/layout";
import { Flex, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { Error_type, Product_type } from "../types";
import { getProducts } from "../utils/getProducts";
import { Product } from "./Product";

interface ProductDisplayProps {
  category?: string | string[];
  searchTerm?: string;
}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({
  category,
  searchTerm,
}) => {
  const baseUrl = "http://localhost:4000/";
  const [products, setProducts] = useState<Array<Product_type>>([]);
  const [errors, setErrors] = useState<Error_type>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setErrors(null);
    getProducts(setProducts, setErrors, setIsLoading, category, searchTerm);
  }, [category, searchTerm]);

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
        >
          {errors !== null ? (
            <Flex>{errors.message}</Flex>
          ) : (
            products.map((data, index) => {
              return (
                <Product
                  key={index}
                  name={data.name}
                  description={data.description}
                  productImage={baseUrl + data.img_url}
                  amount={data.amount}
                  price={data.price}
                  category={data.category.category_name}
                />
              );
            })
          )}
        </Grid>
      )}
    </Flex>
  );
};
