import ProductDetail from "@/app/detail/index";

export async function generateStaticParams() {
  const paths = [
    { id: "ClickUp" },
    { id: "Slack" },
    { id: "Trello" },
    { id: "Clio" },
  ];
  return paths;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  return <ProductDetail id={params.id} />;
}
