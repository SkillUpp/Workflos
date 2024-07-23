import ProductDetail from "@/app/detail/index";

interface IPathItem {
  params: {
    id: string;
  };
}

export function generateStaticParams(id: any) {
  const paths: IPathItem[] = [];
  paths.push({ params: { id } });

  console.log(paths, 'paths');
  
  return paths;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  generateStaticParams(params.id);

  return <ProductDetail id={params.id} />;
}
