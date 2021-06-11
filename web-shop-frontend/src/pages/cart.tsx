import { Flex, Grid, Text } from "@chakra-ui/layout";
import { Box, Button, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CategoriesBar from "../components/CategoriesBar";
import NavBar from "../components/NavBar";
import ProductCartDisplay from "../components/ProductCartDisplay";
import { Cart_type } from "../types";
import { ApiCalls } from "../utils/apiCalls";
import { getUser } from "../utils/getUser";

interface Props {}

const api = ApiCalls.getInstance();

const cart = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cartData, setCartData] = useState<Cart_type>();
  const [loggedUserId, setLoggedUserId] = useState<number>();

  const toast = useToast();
  useEffect(() => {
    getUserCart();
  }, [cartData]);

  async function getUserCart() {
    const user = await getUser();

    console.log(user);
    const cart = await api.get(`/cart/${user.id}`);

    console.log(cart.data);
    setCartData(cart.data);
    setLoggedUserId(user.id);
    setIsLoading(false);
  }
  return (
    <>
      <NavBar />
      <CategoriesBar pathname={`category_products/[name]`} />

      <Flex flexDirection="row" flexGrow={1} w="100%" justifyContent="center">
        <Grid
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            lg: "repeat(2, 1fr)",
          }}
          alignSelf="center"
          maxW={{ "2xl": "70%", lg: "100%", md: "100%", sm: "100%" }}
          columnGap="5em"
          backgroundColor="#f5f5f5"
          p={5}
          flex={1}
        >
          {isLoading ? (
            <Box>Loading...</Box>
          ) : (
            <>
              <Flex flexDir="column">
                {cartData.products.map((product, index) => {
                  return (
                    <ProductCartDisplay
                      key={index}
                      product={product}
                      user_id={loggedUserId}
                    />
                  );
                })}
              </Flex>
              <Flex
                justifyContent="center"
                flexDir="column"
                w="100%"
                backgroundColor="whiteAlpha.800"
              >
                <Text fontSize="5xl" alignSelf="center" mb={5}>
                  Total: {cartData.total_price}€{" "}
                </Text>
                <Text fontSize="3xl" alignSelf="center" mb={5}>
                  Items in cart: {cartData.products.length}
                </Text>
                <Button colorScheme="green" alignSelf="center" w="20em" mb={5}>
                  Checkout
                </Button>

                <Button
                  colorScheme="red"
                  alignSelf="center"
                  w="20em"
                  onClick={async () => {
                    try {
                      await api.get(`/cart/clear/${loggedUserId}`);
                      toast({
                        title: "Cart cleared",
                        description: "All products removed from cart!",
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
                  Clear cart
                </Button>
              </Flex>
            </>
          )}
        </Grid>
      </Flex>
    </>
  );
};

export default cart;
