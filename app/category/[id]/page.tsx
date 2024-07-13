import ProductDetail from "@/app/detail/index";
import { useStore } from "@/store/userStore";

export const generateStaticParams = async () => {
	// const { compareStr } = useStore();
  const paths = [{ id: 'name&name' }];
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
