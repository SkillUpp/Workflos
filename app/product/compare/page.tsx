import ProductCompare from "@/app/category/compare/page";

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

interface IBlogDetailParams {
  params: {
    id: string;
  };
}

const LearnDetail = (props: any) => {
  return <ProductCompare id={props.params.id} />;
};

export default LearnDetail;
