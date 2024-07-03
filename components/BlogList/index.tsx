"use client";
import Image from "next/image";
import styls from "./index.module.css";
import { blogList } from "@/api/blog";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

const BlogList = (props: { count: number }) => {
  const [list, setList] = useState([]);

  const getBlogList = async (url: string) => {
    setList([]);
    const res = await blogList(url);
    setList(res.data);
  };

  useEffect(() => {
    const url = `/items/blog?limit=10&page=1&sort[]=-top&filter={"available":{"_eq":true},"cover":{"_nnull":true}}`;
    getBlogList(url);
  }, []);

  return (
    <div className={styls.blog_wrap}>
      <div className={styls.container}>
        <div className={styls.blog_list}>
          {list &&
            list.slice(0, props.count).map((item: any) => {
              return (
                <Link
                  href={`/blog/detail?id=${item.id}`}
                  className={styls.blog_item}
                  key={item.id}
                >
                  <div className={styls.image_wrap}>
                    <Image
                      src={`https://directus.aiapex.asia/assets/${item.cover}`}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className={styls.blog_content}>
                    <h3 className={styls.title}>{item.title}</h3>
                    <div className={styls.wrap}>
                      <span className={styls.time}>{`
                      ${
                        item.publishedAt
                          ? moment(item.publishedAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )
                          : moment(item.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )
                      }`}</span>
                      <span className={styls.more}>Read more</span>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
