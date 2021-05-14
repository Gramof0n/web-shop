import { Box } from "@chakra-ui/react";
import React from "react";

type WrapperProps = {
  variant?: "small" | "regular";
  bgColor?: string;
  color?: string;
};
const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant,
  bgColor,
  color,
}) => {
  return (
    <Box
      padding={4}
      mx="auto"
      maxW={variant === "small" ? "400px" : "1500px"}
      backgroundColor={bgColor}
      color={color}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
