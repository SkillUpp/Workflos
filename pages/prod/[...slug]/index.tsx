import { useRouter } from "next/router";

const DynamicNews = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug, "slug");

  return (
    <div>
      <p>News item: {slug}</p>
    </div>
  );
};

export default DynamicNews;
