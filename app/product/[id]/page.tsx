import ProductDetail from "@/app/detail/index";

interface IPathItem {
  id: string;
}

export function generateStaticParams() {
  const paths: IPathItem[] = [{ id: "Clio" }];

  return paths;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  return <ProductDetail id={params.id} />;
}
