import { productDetail } from "@/api/product";
import ProductCompare from "../ProductCompare";

export const generateStaticParams = async () => {
  const paths = [];
  return paths;
};

/**
 * 获取产品信息
 * @param id
 * @returns
 */
async function getProductData(id: string) {
  // 使用 cookie 发起请求
  const res = await productDetail(id);
  return res;
}

type Params = {
  id: string;
};

type Props = {
  params: Params;
};
const LearnDetail = async ({ params }: Props) => {
  const ids = decodeURIComponent(params.id).split("&");
  const productDataList: any[] = [];
  const productDataPromises = ids.map((id) => getProductData(id));
  const productDataResults = await Promise.all(productDataPromises);
  productDataResults.forEach((result) => {
    productDataList.push(result.data);
  });
  return <ProductCompare list={productDataList} />;
};

export default LearnDetail;
