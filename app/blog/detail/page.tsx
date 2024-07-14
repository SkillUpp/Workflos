"use client";
import { useEffect, useState } from "react";
import styls from "./index.module.css";
import { blogDetail } from "@/api/blog";
import Image from "next/image";
import moment from "moment";
import { marked } from "marked";

interface IBlogDetailProps {
  id: string;
}

const BlogDetail = (props: any) => {
  const [info, setInfo] = useState<any>({});

  const getBlogDetail = async (id: string) => {
    const res = await blogDetail(id);
    setInfo(res.data.data);
  };

  useEffect(() => {
    getBlogDetail(props.id);
  }, []);
  return (
    <div className={styls.blog_detail}>
      <div className={styls.blog_detail_header}>
        <div className={styls.container}>
          <h1>{info?.title}</h1>
          <Image
            src={`https://directus.aiapex.asia/assets/${info?.cover}`}
            alt=""
            width={1920}
            height={1080}
          />
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
      </div>
    </div>
  );
};

export default BlogDetail;
