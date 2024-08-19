"use client";
import Card from "./Card";
import Image from "next/image";
import Bg from "@/images/bg.png";
import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { productList } from "@/api/product";
import NoFound from "@/components/NoFound";

const Home: React.FC = () => {


  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  const [selectedValue, setSelectedValue] = useState("option1");

  const handleSelectChange = (value: any) => {
    setSelectedValue(value);
  };

  const options = [{ value: "All Batches", label: "All Batches" }];

  /**
   * 获取产品列表
   */
  const getProductList = async (page: number) => {
    const params = {
      limit: 10,
      page: page,
    };
    try {
      setLoading(true);
      const res = await productList(params);
      if (res.data) {
        setLoading(false);
        setTotalCount(0);
        setList([]);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductList(1)
  }, [])

  const handleChangePage = (page: number) => {
    getProductList(page);
  };

  return (
    <div className="mt-[86px] pt-[60px] px-6 lg:px-6 xl:px-[56px] 2xl:px-[200px]  bg-gray-100 min-h-screen p-8 overflow-x-hidden">
      <div className="absolute inset-0 z-0 left-[80%] translate-x-[-50%] top-[90px]">
        <Image
          className="hidden md:block"
          src={Bg}
          alt="Background"
          objectFit="cover"
          quality={100}
          width={500}
          height={500}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 relative z-10">
        <div className="grid grid-cols-1 gap-4">
          {list && list.map((card, index) => (
            <Card
              key={index}
              index={index}
              row={card}
            />
          ))}
           {list.length == 0 && <NoFound title="No Trending Products" message="No Trending Products found" />}
        </div>

        {totalCount > 10 && (
          <Pagination
            onChange={handleChangePage}
            className="pagination"
            defaultCurrent={1}
            total={totalCount}
            responsive
          />
        )}
      </div>
    </div>
  );
};

export default Home;
