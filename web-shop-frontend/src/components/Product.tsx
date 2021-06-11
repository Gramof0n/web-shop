import { Image } from "@chakra-ui/image";
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import {
  Grid,
  Stat,
  StatNumber,
  Tag,
  TagLeftIcon,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import * as FontAwesome from "react-icons/fa";
import NextLink from "next/link";
import { ApiCalls } from "../utils/apiCalls";
import { addToCart } from "../utils/addToCart";

interface ProductProps {
  id?: number;
  name: string;
  description: string;
  productImage: string;
  amount: number;
  category: string;
  price: number;
  refs?: React.LegacyRef<HTMLDivElement>;
}

const api = ApiCalls.getInstance();

export const Product: React.FC<ProductProps> = ({
  name,
  description,
  productImage,
  amount,
  category,
  price,
  refs,
  id,
}) => {
  const toast = useToast();

  return (
    <Flex flexDir="column" border="1px solid black" p={5} ref={refs}>
      <NextLink href={`../product/${id}`}>
        <Flex justifyContent="center" cursor="pointer">
          <Image src={productImage} alt={name} boxSize="200px" />
        </Flex>
      </NextLink>
      <Text fontSize="2xl" textAlign="center" fontWeight="bold" mb={5}>
        {name}
      </Text>
      <Text fontSize="sm">
        {description.length > 200
          ? `${description.substr(0, 200).toString()}...`
          : description}
      </Text>
      <Grid gridTemplateColumns="repeat(2, 1fr)" mt={5}>
        <Tag
          variant="solid"
          backgroundColor="blackAlpha.800"
          size="md"
          minW={100}
          maxW={120}
        >
          <TagLeftIcon as={FontAwesome.FaTag} />
          {category}
        </Tag>
        <Stat textAlign="center">
          <StatNumber fontSize={30}>{price}€</StatNumber>
        </Stat>
      </Grid>
      <Grid
        mt={5}
        gridTemplateColumns="repeat(5, 1fr)"
        borderTop="1px solid black"
        pt={5}
      >
        <Tooltip label="Details" backgroundColor="blackAlpha.800" color="white">
          <Link gridColumnStart={2}>
            <NextLink href={`../product/${id}`}>
              <FontAwesome.FaInfo size={30} color="blackAlpha.800" />
            </NextLink>
          </Link>
        </Tooltip>

        <Tooltip
          label="Add to cart"
          backgroundColor="blackAlpha.800"
          color="white"
        >
          <Link
            gridColumnStart={4}
            onClick={async () => {
              const message = await addToCart(id);

              toast(message);
            }}
          >
            <FontAwesome.FaCartPlus size={30} color="blackAlpha.800" />
          </Link>
        </Tooltip>
      </Grid>
    </Flex>
  );
};
