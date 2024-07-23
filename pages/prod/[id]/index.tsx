// pages/detail/[id].tsx
import { GetStaticPaths, GetStaticProps } from "next";

const Detail = require("../detail/index").default;

type Params = {
  id: string;
};

type Props = {
  id: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { id: "ClickUp" } },
    { params: { id: "Slack" } },
    { params: { id: "Trello" } },
    { params: { id: "Clio" } },
  ];

  return {
    paths,
    fallback: 'blocking', // 可以设置为 'blocking' 或 'false' 取决于需求
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as Params;

  // 在这里可以添加任何你需要的逻辑，比如从API获取数据
  return {
    props: {
      id,
    },
    revalidate: 10, // 每10秒重新生成静态页面
  };
};

const PostPage = ({ id }: Props) => {
  return <Detail id={id} />;
};

export default PostPage;
