"use client";
import Image from "next/image";
import { blogList } from "@/api/blog";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import BlogSkeleton from "../BlogSkeleton";

const BlogList = (props: { count: number }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getBlogList = async (url: string) => {
    setList([]);
    setIsLoading(true)
    const res = await blogList(url);
    const data = res.data.data;
    data.forEach((item: { title: string; path: string }) => {
      item.path = item.title.toLowerCase().replace(/ /g, "-");
    });
    setList(data);
    setIsLoading(false)
  };

  useEffect(() => {
    const url = `/items/blog?limit=10&page=1&sort[]=-top&filter={"available":{"_eq":true},"cover":{"_nnull":true}}`;
    getBlogList(url);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="w-full">
        <div className="flex flex-wrap justify-between mt-6 min-h-[300px]">
          {isLoading ? (
            Array.from({ length: props.count }).map((_, index) => (
              <div key={index} className="w-full sm:w-[calc((100%-24px)/2)] xl:w-[calc((100%-48px)/3)] mb-8">
                <BlogSkeleton />
              </div>
            ))
          ) : (
            list &&
            list.slice(0, props.count).map((item: any) => (
              <Link
                href={`/blog/${item.path}`}
                className="block rounded-lg bg-white cursor-pointer w-full sm:w-[calc((100%-24px)/2)] xl:w-[calc((100%-48px)/3)] mb-8 transition-all duration-300 ease-in-out"
                key={item.id}
              >
                <div className="rounded-t-lg overflow-hidden">
                  <Image
                    src={`https://directus.aiapex.asia/assets/${item.cover}`}
                    alt=""
                    width={100}
                    height={100}
                    className="w-full h-[228px] object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-black mb-4 line-clamp-3">{item.title}</h3>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {item.publishedAt
                        ? moment(item.publishedAt).format('MMMM Do YYYY, h:mm:ss a')
                        : moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </span>
                    <span className="text-gray-600 cursor-pointer border-b border-gray-600">Read more</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>

  );
};

export default BlogList;
