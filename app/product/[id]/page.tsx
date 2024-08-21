"use server";
import { productDetail, productList } from "@/api/product";
import ProductDetailComp from "../detail";

export async function generateStaticParams() {
  const res = await productList({
    limit: 10,
    page: 1,
  });
  const list = res.data.list;
  return list.map((path: any) => ({ id: path.name }));
}

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

/**
 * 获取产品信息
 * @param id
 * @returns
 */
async function getProductData(id: string) {
  // 使用 cookie 发起请求
  const res = await productDetail(decodeURIComponent(id));
  return res;
}

export default async function PostPage({ params }: Props) {
  const res = await getProductData(params.id);
  return <ProductDetailComp info={res.data} />;
}
