import { blogList } from "@/api/blog";
import ProductDetail from "@/app/detail/index";

export const generateStaticParams = async () => {
  const paths = [{ id: "name" }];
  return paths;
};

interface IBlogDetailParams {
  params: {
    id: string;
  };
}

const LearnDetail = (props: any) => {
  return <ProductDetail id={props.params.id} />;
};

export default LearnDetail;
