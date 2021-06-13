import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import { ApiCalls } from "../utils/apiCalls";
import { mapError } from "../utils/mapError";
import NextLink from "next/link";

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const api = ApiCalls.getInstance();
  axios.defaults.withCredentials = true;

  return (
    <Flex
      flexDirection="row"
      flexGrow={1}
      w="100%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="blackAlpha.800"
    >
      <Grid
        gridTemplateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        backgroundColor="white"
      >
        <Flex
          w={{ "2xl": "2xl", lg: "lg", md: "md", sm: "sm" }}
          display={{ sm: "none", md: "flex" }}
        >
          <Image src={require("../assets/login-register.jpg")} w="100%" />
        </Flex>

        <Flex w="100%" justifyContent="center" flexDir="column" p={12}>
          <Text fontSize="3xl" mb={2}>
            Welcome back
          </Text>
          <Text fontSize="1xl" mb={5}>
            Up for some more shopping? Hop right in!
          </Text>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await api.post("/users/login", {
                username: values.username,
                password: values.password,
              });

              if (response.data?.error) {
                setErrors(mapError(response.data.error));
                return;
              }

              router.push("/");

              console.log(response);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField label="Username" name="username" />

                <InputField label="Password" name="password" type="password" />

                <Button
                  mt={4}
                  color="white"
                  backgroundColor="blackAlpha.800"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  {" "}
                  Login
                </Button>
              </Form>
            )}
          </Formik>

          <Flex flexDir="row" mt={2}>
            <Text mr="0.2em">Don't have an account? </Text>
            <NextLink href="../register">
              <Text color="blue.600" cursor="pointer">
                {" "}
                Register here
              </Text>
            </NextLink>
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default login;
