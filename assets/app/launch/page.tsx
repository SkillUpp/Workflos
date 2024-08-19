"use client";
import Image from "next/image";
import Bg from "@/images/bg.png";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card/index";
// import Select from "@/components/CSelect";
import { launchList } from "@/api/product";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import NoFound from "@/components/NoFound";

const Home: React.FC = () => {
  const route = useRouter()
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([])
  const cardsData = [
    {
      title: "Hamming - Make your RAG & AI agents reliable",
      description:
        "The only end-to-end AI development platform you need: prompt management, evals, observability",
      tags: ["AI", "B2B", "Climate"],
      time: "a day ago",
    },
    // 可以添加更多卡片数据
  ];

  const getLaunchData = async () => {
    setLoading(true);
    const res = await launchList({ keyword: '' });
    if (res.data) {
      setLoading(false);
      setList([]);
    }
  };

  const [selectedValue, setSelectedValue] = useState("option1");

  const handleSelectChange = (value: any) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    getLaunchData();
  }, []);

  const options = [{ value: "All Batches", label: "All Batches" }];

  return (
    <div className="mt-[86px] pt-[60px] px-6 lg:px-6 xl:px-[56px] 2xl:px-[200px]  bg-gray-100 min-h-screen p-8">
      <div className="absolute inset-0 z-0 left-[80%] translate-x-[-50%] top-[90px]">
        <Image
          src={Bg}
          alt="Background"
          objectFit="cover"
          quality={100}
          width={500}
          height={500}
          className="rounded-md"
        />
      </div>
      <h1 className="text-3xl font-bold mb-4 text-[#222222]">Launch</h1>
      <p className="text-base leading-10 text-[#555555]">The launchpad for Launch</p>
      <input
        type="text"
        placeholder="Search for a Company"
        className="p-2 border border-gray-300 rounded mb-4 w-full relative z-10 text-[#333333] outline-none focus:outline-none focus:border-customPurple"
      />
      {/* <div className="flex space-x-2 mb-4">
        <span className="text-xs bg-customPurple text-white rounded-full px-2 py-1">
          AI
        </span>
        <span className="text-xs bg-customPurple text-white rounded-full px-2 py-1">
          B2B
        </span>
        <span className="text-xs bg-customPurple text-white rounded-full px-2 py-1">
          Climate
        </span>
      </div> */}
      {/* <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="flex space-x-2">
          <div className="w-[50%] lg:w-[152px]">
            <Select
              options={options}
              onSelect={handleSelectChange}
              value={selectedValue}
              label="选择一个选项"
            />
          </div>
          <div className="w-[50%] lg:w-[152px]">
            <Select
              options={options}
              onSelect={handleSelectChange}
              value={selectedValue}
              label="选择一个选项"
            />
          </div>
        </div>

        <div className="flex items-center mt-4 lg:mt-0">
          <span className="text-xs mr-2 w-14">Sort By:</span>
          <div className="w-[100%] lg:w-[152px]">
            <Select
              options={options}
              onChange={handleSelectChange}
              value={selectedValue}
              label="选择一个选项"
            />
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 gap-4 mt-8">
        {list.length > 0 &&  list.map((card: any, index: number) => (
          <Card
            index={index}
            row={card}
            key={card.name}
          />
        ))}
        {list.length == 0 && <NoFound title="No launch products" message="" />}
      </div>
    </div>
  );
};

export default Home;
