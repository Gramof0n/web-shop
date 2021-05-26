import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputRightAddon,
  IconButton,
} from "@chakra-ui/react";
import React from "react";

interface SearchBarProps {}

export const SearchBar: React.FC<SearchBarProps> = ({}) => {
  return (
    <>
      <InputGroup minW={{ sm: "250px", lg: "450px", md: "300px" }}>
        <Input type="text" color="white" />
        <InputRightAddon m={0} p={0} w={10}>
          <IconButton
            aria-label="search-products"
            icon={<SearchIcon />}
            w="100%"
          />
        </InputRightAddon>
      </InputGroup>
    </>
  );
};

export default SearchBar;
