import BlogList from "@/components/BlogList";

const Blog = () => {
  return (
    <div className="mt-[143px] px-6 lg:px-[50px] 2xl:px-[200px]">
      <h3 className="font-bold text-3xl">Blog</h3>
      <BlogList count={100} />
    </div>
  );
};

export default Blog;
