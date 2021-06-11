import { Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CategoriesBar from "../../../components/CategoriesBar";
import DetailedProduct from "../../../components/DetailedProduct";
import NavBar from "../../../components/NavBar";
import { Product_type } from "../../../types";
import { ApiCalls } from "../../../utils/apiCalls";

interface Props {}

const index = (props: Props) => {
  const api = ApiCalls.getInstance();
  const router = useRouter();

  const id = router.query.id;

  const [product, setProduct] = useState<Product_type>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (router.isReady) {
      getProduct();
    }
  }, [router.isReady]);

  async function getProduct() {
    const res = await api.get(`/products/${parseInt(id.toString())}`);
    setProduct(res.data);
    console.log(res.data);
    setIsLoading(false);
  }
  return (
    <>
      <NavBar />
      <CategoriesBar pathname={`../category_products/[name]`} />
      {isLoading ? `Loading...` : <DetailedProduct product={product} />}
    </>
  );
};

export default index;
