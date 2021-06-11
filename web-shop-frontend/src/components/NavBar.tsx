import {
  Flex,
  Box,
  Link,
  Button,
  Image,
  Heading,
  Grid,
  PopoverTrigger,
  Popover,
  Portal,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { getUser } from "../utils/getUser";
import axios from "axios";

import img from "../img/placeholder.png";
import SearchBar from "./SearchBar";
import * as FontAwesome from "react-icons/fa";

interface NavBarProps {
  setSearchValue?: Function;
}

interface IUser {
  id?: number;
  username?: string;
  isadmin?: boolean;

  setUser: React.Dispatch<React.SetStateAction<IUser>> &
    React.Dispatch<React.SetStateAction<{}>>;
}

const NavBar: React.FC<NavBarProps> = ({ setSearchValue }) => {
  let body = null;
  const [user, setUser] = useState<IUser>({} as IUser);
  useEffect(() => {
    async function user() {
      setUser(await getUser());
    }

    user();
  }, []);

  async function logout() {
    await axios.get("http://localhost:4000/api/v1/users/logout");
    setUser({} as IUser);
  }

  if (Object.keys(user).length === 0) {
    //noone logged in
    body = (
      <Box fontSize={{ "2xl": "lg", lg: "lg", md: "md", sm: "sm" }}>
        <NextLink href="/login">
          <Link mr={4} color="white">
            Login
          </Link>
        </NextLink>

        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </Box>
    );
  } else if (Object.keys(user).length !== 0 && user.isadmin !== true) {
    //user logged in
    body = (
      <>
        <Box>
          <NextLink href="../cart">
            <Button
              textAlign="center"
              variant="link"
              color="white"
              onClick={() => {}}
              fontSize={{ "2xl": "lg", lg: "lg", md: "md", sm: "sm" }}
            >
              Cart
              <FontAwesome.FaShoppingCart
                color="white"
                style={{ marginRight: 15, marginLeft: 5 }}
              />
            </Button>
          </NextLink>
        </Box>

        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Button
              variant="link"
              textAlign="center"
              color="white"
              fontSize={{ "2xl": "lg", lg: "lg", md: "md", sm: "sm" }}
            >
              Profile{" "}
              <FontAwesome.FaUserAlt color="white" style={{ marginLeft: 5 }} />
            </Button>
          </PopoverTrigger>

          <Portal>
            <PopoverContent>
              <PopoverHeader>Welcome {user.username}</PopoverHeader>
              <PopoverBody>
                <Button
                  textAlign="center"
                  variant="link"
                  color="black"
                  onClick={async () => {
                    await logout();
                  }}
                >
                  Logout{" "}
                  <FontAwesome.FaSignOutAlt
                    style={{ marginLeft: 5 }}
                    color="black"
                    size={20}
                  />
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </>
    );
  } else {
    //admin logged in
    body = (
      <>
        <Box mr={10} color="white">
          Welcome admin {user.username}
        </Box>
        <Box>
          <NextLink href="/admin-panel">
            <Link mr={10} color="white">
              Admin panel
            </Link>
          </NextLink>
        </Box>
        <Box>
          <Button
            variant="link"
            color="white"
            onClick={async () => {
              await logout();
            }}
          >
            Logout
          </Button>
        </Box>
      </>
    );
  }

  return (
    <Flex background="blackAlpha.800" p={5} flex={1} justifyContent="center">
      <Flex minW="70%">
        <Grid width="100%" templateColumns="repeat(3, 1fr)">
          {/* Image and title */}
          <Flex alignContent="center">
            <NextLink href="/">
              <Image src={img} maxW="60px" cursor="pointer" />
            </NextLink>
            <NextLink href="/">
              <Heading
                variant="h4"
                ml={4}
                color="white"
                display={{ sm: "none", md: "initial" }}
                cursor="pointer"
              >
                TECHOTON
              </Heading>
            </NextLink>
          </Flex>

          {/* Search bar */}
          <Flex alignItems="center">
            <SearchBar setSearchValue={setSearchValue} />
          </Flex>

          {/* Login and register */}
          <Flex alignItems="center" justifyContent="flex-end" ml={3}>
            {body}
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default NavBar;
