import { productDetail } from "@/api/product";
import ProductCompare from "../ProductCompare";

export const generateStaticParams = async () => {
  // const { compareStr } = useStore();
  const paths = [
    { id: "ClickUp&name" },
    { id: "name&ClickUp" },
    { id: "ClickUp&Slack" },
    { id: "Slack&ClickUp" },
  ];
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
  console.log(res, 'res')
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
  console.log(ids, 'ids');
  
  const productDataList: any[] = [];
  const productDataPromises = ids.map((id) => getProductData(id));
  const productDataResults = await Promise.all(productDataPromises);
  console.log(productDataResults, 'productDataResults');
  
  productDataResults.forEach((result) => {
    productDataList.push(result.data);
  });
  console.log(productDataList, 'productDataList');
  
  return <ProductCompare list={productDataList} />;
};

export default LearnDetail;
