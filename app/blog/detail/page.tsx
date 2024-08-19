"use client";
import { useEffect, useState } from "react";
import { blogDetail, blogList } from "@/api/blog";
import Image from "next/image";
import moment from "moment";
import { marked } from "marked";
import LoadingContext from "@/components/LoadingContext";
import BlogList from "@/components/BlogList";

const BlogDetail = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<any>({});

  const getBlogDetail = async (id: string) => {
    const res = await blogDetail(id);
    setInfo(res.data.data);
    setTimeout(() => {
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
    <div className="pt-20 overflow-hidden">
      {loading && <LoadingContext />}
      <div className="px-6 lg:px-[50px] 2xl:px-[200px]">
        <div className="w-full mx-auto py-12">
          <h1 className="text-black mb-2 text-[42px] line-clamp-3 font-bold">{info?.title}</h1>
          {info?.cover && (
            <Image
              src={`https://directus.aiapex.asia/assets/${info?.cover}`}
              alt=""
              width={1920}
              height={1080}
              className="w-full h-[564px] object-fill rounded-[16px]"
            />
          )}
          <div className="mt-2 flex items-center justify-between w-full h-[50px]">
            <span className="text-[18px] text-black">
              {info?.publishedAt
                ? moment(info?.publishedAt).format("MMMM Do YYYY, h:mm:ss a")
                : moment(info?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-[50px] 2xl:px-[200px]">
        <div className="w-full marked-data">
          {info?.description && (
            <div
              dangerouslySetInnerHTML={{
                __html: marked(info.description),
              }}
            ></div>
          )}
        </div>

        <div className="mt-15">
          <h3 className="text-[42px] mb-0">More Articles</h3>
          <BlogList count={3} />
        </div>
      </div>
    </div>

  );
};

export default BlogDetail;
