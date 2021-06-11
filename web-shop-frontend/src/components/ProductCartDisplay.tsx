import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Grid, Text } from "@chakra-ui/layout";
import { Stat, StatNumber } from "@chakra-ui/stat";
import React from "react";
import { BASE_API_URL } from "../constants";
import { Product_type } from "../types";
import * as FontAwesome from "react-icons/fa";
import { ApiCalls } from "../utils/apiCalls";
import { useToast } from "@chakra-ui/toast";
interface Props {
  product: Product_type;
  user_id: number;
}

const api = ApiCalls.getInstance();

const ProductCartDisplay = ({ product, user_id }: Props) => {
  const toast = useToast();
  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      mb={4}
      alignItems="center"
      backgroundColor="whiteAlpha.800"
      p={2}
    >
      <Image
        src={BASE_API_URL + product.img_url}
        height="100px"
        width="100px"
      />
      <Text fontSize="3xl">{product.name}</Text>
      <Stat textAlign="center">
        <StatNumber>{product.price}€</StatNumber>
      </Stat>
      <Button
        variant="link"
        onClick={async () => {
          try {
            const res = await api.get(
              `/cart/remove/user_id=${user_id}&product_id=${product.product_id}`
            );

            toast({
              title: res.data.message,
              description: "Product removed successfully!",
              status: "success",
              duration: 2000,
            });
          } catch (error) {
            toast({
              title: "Error",
              description: "Something went wrong",
              status: "error",
              duration: 2000,
            });
          }
        }}
      >
        <FontAwesome.FaTrash color="grey" size={30} />
      </Button>
    </Grid>
  );
};

export default ProductCartDisplay;
