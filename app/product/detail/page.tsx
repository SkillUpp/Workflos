"use client";
import Image from "next/image";
import Link from "next/link";
import Ins from "@/assets/images/ins.svg";
import x from "@/assets/images/x.svg";
import message from "@/assets/images/message.svg";
import twitter from "@/assets/images/twitter.svg";
import { useEffect, useRef, useState } from "react";
import { Dropdown, Progress, Rate, Select } from "antd";
import { productDetail } from "@/api/product";
import LoadingContext from "@/components/LoadingContext";
import { marked } from "marked";

const defaultCompareMenu = [
  {
    id: 2,
    name: "Overview",
    htmlId: "overview",
    active: true,
  },
  {
    id: 3,
    name: "News",
    htmlId: "news",
    active: false,
  },
  {
    id: 4,
    name: "Opening",
    htmlId: "pricing",
    active: false,
  },
  {
    id: 5,
    name: "Features",
    htmlId: "features",
    active: false,
  },
  {
    id: 6,
    name: "Reviews",
    htmlId: "reviews",
    active: false,
  },
  {
    id: 7,
    name: "Funding",
    htmlId: "funding",
    active: false,
  },
  {
    id: 8,
    name: "Core Team",
    htmlId: "team",
    active: false,
  },
  {
    id: 9,
    name: "Key Customers",
    htmlId: "revenue",
    active: false,
  },
];

const mediaList = [
  { id: 1, img: Ins },
  { id: 2, img: x },
  { id: 3, img: message },
  { id: 4, img: twitter },
];

interface IProductDetailCompProps {
  info: any;
}

const scrollToTop = () => {
  window.scrollTo({
    top: -1,
    behavior: "smooth",
  });
};

const getDeviceType = () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  return isMobile ? "mobile" : "desktop";
};

const ProductDetailComp = (props: IProductDetailCompProps) => {
  const hasInitialized = useRef(false);
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState<any>({});
  const [features, setFeatures] = useState([]);
  const [supportSlice, setSupportSlice] = useState(10);
  const [featureSlice, setFeatureSlice] = useState(10);

  const [compareMenu, setCompareMenu] = useState(defaultCompareMenu);
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const targetTop = rect.top + window.pageYOffset - 100;
      const scrollToTop = Math.max(targetTop, 0);
      window.scroll({
        top: scrollToTop,
        behavior: "smooth",
      });
      const menus = compareMenu.map((item) => ({
        ...item,
        active: item.htmlId === id,
      }));
      setCompareMenu(menus);
    }
  };
  /**
   * 获取产品详情
   */
  // const getProductDetail = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await productDetail(decodeURIComponent(id));
  //     if (res.data) {
  //       const data = res.data;
  //       data.description = data.description.replace(/\\n/g, "<br/>");
  //       data.description = data.description.replace(/\\r/g, " ");
  //       data.keyBenefits = data.keyBenefits.replace(/\\n/g, "<br/>");
  //       data.keyBenefits = data.keyBenefits.replace(/\\r/g, " ");
  //       data.introduce = data.introduce.replace(/\\u0026/g, "&");
  //       data.keyBenefits = data.keyBenefits.replace(/\\u0026/g, "&");
  //       setLoading(false);
  //       const { commonFeatures, supportFeatures } = res.data;
  //       setProductInfo(data);
  //       setFeatures(
  //         updateCommonFeaturesWithSupport(commonFeatures, supportFeatures)
  //       );
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  /**
   * 数据设置
   * @param commonFeatures
   * @param support
   * @returns
   */
  // const updateCommonFeaturesWithSupport = (commonFeatures, supportFeatures) => {
  //   const supportSlugs = new Set(
  //     supportFeatures.map((feature) => feature.slug)
  //   );
  //   console.log(supportSlugs, "supportSlugs");

  //   return commonFeatures.map((feature) => ({
  //     ...feature,
  //     show: supportSlugs.has(feature.slug),
  //   }));
  // };

  /**
   * 获取产品详情信息
   */
  const initData = () => {
    const result = props.info;
    console.log(result, "result");
    
    result.description = result.description.replace(/\\n/g, "<br/>");
    result.description = result.description.replace(/\\r/g, " ");
    result.keyBenefits = result.keyBenefits.replace(/\\n/g, "<br/>");
    result.keyBenefits = result.keyBenefits.replace(/\\r/g, " ");
    result.introduce = result.introduce.replace(/\\u0026/g, "&");
    result.keyBenefits = result.keyBenefits.replace(/\\u0026/g, "&");
    // const { commonFeatures, supportFeatures } = res.data;
    setProductInfo(result);
  };

  if (!hasInitialized.current) {
    initData();
    hasInitialized.current = true;
  }

  const menu = (
    <div className="p-4 bg-white max-w-[280px] rounded-sm shadow-md box-border">
      {[5, 4, 3, 2, 1].map((rating) => (
        <div key={rating} className="flex items-center mb-2">
          <div className="flex items-center">
            <i
              className="block w-[16px] h-[16px] bg-star bg-no-repeat bg-cover"
              aria-hidden="true"
            ></i>
            <span className="mx-[6px] text-[16px] leading-[1.2] text-[#9747ff]">
              {rating}
            </span>
          </div>
          <div className="w-[150px]">
            <Progress
              percent={
                productInfo?.rateInfo ? productInfo?.rateInfo[rating] : 0
              }
              showInfo={false}
              strokeColor="#9747ff"
            />
          </div>
          <span className="ml-[6px] text-[16px] leading-[1.2] text-[#9747ff] text-right">
            {productInfo?.rateInfo
              ? (productInfo?.rateInfo[rating] / 100).toFixed(1) + "k"
              : "0"}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className=" mt-20 bg-gray-200 overflow-x-hidden">
      {loading && <LoadingContext />}

      <div className="w-full py-[42px] 2xl:pl-[350px] 2xl:pr-[200px] bg-white lg:py-6 lg:px-6">
        <div className="flex items-center h-[46px]">
          <div className="flex items-center">
            {productInfo?.photo && (
              <Image
                src={productInfo?.photo}
                alt=""
                width={40}
                height={40}
                className="w-[40px] h-[40px] object-contain rounded-sm"
              />
            )}
            <span className="text-[18px] leading-[1.2] text-black font-extrabold ml-[10px]">
              {productInfo?.name}
            </span>
          </div>
          <div className="flex pl-[27px]">
            {mediaList.map((item) => (
              <Link href="/" key={item.id} className="ml-[12px] first:ml-0">
                <Image
                  alt=""
                  width={24}
                  height={24}
                  src={item.img}
                  className="ml-[12px] first:ml-0"
                />
              </Link>
            ))}
          </div>
        </div>
        <p className="text-[14px] leading-[1.2] mt-[8px]">
          {productInfo?.introduce}
        </p>
        <Dropdown overlay={menu} trigger={["hover"]}>
          <div className="flex items-center cursor-pointer mt-4">
            <span>{productInfo?.valueForMoney || "0"}</span>
            <div className="mx-[10px]">
              <Rate
                value={productInfo?.valueForMoney}
                disabled
                className="text-[18px] leading-[1.2] font-extrabold"
              />
            </div>
            <span className="text-[14px] leading-[1.5] text-[#9747ff]">
              (
              {productInfo?.totalRateUser
                ? productInfo.totalRateUser / 100 + "k"
                : 0}
              )
            </span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default ProductDetailComp;
