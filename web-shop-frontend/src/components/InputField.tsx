import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useField } from "formik";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
};

const InputField: React.FC<InputFieldProps> = ({ size, label, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl mt={4} isInvalid={!!error}>
      <Text htmlFor={field.name} fontSize="lg" fontWeight="semibold" mb={2}>
        {label}
      </Text>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
        borderColor="blackAlpha.700"
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
