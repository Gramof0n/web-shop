import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Flex, Grid, Text } from "@chakra-ui/layout";
import { Tag, TagLeftIcon, useToast } from "@chakra-ui/react";
import React from "react";
import { Product_type } from "../types";
import * as FontAwesome from "react-icons/fa";
import { addToCart } from "../utils/addToCart";

interface Props {
  product: Product_type;
}

const DetailedProduct = ({ product }: Props) => {
  const baseUrl = "http://localhost:4000/";
  const toast = useToast();
  return (
    <Flex flexDirection="row" flexGrow={1} w="100%" justifyContent="center">
      <Grid
        templateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        columnGap="1em"
        p={10}
        backgroundColor="#f5f5f5"
        alignSelf="center"
        maxW={{ "2xl": "70%", lg: "100%", md: "100%", sm: "100%" }}
        flex={1}
      >
        <Flex
          flexDirection="column"
          alignContent="center"
          alignItems={{ md: "center", lg: "flex-start", sm: "center" }}
        >
          <Flex>
            <Text fontSize="5xl" mb={7} mr="2em" letterSpacing="2px">
              {product.name}
            </Text>
            <Tag
              variant="solid"
              backgroundColor="blackAlpha.800"
              size="md"
              minW={100}
              maxW={150}
              h={50}
              mt={4}
            >
              <TagLeftIcon as={FontAwesome.FaTag} />
              {product.category.category_name}
            </Tag>
          </Flex>
          <Text fontSize="3xl" mb={7}>
            Regular price: {product.price}€
          </Text>

          <Image src={baseUrl + product.img_url} w="30rem" />
        </Flex>

        <Flex
          m={0}
          p={0}
          justifySelf="center"
          w="85%"
          flexDir="column"
          justifyContent="center"
        >
          <Text fontSize="3xl" mb={7}>
            Description:
          </Text>
          <Text mb={10}>{product.description}</Text>
          {product.amount < 1 ? (
            <Text mb={10} color="red">
              Out of stock
            </Text>
          ) : null}
          <Button
            colorScheme="green"
            disabled={product.amount < 1 ? true : false}
            onClick={async () => {
              const message = await addToCart(product.product_id);
              toast(message);
            }}
          >
            Add to cart
          </Button>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default DetailedProduct;
