import BlogList from "@/components/BlogList";
import styls from "./index.module.css";

const Blog = () => {
  return (
    <div className={styls.blog}>
      <h3 className={styls.title}>Blog</h3>
      <BlogList count={100} />
    </div>
  );
};

export default Blog;
