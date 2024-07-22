import { useRouter } from "next/router";
const ProductDetailPage = require("@/pages/detail/index").default;

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <ProductDetailPage id={id} />;
};
export default ProductPage;
