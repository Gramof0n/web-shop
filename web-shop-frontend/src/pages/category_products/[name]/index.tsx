import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CategoriesBar from "../../../components/CategoriesBar";
import NavBar from "../../../components/NavBar";
import { ProductDisplay } from "../../../components/ProductDisplay";

interface Props {}

const category_products = (props: Props) => {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState<string | string[]>();
  const [searchValue, setSearchValue] = useState<string>();

  useEffect(() => {
    setCategoryName(router.query.name);
    console.log("Use effect");
  }, [router]);

  console.log("KATEGORIJA IZ KATEGORIJE PROIZVODA: " + categoryName);

  return (
    <>
      <NavBar setSearchValue={setSearchValue} />
      <CategoriesBar pathname={router.pathname} />
      {typeof categoryName === "undefined" ? (
        <Box>Loading...</Box>
      ) : (
        <ProductDisplay category={categoryName} searchTerm={searchValue} />
      )}
    </>
  );
};

export default category_products;
