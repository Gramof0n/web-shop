import { Box, Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { ApiCalls } from "../utils/apiCalls";
import { mapError } from "../utils/mapError";

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const api = ApiCalls.getInstance();
  axios.defaults.withCredentials = true;

  return (
    <Box color="white" bgColor="blackAlpha.800" h="100vh">
      <Wrapper variant="small">
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
                backgroundColor="#275987"
                type="submit"
                isLoading={isSubmitting}
              >
                {" "}
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Box>
  );
};

export default login;
