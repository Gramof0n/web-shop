import React, { useState } from "react";
import CategoriesBar from "../components/CategoriesBar";
import NavBar from "../components/NavBar";
import { ProductDisplay } from "../components/ProductDisplay";

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  const [searchValue, setSearchValue] = useState<string>();
  return (
    <>
      <NavBar setSearchValue={setSearchValue} isSearchbarEnabled={true} />
      <CategoriesBar pathname={`category_products/[name]`} />
      <ProductDisplay searchTerm={searchValue} />
    </>
  );
};

export default index;
