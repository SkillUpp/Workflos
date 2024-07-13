import { blogList } from "@/api/blog";
import BlogDetail from "../detail/page";

export const generateStaticParams = async () => {
  // const url = `/items/blog?limit=10&page=1&sort[]=-top&filter={"available":{"_eq":true},"cover":{"_nnull":true}}`;
  // const res = await blogList(url);
  // const paths = res.data.map((item: { id: any }) => ({
  //   id: item.id.toString(),
  // }));
  const paths = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }, { id: "8" }, { id: "9" }, { id: "10" }]
  return paths;
};

interface IBlogDetailParams {
  params: {
    id: string;
  };
}

const LearnDetail = (props: any) => {
  return <BlogDetail id={props.params.id} />;
};

export default LearnDetail;
