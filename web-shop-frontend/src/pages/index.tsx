import React from "react";
import NavBar from "../components/NavBar";
import { ProductDisplay } from "../components/ProductDisplay";

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  return (
    <>
      <NavBar />
      <ProductDisplay />
    </>
  );
};

export default index;
