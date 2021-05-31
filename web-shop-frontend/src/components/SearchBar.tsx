import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputRightAddon,
  IconButton,
  InputProps,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface SearchBarProps {
  setSearchValue?: Function;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setSearchValue }) => {
  return (
    <>
      <InputGroup minW={{ sm: "250px", lg: "450px", md: "300px" }}>
        <Input
          type="text"
          color="white"
          onChange={(e) => {
            console.log(e.target.value);
            setSearchValue(e.target.value);
          }}
        />
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
