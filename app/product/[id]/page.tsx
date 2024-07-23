import ProductDetail from "@/app/detail/index";

export async function generateStaticParams() {
  const paths = [
    { id: "ClickUp" },
    { id: "Slack" },
    { id: "Trello" },
    { id: "Clio" },
  ];

  return paths.map((path) => ({ id: path.id }));
}

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export default function PostPage({ params }: Props) {
  const validIds = ["ClickUp", "Slack", "Trello", "Clio"];
  console.log(validIds, "validIds");
  console.log(params.id, "params.id");

  if (!validIds.includes(params.id)) {
    return <ProductDetail id={params.id} />;
  }

  // 在服务器端打印参数
  console.log(params, "Server-side PARAMS");

  return <ProductDetail id={params.id} />;
}
