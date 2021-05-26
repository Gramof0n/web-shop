import React from "react";
import CategoriesBar from "../components/CategoriesBar";
import NavBar from "../components/NavBar";
import { ProductDisplay } from "../components/ProductDisplay";

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  return (
    <>
      <NavBar />
      <CategoriesBar pathname={`category_products/[name]`} />
      <ProductDisplay />
    </>
  );
};

export default index;
