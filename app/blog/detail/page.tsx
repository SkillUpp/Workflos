"use client";
import { useEffect, useState } from "react";
import styls from "./index.module.css";
import { blogDetail, blogList } from "@/api/blog";
import Image from "next/image";
import moment from "moment";
import { marked } from "marked";
import LoadingContext from "@/components/LoadingContext";
import BlogList from "@/components/BlogList";

interface IBlogDetailProps {
  id: string;
}

const BlogDetail = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<any>({});

  const getBlogDetail = async (id: string) => {
    const res = await blogDetail(id);
    setInfo(res.data.data);
    setTimeout(()=> {
      setLoading(false);
    }, 1000)
  };

  const getBlogList = async () => {
    setLoading(true);
    const url = `/items/blog?limit=10&page=1&sort[]=-top&filter={"available":{"_eq":true},"cover":{"_nnull":true}}`;
    const res = await blogList(url);
    const data = res.data.data;
    data.forEach((item: { title: string; path: string }) => {
      item.path = item.title.toLowerCase().replace(/ /g, "-");
    });
    const id = data.find(
      (x: any) => x.path == decodeURIComponent(props.id)
    )?.id;
    if (id) {
      getBlogDetail(id);
    }
  };

  useEffect(() => {
    getBlogList();
  }, []);
  return (
    <div className={styls.blog_detail}>
      {loading && <LoadingContext />}
      <div className={styls.blog_detail_header}>
        <div className={styls.container}>
          <h1>{info?.title}</h1>
          {info?.cover && (
            <Image
              src={`https://directus.aiapex.asia/assets/${info?.cover}`}
              alt=""
              width={1920}
              height={1080}
            />
          )}

          <div className={styls.source}>
            <span className={styls.time}>
              {info?.publishedAt
                ? moment(info?.publishedAt).format("MMMM Do YYYY, h:mm:ss a")
                : moment(info?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </span>
          </div>
        </div>
      </div>

      <div className={styls.blog_detail_content}>
        <div className={styls.container}>
          {info?.description && (
            <div
              dangerouslySetInnerHTML={{
                __html: marked(info.description),
              }}
            ></div>
          )}
        </div>

        <div style={{ marginTop: "60px" }}>
          <h3 className={styls.title} style={{ marginBottom: 0}}>More Articles</h3>
          <BlogList count={3} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
