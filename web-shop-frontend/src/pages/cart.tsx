import { Flex, Grid, Text } from "@chakra-ui/layout";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cartData, setCartData] = useState<Cart_type>();
  const [loggedUserId, setLoggedUserId] = useState<number>();

  const toast = useToast();
  useEffect(() => {
    getUserCart();
  }, []);

  async function getUserCart() {
    const user = await getUser();

    const cart = await api.get(`/cart/${user.id}`);

    setCartData(cart.data);
    setLoggedUserId(user.id);
    setIsLoading(false);
  }
  return (
    <>
      <NavBar isSearchbarEnabled={false} />
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
              <Box>
                {cartData.products.length < 1 ? (
                  <Flex
                    flexDir="column"
                    flexGrow={1}
                    alignItems="center"
                    justifyContent="center"
                    h="100%"
                  >
                    <Text fontSize="2xl">Cart is empty.</Text>
                  </Flex>
                ) : (
                  <Flex flexDir="column">
                    {cartData.products.map((product, index) => {
                      return (
                        <ProductCartDisplay
                          key={index}
                          product={product}
                          user_id={loggedUserId}
                          getUserCart={getUserCart}
                        />
                      );
                    })}
                  </Flex>
                )}
              </Box>
              <Flex
                justifyContent="center"
                flexDir="column"
                w="100%"
                backgroundColor="whiteAlpha.800"
                justifySelf="center"
              >
                <Text fontSize="5xl" alignSelf="center" mb={5}>
                  Total: {cartData.total_price}€{" "}
                </Text>
                <Text fontSize="3xl" alignSelf="center" mb={5}>
                  Items in cart: {cartData.products.length}
                </Text>
                <Button
                  colorScheme="green"
                  alignSelf="center"
                  w="20em"
                  mb={5}
                  disabled={cartData.products.length < 1 ? true : false}
                  onClick={() => {
                    router.push({
                      pathname: "/checkout",
                      query: { cartData: JSON.stringify(cartData) },
                    });
                  }}
                >
                  Go to checkout
                </Button>
                <Button
                  colorScheme="red"
                  alignSelf="center"
                  w="20em"
                  onClick={async () => {
                    try {
                      if (cartData.products.length < 1) {
                        toast({
                          title: "Error",
                          description: "Can't clear what's already empty",
                          status: "error",
                          duration: 2000,
                        });
                        return;
                      }
                      await api.get(`/cart/clear/${loggedUserId}`);
                      await getUserCart();

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
