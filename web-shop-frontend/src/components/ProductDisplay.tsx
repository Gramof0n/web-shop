import { Box, Grid } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { getProducts } from "../utils/getProducts";
import { Product } from "./Product";
import Wrapper from "./Wrapper";

interface ProductDisplayProps {}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({}) => {
  const baseUrl = "http://localhost:4000/";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(setProducts);
  }, []);

  return (
    <Flex
      flexGrow={1}
      width="100%"
      flexDir="row"
      justifyContent="center"
      backgroundColor="#f5f5f5"
    >
      <Grid
        templateColumns="repeat(5,2fr)"
        gap="5"
        boxShadow="2xl"
        m="0"
        p="10"
        minW="1500px"
      >
        {products &&
          products.map((data, index) => {
            return (
              <Product
                key={index}
                name={data.name}
                description={data.description}
                productImage={baseUrl + data.img_url}
                amount={data.amount}
                price={data.price}
                category={data.category}
              />
            );
          })}
      </Grid>
    </Flex>
  );
};
