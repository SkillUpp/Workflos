import { blogList } from "@/api/blog";
import BlogDetail from "../detail/page";

export const generateStaticParams = async () => {
  const url = `/items/blog?limit=10&page=1&sort[]=-top&filter={"available":{"_eq":true},"cover":{"_nnull":true}}`;
  const res = await blogList(url);
  const paths = res.data?.data?.map((item: { title: string; id: string }) => ({
    id: item.title.toLowerCase().replace(/ /g, "-"),
  }));
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
