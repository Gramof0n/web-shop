import { Flex, Box, Link, Button, Image, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { getUser } from "../utils/getUser";
import axios from "axios";

import img from "../img/placeholder.png";
import SearchBar from "./SearchBar";

interface NavBarProps {}

interface IUser {
  id?: number;
  username?: string;
  isadmin?: boolean;

  setUser: React.Dispatch<React.SetStateAction<IUser>> &
    React.Dispatch<React.SetStateAction<{}>>;
}

const NavBar: React.FC<NavBarProps> = ({}) => {
  let body = null;
  const [user, setUser] = useState<IUser>({} as IUser);
  useEffect(() => {
    async function user() {
      setUser(await getUser());
    }

    user();
  }, []);

  console.log(user.id);

  async function logout() {
    await axios.get("http://localhost:4000/api/v1/users/logout");
    setUser({} as IUser);
  }

  if (Object.keys(user).length === 0) {
    //noone logged in
    body = (
      <Box ml="auto">
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
        <Box mr={4} color="white">
          Welcome {user.username}
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
  } else {
    //admin logged in
    body = (
      <>
        <Box mr={4} color="white">
          Welcome admin {user.username}
        </Box>
        <Box>
          <NextLink href="/admin-panel">
            <Link mr={4} color="white">
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
    <Flex background="blackAlpha.800" p={5} w="100%">
      {/* Image and title */}
      <Flex alignItems="center">
        <Image src={img} maxW="60px" />
        <Heading variant="h4" ml={4} color="white">
          TECHOTON
        </Heading>
      </Flex>

      {/* Search bar */}
      <Flex alignItems="center" w="100%" justifyContent="center">
        <SearchBar />
      </Flex>

      {/* Login and register */}
      <Flex ml="auto" alignItems="center">
        {body}
      </Flex>
    </Flex>
  );
};

export default NavBar;
