import React from "react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import { Image, Button, Flex, Grid, Text } from "@chakra-ui/react";
import axios from "axios";
import { mapError } from "../utils/mapError";
import { useRouter } from "next/router";
import NextLink from "next/link";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
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
            Welcome to Techoton
          </Text>
          <Text fontSize="1xl" mb={5}>
            The one stop shop for all your tech needs
          </Text>

          <Formik
            initialValues={{
              name: "",
              surname: "",
              username: "",
              password: "",
              confirm: "",
              email: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await axios.post(
                "http://localhost:4000/api/v1/users",
                {
                  name: values.name,
                  surname: values.surname,
                  username: values.username,
                  password: values.password,
                  email: values.email,
                }
              );

              if (values.password !== values.confirm) {
                setErrors({
                  confirm: "Passwords don't match",
                });
                return;
              }

              if (response.data?.error) {
                setErrors(mapError(response.data.error));
                return;
              }

              router.push("/");

              //console.log(response);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  label="Name"
                  name="name"
                  placeholder="Your name here"
                />
                <InputField
                  label="Surname"
                  name="surname"
                  placeholder="Your surname here"
                />
                <InputField
                  label="Username"
                  name="username"
                  placeholder="Username mustn't contain an @"
                />
                <InputField
                  label="E-mail"
                  name="email"
                  placeholder="Your email here"
                />
                <InputField
                  label="Password"
                  name="password"
                  placeholder="Password must be over 3 characters"
                  type="password"
                />

                <InputField
                  label="Confirm password"
                  name="confirm"
                  placeholder="Retype your password"
                  type="password"
                />

                <Button
                  mt={4}
                  backgroundColor="blackAlpha.800"
                  type="submit"
                  color="white"
                  isLoading={isSubmitting}
                >
                  {" "}
                  Register
                </Button>
              </Form>
            )}
          </Formik>
          <Flex flexDir="row" mt={2}>
            <Text mr="0.2em">Have an account already? </Text>
            <NextLink href="../login">
              <Text color="blue.600" cursor="pointer">
                {" "}
                Login here
              </Text>
            </NextLink>
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default Register;
