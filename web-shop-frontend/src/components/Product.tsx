import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Grid } from "@chakra-ui/react";
import React from "react";

interface ProductProps {
  name: string;
  description: string;
  productImage: string;
  amount: number;
  category: string;
  price: number;
}

export const Product: React.FC<ProductProps> = ({
  name,
  description,
  productImage,
  amount,
  category,
  price,
}) => {
  console.log(productImage);
  return (
    <Flex>
      <Box>
        <Text fontSize="2xl" textAlign="center">
          {name}
        </Text>
        <Box>
          <Image src={productImage} alt={name} boxSize="200px" />
        </Box>
        <Text fontSize="md">
          <strong>Description: </strong>
          {description}
        </Text>
        <Grid>
          <Text fontSize="sm">
            <strong>Category: </strong>
            {category}
          </Text>
          <Text fontSize="sm">
            <strong>Amount: </strong>
            {amount}
          </Text>
          <Text fontSize="sm">
            <strong>Price: </strong>
            {price}$
          </Text>
        </Grid>
      </Box>
    </Flex>
  );
};
