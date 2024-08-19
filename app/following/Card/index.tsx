import React from "react";
import Link from "next/link";
import Image from "next/image";
import Favorite from "@/images/favorite.svg";
import FavoriteHover from "@/images/favorite-hover.svg";
import XIcon from "@/images/x.svg";
import MessageIcon from "@/images/message.svg";
import InsIcon from "@/images/ins.svg";
import TwitterIcon from "@/images/twitter.svg";
import { useRouter } from "next/navigation";
import { MEDIA_TYPE } from "@/utils/enum";
import { TMediaType } from "@/types/common";

type CardProps = {
  title: string;
  description: string;
  tags: string[];
  time: string;
};



const Card = ({ row, index }: any) => {
  const route = useRouter();

  const handleLinkClick = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
  };
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md flex transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-[#E4D0FF]"
      onClick={() => route.push("/product/" + row.name)}
    >
      <div className="mr-4 hidden md:flex flex-col items-center justify-center w-[34px]">
        <div className="relative w-[34px]">
          <Image
            src={Favorite}
            alt=""
            width={34}
            height={34}
            className="transition duration-300 ease-in-out transform hover:scale-110"
          />
          <Image
            src={FavoriteHover}
            alt=""
            width={34}
            height={34}
            className="absolute top-0 left-0 opacity-0 transition duration-300 ease-in-out transform hover:scale-110 hover:opacity-100"
          />
        </div>
      </div>
      <div className="ml-3">
        <div className="flex md:items-center flex-col md:flex-row items-start">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center">
              <Image src={row.logo} alt="" width={42} height={42} className="rounded-md" />
              <h3 className="font-bold ml-4 text-2xl text-[#333333] truncate-lines-1">{row.name}</h3>
            </div>

            <div className="mr-4 flex md:hidden flex-col items-center justify-center w-[34px]">
              <div className="relative w-[34px]">
                <Image
                  src={Favorite}
                  alt=""
                  width={34}
                  height={34}
                  className="transition duration-300 ease-in-out transform hover:scale-110"
                />
                <Image
                  src={FavoriteHover}
                  alt=""
                  width={34}
                  height={34}
                  className="absolute top-0 left-0 opacity-0 transition duration-300 ease-in-out transform hover:scale-110 hover:opacity-100"
                />
              </div>
            </div>
          </div>
          <ul className="relative z-10 hidden md:flex flex-row items-center justify-center space-x-2 lg:space-x-4 mt-2 md:mt-0 ml-0 md:ml-4">
            {row.socialNetworks && row.socialNetworks.map((item: { type: TMediaType, url: string }) => (
              <li key={item.type} onClick={handleLinkClick}>
                <Link href={item.url}>
                  <Image src={MEDIA_TYPE[item.type]} alt="" width={24} height={24} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {row.overview && row.overview.length > 0 && (
          <p className="text-sm text-gray-600 pt-2 truncate-lines-3">{row.overview[0].report}</p>
        )}

        <ul className="relative z-10 flex md:hidden flex-row items-center justify-start space-x-6 mt-4 md:mt-0 ml-0 md:ml-4">
          {row.socialNetworks && row.socialNetworks.map((item: { type: TMediaType, url: string }) => (
            <li key={item.type} onClick={handleLinkClick}>
              <Link href={item.url}>
                <Image src={MEDIA_TYPE[item.type]} alt="" width={24} height={24} />
              </Link>
            </li>
          ))}
        </ul>

        {/* <div className="flex flex-col lg:flex-row items-start lg:items-center">
          <div className="flex items-center mt-2">
            <Image src={ArrowUp} alt="" width={22} height={22} />
            <span className="text-sm text-gray-500 ml-2 text-ellipsis overflow-hidden whitespace-nowrap">
              Sumanyu Sharma
            </span>
          </div>
          <div className="flex items-center lg:ml-2 mt-2 text-ellipsis overflow-hidden whitespace-nowrap">
            <span className="text-sm text-gray-500">Hamming AI</span>
          </div>
          <div className="text-sm text-gray-500 mt-2 text-ellipsis overflow-hidden whitespace-nowrap">
            {time}
          </div>
          <div className="flex space-x-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-customPurple lg:ml-2 text-white rounded-full px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Card;
