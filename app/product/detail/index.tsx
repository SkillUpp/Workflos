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
import ScrollableTabs from "@/components/ScrollableTabs";
import { sanitizeDescription } from "@/utils/utils";

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
    name: "Pricing",
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
  // {
  //   id: 9,
  //   name: "Key Customers",
  //   htmlId: "revenue",
  //   active: false,
  // },
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

const getDeviceType = () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  return isMobile ? "mobile" : "desktop";
};

const scrollToTop = () => {
  window.scrollTo({
    top: -1,
    behavior: "smooth",
  });
};

const ProductDetailComp = (props: IProductDetailCompProps) => {
  const hasInitialized = useRef(false);
  const [features, setFeatures] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [supportSlice, setSupportSlice] = useState(10);
  const [featureSlice, setFeatureSlice] = useState(10);
  const [productInfo, setProductInfo] = useState<any>({});
  const [compareMenu, setCompareMenu] = useState(defaultCompareMenu);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const defaultHeight = getDeviceType() === "mobile" ? 400 : 320;
      const targetHeight = getDeviceType() === "mobile" ? 200 : 166;
      const targetOffset =
        window.pageYOffset == 0 ? defaultHeight : targetHeight;
      const targetTop = rect.top + window.pageYOffset - targetOffset;
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
   * 数据设置
   * @param commonFeatures
   * @param support
   * @returns
   */
  const updateCommonFeaturesWithSupport = (
    commonFeatures: any,
    supportFeatures: any
  ) => {
    const supportSlugs = new Set(
      supportFeatures.map((feature: any) => feature.slug)
    );
    return commonFeatures.map((feature: any) => ({
      ...feature,
      show: supportSlugs.has(feature.slug),
    }));
  };

  /**
   * 获取产品详情信息
   */
  const initData = () => {
    const result = props.info;
    console.log(result, 'res');

    if (!result?.name) {
      return;
    }

    if (result?.description) {
      result.description = result?.description.replace(/\\n/g, "<br/>");
      result.description = result?.description.replace(/\\r/g, " ");
    }
    if (result?.introduce) {
      result.introduce = result?.introduce.replace(/\\u0026/g, "&");
    }
    if (result?.keyBenefits) {
      result.keyBenefits = result?.keyBenefits.replace(/\\n/g, "<br/>");
      result.keyBenefits = result?.keyBenefits.replace(/\\r/g, " ");
      result.keyBenefits = result?.keyBenefits.replace(/\\u0026/g, "&");
      result.keyBenefits = result?.keyBenefits.replace(/\\u003c/g, "<").replace(/\\u003e/g, ">")
    }
    const { commonFeatures, supportFeatures } = result;
    if (commonFeatures && supportFeatures) {
      setFeatures(
        updateCommonFeaturesWithSupport(commonFeatures, supportFeatures)
      );
    }
    setProductInfo(result);
  };

  if (!hasInitialized.current) {
    initData();
    hasInitialized.current = true;
  }

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    scrollToTop();
  }, []);

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
    <div className="mt-20 bg-gray-200 overflow-x-hidden">
      <div
        id="productHeader"
        className={`w-full px-6 2xl:pl-[350px] 2xl:pr-[200px] bg-white lg:py-6 lg:px-6 transition-all duration-300 shadow-lg ${isScrolled
          ? "h-[60px] fixed top-[86px] left-0 right-0 z-10 pt-[10px] pb-[10px] md:pt-[10px] md:pb-[10px] justify-center"
          : "md:h-auto py-[24px] md:py-[42px]"
          }`}
      >
        <div
          className={`flex items-center ${isScrolled ? "h-full" : "h-[46px]"}`}
        >
          <div className="flex items-center">
            {productInfo?.photo && (
              <Image
                src={productInfo?.photo}
                alt=""
                width={40}
                height={40}
                className="w-[40px] h-[40px] object-contain rounded-sm"
                onError={(e) => {
                  e.currentTarget.src = "https://aitracker.ai/empty.jpeg";
                }}
              />
            )}
            <span className="text-[18px] leading-[1.2] text-black font-extrabold ml-[10px] truncate-lines-1">
              {productInfo?.name}
            </span>
          </div>
          {/* <div className="flex pl-[27px]">
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
          </div> */}
        </div>
        {!isScrolled && (
          <>
            <p className="text-[14px] leading-[1.2] mt-[8px] text-[#333]">
              {productInfo?.introduce}
            </p>
            <Dropdown overlay={menu} trigger={["hover"]}>
              <div className="flex items-center cursor-pointer mt-4">
                <span className="text-[#222] font-medium">{productInfo?.valueForMoney || "0"}</span>
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
          </>
        )}
      </div>
      <div
        className={`md:hidden w-full bg-white ${isScrolled ? "fixed top-[146px] left-0 right-0 z-10" : ""
          }`}
      >
        <ScrollableTabs
          tabs={compareMenu}
          onTabClick={(tab: { htmlId: string }) => handleClick(tab.htmlId)}
        />
      </div>

      <div
        className={`reative flex flex-col md:flex-row px-6 xl:px-[56px] 2xl:pl-56 2xl:pr-[200px] pt-6 z-10`}
      >
        <div className={`flex-shrink-0 w-full mr-6 md:w-32`}>
          <div
            className={`hidden md:block fixed z-10 ${isScrolled ? "top-[144px] md:top-[160px]" : ""
              }`}
          >
            <div className="relative flex flex-row md:flex-col items-end text-right">
              <div className="absolute h-full w-px bg-purple-600 right-0"></div>
              {compareMenu.map((item) => (
                <div
                  key={item.id}
                  className={`animation-all-3 cursor-pointer flex items-center justify-end h-8 pr-4 text-[#333333] ${item.active
                    ? "font-bold bg-customPurple w-[130px] whitespace-nowrap text-white rounded-l-xl"
                    : ""
                    }`}
                  onClick={() => handleClick(item.htmlId)}
                >
                  <span className="text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`flex-grow overflow-y-auto md:ml-[100px]`}>
          <div
            id="overview"
            className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-2 text-[#222]">Overview</h3>
            {productInfo?.description && (

              <p
                className="text-[16px] leading-[1.5] text-[#333333]"
                dangerouslySetInnerHTML={{
                  __html: marked(productInfo?.description),
                }}
              ></p>
            )}

            <div className="mt-6 flex flex-col md:flex-row md:justify-between">
              <div className="flex flex-col w-full md:w-1/2">
                <h4 className="text-[18px] leading-[1.2] text-[#222] font-bold">
                  Typical customers
                </h4>
                <ul className="mt-4 pr-6">
                  {productInfo?.typicalCustomers &&
                    productInfo.typicalCustomers.map((item: any) => (
                      <li
                        className="flex items-center justify-between pt-1"
                        key={item.slug}
                      >
                        <span className="text-[#222222]">{item.name}</span>
                        <i className="w-[20px] h-[20px] ml-[8px] bg-check bg-contain bg-no-repeat bg-center"></i>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <h4 className="text-[18px] leading-[1.2] text-[#222] font-bold mt-4 md:mt-0">
                  Platforms supported
                </h4>
                <ul className="mt-4 pr-6">
                  {productInfo?.platformsSupported &&
                    productInfo.platformsSupported.map((item: any) => (
                      <li
                        className="flex items-center justify-between pt-1"
                        key={item.slug}
                      >
                        <span className="text-[#222222]">{item.name}</span>
                        <i className="w-[20px] h-[20px] ml-[8px] bg-check bg-contain bg-no-repeat bg-center"></i>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {productInfo?.keyBenefits && (
              <div className="mt-6 justify-between">
                <h4 className="text-[18px] leading-[1.2] text-[#222] font-bold mt-4">
                  Key benefits of using {productInfo?.name}
                </h4>
                <p
                  className="text-[16px] leading-[1.5] text-[#333333] mt-4"
                  dangerouslySetInnerHTML={{
                    __html: marked(productInfo?.keyBenefits),
                  }}
                ></p>
              </div>
            )}

          </div>

          <div
            id="news"
            className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-2 text-[#222]">News</h3>
            <p className="text-[16px] leading-[1.5] text-[#333333]">
              Comming Soon
            </p>
          </div>

          <div
            id="pricing"
            className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-2 text-[#222]">Pricing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <h4 className="text-[18px] leading-[1.2] text-[#222] font-bold mt-4">
                  Value for money rating
                </h4>
                <div className="flex justify-start items-center mt-4">
                  <i className="bg-star bg-contain bg-no-repeat bg-center w-[28px] h-[28px]"></i>
                  <div className="flex items-baseline ml-4">
                    <span className="text-[28px] leading-[1.2] text-[#222] font-medium">
                      {productInfo?.valueForMoney}
                    </span>
                    <span className="text-[16px] leading-[1.2] text-[#222] font-normal">
                      {" "}
                      / {productInfo?.rateAvg}
                    </span>
                  </div>
                </div>
                <div className="flex justify-start items-center mt-4">
                  <i className="bg-users bg-contain bg-no-repeat bg-center w-[28px] h-[28px]"></i>
                  <span className="text-[22px] leading-[1.2] text-[#222222] ml-4 font-medium">
                    {productInfo?.totalRateUser}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <h4 className="text-[18px] leading-[1.2] text-[#222] font-bold mt-4">
                  Price starts from
                </h4>
                <div className="flex justify-start items-center mt-4">
                  <span className="text-[24px] leading-[1.2] text-[#9747ff] font-medium">
                    {productInfo?.pricing?.currency_symbol}
                  </span>
                  <span className="text-[28px] leading-[1.2] text-[#222222] ml-2 font-medium">
                    {productInfo?.pricing?.amount}
                  </span>
                </div>
                <div className="flex justify-start items-center mt-4">
                  <i className="bg-calendar bg-contain bg-no-repeat bg-center w-[20px] h-[20px]"></i>
                  <span className="text-[18px] leading-[1.2] text-[#222222] ml-2">
                    Pre {productInfo?.pricing?.periodicity}
                  </span>
                </div>
                <div className="flex justify-start items-center mt-4">
                  <i className="bg-signal bg-contain bg-no-repeat bg-center w-[20px] h-[20px]"></i>
                  <span className="text-[18px] leading-[1.2] text-[#222222] ml-2">
                    {productInfo?.pricing?.pricing_model}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-[18px] leading-[1.2] text-[#222] font-bold mt-4">
                  Pricing options
                </h4>
                <ul>
                  {productInfo?.pricing?.categories &&
                    productInfo?.pricing?.categories.map((item: any) => (
                      <li
                        className="flex items-center justify-between pt-1"
                        key={item}
                      >
                        <span className="text-[#222222]">{item}</span>
                        <i className="w-[20px] h-[20px] ml-[8px] bg-check bg-contain bg-no-repeat bg-center"></i>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            id="features"
            className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-2 text-[#222]">Features</h3>
            <div className="mt-4">
              <div className="flex w-full justify-between items-center">
                <span className="text-[18px] leading-[1.2] text-[#111] font-bold">
                  {productInfo?.name} features
                </span>
                <span className="text-[18px] leading-[1.2] text-[#111] font-bold">
                  {productInfo?.supportFeatures?.length + 1}
                </span>
              </div>
              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                {productInfo?.supportFeatures &&
                  productInfo.supportFeatures
                    .slice(0, supportSlice)
                    .map((item: any) => (
                      <li
                        className="flex items-center justify-between"
                        key={item.slug}
                      >
                        <span className="block text-[16px] leading-[1.2] text-[#222222] font-medium truncate-lines-1">
                          {item.name.replace(/\\u0026/g, "&")}
                        </span>
                        <i className="w-[20px] h-[20px] ml-[8px] bg-check bg-contain bg-no-repeat bg-center"></i>
                      </li>
                    ))}
              </ul>
              {productInfo?.supportFeatures?.length > 10 && (
                <button
                  className="flex justify-center text-[#222222] items-center mt-8 w-[200px] mx-auto border border-[#9747ff] h-8 rounded-8 hover:bg-[#9747ff] hover:text-white"
                  onClick={() => {
                    setSupportSlice(
                      supportSlice == 10
                        ? productInfo?.supportFeatures.length
                        : 10
                    );
                  }}
                >
                  {supportSlice === 10 ? "Expand list" : "Collapse list"}
                </button>
              )}
            </div>

            <div className="mt-8">
              <div className="flex w-full justify-between items-center">
                <span className="text-[18px] leading-[1.2] text-[#111] font-bold">
                  Common features
                </span>
                <span className="text-[18px] leading-[1.2] text-[#111] font-bold">
                  {features?.length + 1}
                </span>
              </div>
              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                {features &&
                  features.slice(0, featureSlice).map((item: any) => (
                    <li
                      className="flex items-center justify-between"
                      key={item.slug}
                    >
                      <span className="block text-[16px] leading-[1.2] text-[#222222] font-medium truncate-lines-1">
                        {item.name.replace(/\\u0026/g, "&")}
                      </span>
                      <i className="w-[20px] h-[20px] ml-[8px] bg-check bg-contain bg-no-repeat bg-center"></i>
                    </li>
                  ))}
              </ul>
              {features?.length > 10 && (
                <button
                  className="flex justify-center items-center text-[#222222] mt-8 w-[200px] mx-auto border border-[#9747ff] h-8 rounded-8 hover:bg-[#9747ff] hover:text-white"
                  onClick={() =>
                    setFeatureSlice(featureSlice == 10 ? features.length : 10)
                  }
                >
                  {supportSlice === 10 ? "Expand list" : "Collapse list"}
                </button>
              )}
            </div>
          </div>

          <div
            id="reviews"
            className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-2 text-[#222]">Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <h4 className="text-[18px] leading-[1.2] text-[#222] font-bold mt-4">
                  Overall rating
                </h4>
                <div className="flex justify-start items-center mt-4">
                  <i className="bg-star bg-contain bg-no-repeat bg-center w-[28px] h-[28px]"></i>
                  <div className="flex items-baseline ml-4">
                    <span className="text-[28px] leading-[1.2] text-[#222] font-medium">
                      {productInfo?.valueForMoney}
                    </span>
                    <span className="text-[16px] leading-[1.2] text-[#222] font-normal">
                      {" "}
                      / {productInfo?.rateAvg}
                    </span>
                  </div>
                </div>
                <div className="flex justify-start items-center mt-4">
                  <i className="bg-users bg-contain bg-no-repeat bg-center w-[28px] h-[28px]"></i>
                  <span className="text-[22px] leading-[1.2] text-[#222222] ml-4 font-medium">
                    {productInfo?.totalRateUser}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <h4 className="text-[18px] leading-[1.2] text-[#222] font-bold mt-4">
                  Rating criteria
                </h4>
                <ul className="">
                  <li className="flex items-center justify-between mt-2">
                    <span>Value for money</span>
                    <div className="flex items-center">
                      <Rate
                        count={1}
                        value={
                          productInfo?.valueForMoney
                            ? Number(productInfo?.valueForMoney)
                            : 0
                        }
                        disabled
                      />
                      <span className="text-[16px] leading-[1.2] text-[#222] font-normal ml-2">
                        ({productInfo?.valueForMoney})
                      </span>
                    </div>
                  </li>

                  <li className="flex items-center justify-between mt-2">
                    <span>Ease of use</span>
                    <div className="flex items-center">
                      <Rate
                        count={1}
                        value={
                          productInfo?.easeOfUse
                            ? productInfo?.easeOfUse.toFixed(0)
                            : 0
                        }
                        disabled
                      />
                      <span className="text-[16px] leading-[1.2] text-[#222] font-normal ml-2">
                        ({productInfo?.easeOfUse})
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between mt-2">
                    <span className="text-[#222222] text-lg font-medium">
                      Features
                    </span>
                    <div className="flex items-center">
                      <Rate
                        count={1}
                        value={
                          productInfo?.features
                            ? productInfo?.features.toFixed(0)
                            : 0
                        }
                        disabled
                      />
                      <span className="text-[16px] leading-[1.2] text-[#222] font-normal ml-2">
                        ({productInfo?.features})
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between mt-2">
                    <span className="text-[#222222] text-lg font-medium">
                      Customer support
                    </span>
                    <div className="flex items-center">
                      <Rate
                        count={1}
                        value={
                          productInfo?.customerSupport
                            ? productInfo?.customerSupport.toFixed(0)
                            : 0
                        }
                        disabled
                      />
                      <span className="text-[16px] leading-[1.2] text-[#222] font-normal ml-2">
                        ({productInfo?.customerSupport})
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            id="funding"
            className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-2 text-[#222]">Funding</h3>
            <p className="text-[16px] leading-[1.5] text-[#333333]">
              Comming Soon
            </p>
          </div>

          <div
            id="team"
            className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-2 text-[#222]">Core Team</h3>
            <p className="text-[16px] leading-[1.5] text-[#333333]">
              Comming Soon
            </p>
          </div>

          {/* <div
            id="revenue"
            className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-2 text-[#222]">
              Key Customers
            </h3>
            <p className="text-[16px] leading-[1.5] text-[#333333]">
              Comming Soon
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComp;
