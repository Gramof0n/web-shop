import { Box, Flex, Grid, Heading, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ApiCalls } from "../utils/apiCalls";
import NextLink from "next/link";

type Category = {
  category_name: string;
};
interface Props {
  pathname: string;
}

const CategoriesBar = (props: Props) => {
  const api = ApiCalls.getInstance();
  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    const res = await api.get("/categories");
    setCategories(res.data);
  }
  return (
    <Flex
      flex={1}
      justifyContent="center"
      p={4}
      backgroundColor="blackAlpha.800"
      color="white"
      borderTop="1px solid white"
    >
      <Grid gridTemplateColumns="repeat(10, 1fr)" minW="70%">
        {categories.map((category, index) => {
          return (
            <Box key={index} ml={3} fontSize={16}>
              <NextLink
                href={{
                  pathname: props.pathname,
                  query: { name: category.category_name },
                }}
              >
                <Link mr={4} color="white" fontSize="lg">
                  {category.category_name}
                </Link>
              </NextLink>
            </Box>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default CategoriesBar;
