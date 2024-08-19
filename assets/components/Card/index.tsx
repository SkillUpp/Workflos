import React from "react";
import Image from "next/image";
import ArrowUp from "@/images/arrow-up-circle.svg";
import { useRouter } from "next/navigation";

type CardProps = {
  name: string;
  content: string;
  category: string[];
  time: string;
  createAt: string
};

const Card = (props: any) => {
  const route = useRouter()
  const { row, index } = props;
  console.log(row, 'row');

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105" onClick={() => route.push(`/launch/${row.name}`)}>
      <div className="mr-4 flex-col md:items-center md:justify-center w-[34px] hidden md:flex">
        <Image src={ArrowUp} alt="" width={34} height={34} className="rounded-md"/>
        <span className="text-xl font-bold text-[#444444]">{index + 1}</span>
      </div>
      <div className="flex md:items-center md:justify-center h-[74px] w-[74px]">
        <Image src={row?.photo} alt="" width={74} height={74} className="rounded-md h-[74px] w-[74px]"/>
      </div>
      <div className="ml-3 w-[73%] md:w-auto">
        <h3 className="text-lg font-semibold text-[#333333]">{row.name}</h3>
        <p className="text-sm text-gray-600 truncate-lines-2">{row.title}</p>
        <div className="flex flex-col lg:flex-row items-start lg:items-center flex-wrap">
          {/* <div className="flex items-center mt-2">
            <Image src={ArrowUp} alt="" width={22} height={22} />
            <span className="text-sm text-gray-500 ml-2 text-ellipsis overflow-hidden whitespace-nowrap">
              {row.content}
            </span>
          </div> */}
          <div className="w-[90%] flex items-center mt-2">
            <span className="block text-sm text-gray-500 truncate-lines-3">{row.content || row.title}</span>
          </div>
          {/* <div className="text-sm text-gray-500 mt-2 text-ellipsis overflow-hidden whitespace-nowrap">
            {row.createAt}
          </div> */}
          <div className="flex space-x-2 mt-2">
            {row.category && row.category?.map((tag: string) => (
              <span
                key={tag}
                className="text-xs bg-customPurple lg:ml-2 text-white rounded-full px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
