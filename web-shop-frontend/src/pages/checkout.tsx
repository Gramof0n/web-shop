import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  toast,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import CategoriesBar from "../components/CategoriesBar";
import InputField from "../components/InputField";
import NavBar from "../components/NavBar";
import { Cart_type, User_type } from "../types";
import { ApiCalls } from "../utils/apiCalls";
import { getUser } from "../utils/getUser";

interface Props {}

const api = ApiCalls.getInstance();
const checkout = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cartData, setCartData] = useState<Cart_type>();
  const [loggedUserId, setLoggedUserId] = useState<number>();
  const [user, setUser] = useState<User_type>();
  const toast = useToast();

  const [isAlertOpened, setIsAlertOpened] = useState<boolean>(false);
  const cancelRef = useRef();
  const onClose = () => setIsAlertOpened(false);

  const router = useRouter();

  useEffect(() => {
    getUserCart();
  }, []);

  async function getUserCart() {
    const user = await getUser();

    const cart = await api.get(`/cart/${user.id}`);
    const detailedUser = await api.get(`/users/${user.id}`);

    setUser(detailedUser.data);
    setCartData(cart.data);
    setLoggedUserId(user.id);
    setIsLoading(false);
  }
  return (
    <>
      <NavBar isSearchbarEnabled={false} />
      <CategoriesBar pathname={`category_products/[name]`} />

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Flex flexDirection="row" flexGrow={1} w="100%" justifyContent="center">
          <Formik
            initialValues={{
              name: user.name,
              surname: user.surname,
              email: user.email,
              country: "",
              city: "",
              address: "",
              address_apartment: "",
              post_number: null,
              company: "",
              phone: "",
            }}
            onSubmit={async () => {
              try {
                await api.get(
                  `/product/purchase-multiple?ids=${cartData.products.map(
                    (prod) => parseInt(prod.product_id + ",")
                  )}`
                );
                await api.get(`/cart/clear/${loggedUserId}`);
                getUserCart();

                setIsAlertOpened(true);
                setTimeout(() => {
                  setIsAlertOpened(false);
                  router.push("/");
                }, 2000);
              } catch (err) {
                toast({
                  title: "Error",
                  description: "Something went wrong",
                  status: "error",
                  duration: 2000,
                });
              }
            }}
          >
            {({ handleBlur, handleChange, handleSubmit }) => (
              <Grid
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(1, 1fr)",
                  lg: "4fr 2fr",
                }}
                alignSelf="center"
                maxW={{ "2xl": "70%", lg: "100%", md: "100%", sm: "100%" }}
                columnGap="10em"
                backgroundColor="#f5f5f5"
                p={5}
                flex={1}
              >
                <Flex flexDir="column">
                  <Text fontSize="3xl">Contact information: </Text>
                  <InputField name="email" label="Email: " />

                  <Text fontSize="3xl" mt={7}>
                    Delivery information:{" "}
                  </Text>
                  <Grid gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                    <InputField name="name" label="Name: " />
                    <InputField name="surname" label="Surname: " />
                  </Grid>
                  <InputField name="company" label="Company (optional):" />
                  <InputField name="address" label="Address:" />
                  <InputField
                    name="address_appartment"
                    label="Address - appartment, suite (optional):"
                  />
                  <InputField name="city" label="City:" />
                  <Grid gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                    <InputField name="country" label="Country: " />
                    <InputField name="postal_code" label="Postal code: " />
                  </Grid>
                  <InputField name="phone" label="Phone:" />
                </Flex>

                <Flex
                  backgroundColor="whiteAlpha.900"
                  boxSize="sm"
                  p={5}
                  flexDir="column"
                >
                  <Text fontSize="2xl" mb={7}>
                    Checkout information:{" "}
                  </Text>
                  <Stat>
                    <StatLabel>Price total:</StatLabel>
                    <StatNumber>{cartData.total_price}€</StatNumber>

                    <StatLabel mt={5}>Total items:</StatLabel>
                    <StatNumber>{cartData.products.length}</StatNumber>
                  </Stat>

                  <Button
                    mt={5}
                    backgroundColor="blackAlpha.800"
                    color="white"
                    onClick={() => handleSubmit()}
                  >
                    Checkout
                  </Button>
                </Flex>
              </Grid>
            )}
          </Formik>
          <AlertDialog
            isOpen={isAlertOpened}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogBody p={0}>
                  <Alert
                    status="success"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                  >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                      Purchase successful
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                      Thank you for shoping with us! You will be redirected to
                      the main page.
                    </AlertDescription>
                  </Alert>
                </AlertDialogBody>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
          ;
        </Flex>
      )}
    </>
  );
};

export default checkout;
