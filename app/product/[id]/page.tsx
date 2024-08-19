import { productDetail, productList } from "@/api/product";
import ProductDetailComp from "../detail/page";


export async function generateStaticParams() {
	const res = await productList({
		limit: 50,
		page: 1,
	})
	const list = res.data.list;
	return list.map((path: any) => ({ id: path.name }));
}

type Params = {
	id: string;
};

type Props = {
	params: Params;
};

/**
 * 获取产品信息
 * @param id 
 * @returns 
 */
async function getProductData(id: string) {
	const res = await productDetail(id);
	return res
}


export default async function PostPage({ params }: Props) {
	const res = await getProductData(params.id)
	return <ProductDetailComp info={res} />;
}
