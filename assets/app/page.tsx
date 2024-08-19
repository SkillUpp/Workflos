"use client";
import Image from "next/image";
import Bg from "@/images/bg.png";
import H1Image from "@/images/H1.svg";
import H2Image from "@/images/H2.svg";
import H3Image from "@/images/H3.svg";
import Select from "@/components/Select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const panelList = [
  {
    title: "AI-Powered Deal Intelligence",
    image: H1Image,
    desc: " Our AI engine analyzes data to uncover opportunities in the private market, offer real-time intelligence on emerging companies, funding trends, and market dynamics to make faster,informed investment decisions.",
  },
  {
    title: "Edge in AI Investments",
    image: H2Image,
    desc: "Our predictive analytics and database offer exclusive insights, helping you discover emerging and industry trends, keeping you ahead of other investors.",
  },
  {
    title: "Startup Growth Catalyst",
    image: H3Image,
    desc: "Increase visibility to investors, showcase innovation, and accelerate funding with our ecosystem, with opportunities to turn ideas into deals and partnerships.",
  },
];

const Home = () => {
  const route = useRouter();
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const redirectUrl = localStorage.getItem("redirect_url");
      if (redirectUrl) {
        localStorage.removeItem("redirect_url");
        route.push("/product/" + redirectUrl);
      }
    }
  }, []);

  return (
    <div className="mt-[86px] min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0 left-[60%] translate-x-[-50%] top-[90px]">
        <Image
          src={Bg}
          className="hidden md:block"
          alt="Background"
          objectFit="cover"
          quality={100}
          width={500}
          height={500}
        />
      </div>
      <div className="mx-6 2xl:mx-[200px] xl:mx-[56] mt-12">
        <div className="text-center relative z-10">
          <h1 className="text-4xl font-bold text-customPurple">
            AI Insights to Deals
          </h1>
          <div className="relative mt-6 2xl:w-[724px] m-auto">
            <Select />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 lg:mt-[80px] xl:mt-[120px] 2xl:mt-[120px]">
          {panelList.map((item) => (
            <div
              key={item.title}
              className="bg-white px-[14px] pt-[30px] pb-[20px] rounded-lg shadow-md text-center transition-all cursor-pointer hover:scale-105"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={85}
                  height={85}
                  className="mx-auto"
                />
              )}
              <h2 className="text-xl font-bold text-customPurple mt-4">
                {item.title}
              </h2>
              <p className="text-gray-700 mt-2 text-left">{item.desc}</p>
            </div>
          ))}
        </div>
        <footer className="w-full mt-8 mb-8 text-center leading-4 text-[#454545]">
          ©2024 AI Tracker. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default Home;
