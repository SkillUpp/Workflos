"use client";

import ProductDetail from "@/app/detail/index";
import { usePathname } from "next/navigation";

export const dynamicParams = false;

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
