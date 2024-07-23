"use client";

import ProductDetail from "@/app/detail/index";
import { usePathname } from "next/navigation";

export const getStaticPaths = async () => {
  console.log("执行咯吗");

  return { paths: [], fallback: "blocking" };
};

export const getServerSideProps = async ({ params, res, query }) => {
  console.log(params, 'params');
  
  return { props: { params } };
};

const ProductPage = () => {
  const paths = usePathname()?.split("/") as string[];
  const name = paths[paths?.length - 2];
  console.log(name, "name");
  return (
    <div>
      <ProductDetail id={name} />
    </div>
  );
};

export default ProductPage;
