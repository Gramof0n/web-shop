import React from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import { mapError } from "../utils/mapError";
import { useRouter } from "next/router";
interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  axios.defaults.withCredentials = true;
  return (
    <Box color="white" bgColor="blackAlpha.800" h="100vh">
      <Wrapper variant="small">
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
                backgroundColor="#275987"
                type="submit"
                isLoading={isSubmitting}
              >
                {" "}
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Box>
  );
};

export default Register;
