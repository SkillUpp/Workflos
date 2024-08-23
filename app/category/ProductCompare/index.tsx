"use client";
import { Rate } from "antd";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface Props {
  list?: any;
}

const getDeviceType = () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  return isMobile ? "mobile" : "desktop";
};

const ProductCompare = (props: Props) => {
  const { list } = props;
  const [deviceType, setDeviceType] = useState("");
  const [compareList, setCompareList] = useState<any>();
  const hasInitialized = useRef(false);

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
   * 数据转换
   * @param lists
   * @returns
   */
  const normalizePlatforms = (lists: any) => {
    const largestList = lists.reduce((maxList: any, currentList: any) =>
      currentList.platformsSupported.length > maxList.platformsSupported.length
        ? currentList
        : maxList
    );
    const referencePlatforms = largestList.platformsSupported.map(
      (platform: any) => ({
        name: platform.name,
        slug: platform.slug,
        check: true,
      })
    );

    return lists.map((list: any) => {
      const updatedPlatforms = referencePlatforms.map((refPlatform: any) => {
        const existingPlatform = list.platformsSupported.find(
          (platform: any) => platform.slug === refPlatform.slug
        );
        if (existingPlatform) {
          return { ...refPlatform, check: true };
        } else {
          return { ...refPlatform, check: false };
        }
      });
      return {
        ...list,
        platformsSupported: updatedPlatforms,
      };
    });
  };

  /**
   * 数据转换
   * @param lists
   * @returns
   */
  const normalizeTypical = (lists: any) => {
    const largestList = lists.reduce((maxList: any, currentList: any) =>
      currentList.typicalCustomers.length > maxList.typicalCustomers.length
        ? currentList
        : maxList
    );
    const referencePlatforms = largestList.typicalCustomers.map(
      (platform: any) => ({
        name: platform.name,
        slug: platform.slug,
        check: true,
      })
    );

    return lists.map((list: any) => {
      const updatedPlatforms = referencePlatforms.map((refPlatform: any) => {
        const existingPlatform = list.typicalCustomers.find(
          (platform: any) => platform.slug === refPlatform.slug
        );
        if (existingPlatform) {
          return { ...refPlatform, check: true };
        } else {
          return { ...refPlatform, check: false };
        }
      });
      return {
        ...list,
        typicalCustomers: updatedPlatforms,
      };
    });
  };

  /**
   *
   * @param lists
   * @returns
   */
  const normalizeSupportOptions = (lists: any) => {
    const largestList = lists.reduce(
      (
        maxList: { supportOptions: string | any[] },
        currentList: { supportOptions: string | any[] }
      ) =>
        currentList.supportOptions.length > maxList.supportOptions.length
          ? currentList
          : maxList
    );
    const referenceSupportOptions = largestList.supportOptions.map(
      (option: any) => ({
        name: option,
        check: true,
      })
    );
    return lists.map((list: { supportOptions: any[] }) => {
      const updatedSupportOptions = referenceSupportOptions.map(
        (refOption: { name: any }) => {
          const existingOption = list.supportOptions.find(
            (option) => option === refOption.name
          );
          if (existingOption) {
            return { ...refOption, check: true };
          } else {
            return { ...refOption, check: false };
          }
        }
      );
      return {
        ...list,
        supportOptions: updatedSupportOptions,
      };
    });
  };

  /**
   * 初始化数据
   */
  const initData = () => {
    const newList = normalizePlatforms(list);
    const newList1 = normalizeTypical(newList);
    const newList2 = normalizeSupportOptions(newList1);
    newList2.forEach((item: any) => {
      item.commonFeatureSlice = 10;
      item.supportFeatureSlice = 10;
      if (item.description) {
        item.description = item.description
          ? item.description.replace(/\\n/g, "<br/>")
          : "";
        item.description = item.description
          ? item.description.replace(/\\r/g, "<br/>")
          : "";
        item.description = item?.description.replace(/\\u003c/g, "<").replace(/\\u003e/g, ">")
      }
      if (item.commonFeatures && item.supportFeatures) {
        item.commonFeatures = updateCommonFeaturesWithSupport(
          item.commonFeatures,
          item.supportFeatures
        );
      }

    });
    setCompareList(newList2);
  };

  if (!hasInitialized.current) {
    initData();
    hasInitialized.current = true;
  }

  useEffect(() => {
    if (typeof window != undefined) {
      setDeviceType(getDeviceType());
    }
  }, []);

  return (
    <div className="mt-[86px] bg-gray-200 overflow-x-hidden">
      {compareList && compareList.length > 0 && (
        <>
          <div className="mx-auto px-6 lg:px-[50px] 2xl:px-[200px]">
            <h3 className="text-[42px] font-bold pt-8 text-black">Compare</h3>
            <div
              className="grid gap-4 py-4"
              style={{
                gridTemplateColumns: `${deviceType == "mobile"
                  ? "repeat(1, minmax(0, 1fr))"
                  : `repeat(${compareList.length}, minmax(0, 1fr))`
                  }`,
              }}
            >
              {compareList.map((item: any, index: number) => (
                <div className="p-4 w-full bg-white rounded-8" key={index}>
                  <div className="flex items-center justify-center h-10">
                    {item?.photo && (
                      <div className="w-[40px] h-[40px] rounded-md overflow-hidden">
                        <Image
                          src={item?.photo}
                          alt=""
                          width={40}
                          height={40}
                          className="w-[40px] h-[40px] object-contain rounded-sm"
                          onError={(e) => {
                            e.currentTarget.src = "https://aitracker.ai/empty.jpeg";
                          }}
                        />
                      </div>
                    )}
                    {!item?.photo && (
                      <div className="w-[40px] h-[40px] rounded-md overflow-hidden">
                        <Image
                          src="https://aitracker.ai/empty.jpeg"
                          alt=""
                          width={40}
                          height={40}
                          className="rounded-md object-contain w-full h-full"
                        />
                      </div>
                    )}
                    <span className="text-xl font-bold ml-4 text-[#222]">
                      {item.name}
                    </span>
                  </div>
                  <p
                    className="text-gray-500 text-center mt-4 truncate-lines-2"
                    dangerouslySetInnerHTML={{
                      __html: item?.description,
                    }}
                  ></p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <div className="mx-auto px-6 lg:px-[50px] 2xl:px-[200px]">
              <h3 className="text-[32px] font-bold pt-4 text-black">
                App Info
              </h3>
              <div
                className="grid gap-4 mt-4"
                style={{
                  gridTemplateColumns: `${deviceType == "mobile"
                    ? "repeat(1, minmax(0, 1fr))"
                    : `repeat(${compareList.length}, minmax(0, 1fr))`
                    }`,
                }}
              >
                {compareList.map((item: any, index: number) => (
                  <div
                    className="p-4 w-full bg-white rounded-8 flex items-stretch flex-col"
                    key={index}
                  >
                    <p
                      className="text-gray-500 truncate-lines-3"
                      dangerouslySetInnerHTML={{
                        __html: item?.description,
                      }}
                    ></p>

                    <div className="w-full mt-4">
                      <h4 className="text-[18px] whitespace-nowrap leading-[1.2] text-[#222] font-bold mt-4 md:mt-0">
                        Platforms supported
                      </h4>
                      <ul className="mt-2">
                        {item.platformsSupported &&
                          item.platformsSupported.map((item: any) => (
                            <li
                              className="flex items-center justify-between pt-1"
                              key={item.slug}
                            >
                              <span
                                className={`text-black ${!item.check ? "text-gray-500" : ""
                                  }`}
                              >
                                {item.name}
                              </span>
                              {item.check && (
                                <i className="w-[20px] h-[20px] ml-[8px] bg-check bg-contain bg-no-repeat bg-center"></i>
                              )}
                              {!item.check && (
                                <i className="w-[20px] h-[20px] ml-[8px] bg-close1 bg-contain bg-no-repeat bg-center"></i>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="w-full mt-4">
                      <h4 className="text-[18px] whitespace-nowrap leading-[1.2] text-[#222] font-bold mt-4 md:mt-0">
                        Typical customers
                      </h4>
                      <ul className="mt-2">
                        {item.typicalCustomers &&
                          item.typicalCustomers.map((item: any) => (
                            <li
                              className="flex items-center justify-between pt-1"
                              key={item.slug}
                            >
                              <span
                                className={`text-black ${!item.check ? "text-gray-500" : ""
                                  }`}
                              >
                                {item.name}
                              </span>
                              {item.check && (
                                <i className="w-[20px] h-[20px] ml-[8px] bg-check bg-contain bg-no-repeat bg-center"></i>
                              )}
                              {!item.check && (
                                <i className="w-[20px] h-[20px] ml-[8px] bg-close1 bg-contain bg-no-repeat bg-center"></i>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div key={index} className="w-full mt-4">
                      <h4 className="text-[18px] whitespace-nowrap leading-[1.2] text-[#222] font-bold mt-4 md:mt-0">
                        Customer support
                      </h4>
                      <ul className="mt-2">
                        {item.supportOptions &&
                          item.supportOptions.map((item: any) => (
                            <li
                              className="flex items-center justify-between pt-1"
                              key={item.name}
                            >
                              <span
                                className={`text-black ${!item.check ? "text-gray-500" : ""
                                  }`}
                              >
                                {item.name}
                              </span>
                              {item.check && (
                                <i className="w-[20px] h-[20px] ml-[8px] bg-check bg-contain bg-no-repeat bg-center"></i>
                              )}
                              {!item.check && (
                                <i className="w-[20px] h-[20px] ml-[8px] bg-close1 bg-contain bg-no-repeat bg-center"></i>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-4 px-6 lg:px-[50px] 2xl:px-[200px]">
              <h3 className="text-[32px] font-bold pt-4 text-black">Pricing</h3>
              <div
                className="grid gap-4 mt-4"
                style={{
                  gridTemplateColumns: `${deviceType == "mobile"
                    ? "repeat(1, minmax(0, 1fr))"
                    : `repeat(${compareList.length}, minmax(0, 1fr))`
                    }`,
                }}
              >
                {compareList.map((item: any, index: number) => (
                  <div
                    className="p-4 w-full bg-white rounded-8 flex items-stretch flex-col justify-center align-center"
                    key={index}
                  >
                    <div className="flex flex-col">
                      <h4 className="text-[18px] leading-[1.2] text-[#222] font-bold mt-4">
                        Starting from
                      </h4>
                      <div className="flex justify-start items-center mt-4">
                        <span className="text-[24px] leading-[1.2] text-[#9747ff] font-medium">
                          {item?.pricing?.currency_symbol}
                        </span>
                        <span className="text-[28px] leading-[1.2] text-[#222222] ml-2 font-medium">
                          {item?.pricing?.amount}
                        </span>
                      </div>
                      <div className="flex justify-start items-center mt-4">
                        <i className="bg-calendar bg-contain bg-no-repeat bg-center w-[20px] h-[20px]"></i>
                        <span className="text-[18px] leading-[1.2] text-[#222222] ml-2">
                          Pre {item?.pricing?.periodicity}
                        </span>
                      </div>
                      <div className="flex justify-start items-center mt-4">
                        <i className="bg-signal bg-contain bg-no-repeat bg-center w-[20px] h-[20px]"></i>
                        <span className="text-[18px] leading-[1.2] text-[#222222] ml-2">
                          {item?.pricing?.pricing_model}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-4 px-6 lg:px-[50px] 2xl:px-[200px]">
              <h3 className="text-[32px] font-bold pt-4 text-black">Key features</h3>
              <div
                className="grid gap-4 mt-4"
                style={{
                  gridTemplateColumns: `${deviceType == "mobile"
                    ? "repeat(1, minmax(0, 1fr))"
                    : `repeat(${compareList.length}, minmax(0, 1fr))`
                    }`,
                }}
              >
                {compareList.map((item: any, index: number) => (
                  <div
                    className="p-4 w-full bg-white rounded-8 flex items-stretch flex-col"
                    key={index}
                  >
                    <div className="mt-4 w-full">
                      <div className="w-full justify-between items-center flex">
                        <span className="text-[18px] leading-[1.2] text-[#111] font-bold w-[calc(100%-50px)] truncate-lines-1">
                          {item?.name} features
                        </span>
                        <span className="text-[18px] leading-[1.2] text-[#111] font-bold">
                          {item?.supportFeatures?.length + 1}
                        </span>
                      </div>
                      <ul className="mt-4">
                        {item?.supportFeatures &&
                          item.supportFeatures
                            .slice(0, item.supportFeatureSlice)
                            .map((item: any) => (
                              <li
                                className="flex items-center justify-between mt-1.5"
                                key={item.slug}
                              >
                                <span className="block text-[16px] leading-[1.2] text-[#222222] font-medium truncate-lines-1">
                                  {item.name.replace(/\\u0026/g, "&")}
                                </span>
                                <i className="w-[20px] h-[20px] ml-[8px] bg-check bg-contain bg-no-repeat bg-center"></i>
                              </li>
                            ))}
                      </ul>
                      {item?.supportFeatures?.length > 10 && (
                        <button
                          className="flex justify-center items-center text-black mt-8 w-[200px] mx-auto border border-[#9747ff] h-8 rounded-8 hover:bg-[#9747ff] hover:text-white"
                          onClick={() => {
                            setCompareList((prev: any[]) => {
                              return prev.map((item: any, idx: number) => {
                                if (index === idx) {
                                  return {
                                    ...item,
                                    supportFeatureSlice:
                                      item.supportFeatureSlice === 10
                                        ? item.supportFeatures.length
                                        : 10,
                                  };
                                }
                                return item;
                              });
                            });
                          }}
                        >
                          {item.supportFeatureSlice === 10
                            ? "Expand list"
                            : "Collapse list"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="grid gap-4 mt-4"
                style={{
                  gridTemplateColumns: `${deviceType == "mobile"
                    ? "repeat(1, minmax(0, 1fr))"
                    : `repeat(${compareList.length}, minmax(0, 1fr))`
                    }`,
                }}
              >
                {compareList.map((item: any, index: number) => (
                  <div
                    className="p-4 w-full bg-white rounded-8 flex items-stretch flex-col"
                    key={index}
                  >
                    <div className="mt-4 w-full">
                      <div className="w-full justify-between items-center flex">
                        <span className="text-[18px] leading-[1.2] text-[#111] font-bold w-[calc(100%-50px)] truncate-lines-1">
                          <span>Common features</span>
                        </span>
                        <span className="text-[18px] leading-[1.2] text-[#111] font-bold">
                          {item?.commonFeatures?.length + 1}
                        </span>
                      </div>
                      <ul className="mt-4">
                        {item?.commonFeatures &&
                          item.commonFeatures
                            .slice(0, item.commonFeatureSlice)
                            .map((item: any) => (
                              <li
                                className="flex items-center justify-between mt-1.5"
                                key={item.slug}
                              >
                                <span className="block text-[16px] leading-[1.2] text-[#222222] font-medium truncate-lines-1">
                                  {item.name.replace(/\\u0026/g, "&")}
                                </span>
                                <i className="w-[20px] h-[20px] ml-[8px] bg-check bg-contain bg-no-repeat bg-center"></i>
                              </li>
                            ))}
                      </ul>
                      {item?.commonFeatures?.length > 10 && (
                        <button
                          className="flex justify-center items-center mt-8 text-black w-[200px] mx-auto border border-[#9747ff] h-8 rounded-8 hover:bg-[#9747ff] hover:text-white"
                          onClick={() => {
                            setCompareList((prev: any[]) => {
                              return prev.map((item: any, idx: number) => {
                                if (index === idx) {
                                  return {
                                    ...item,
                                    commonFeatureSlice:
                                      item.commonFeatureSlice === 10
                                        ? item.commonFeatureSlice.length
                                        : 10,
                                  };
                                }
                                return item;
                              });
                            });
                          }}
                        >
                          {item.commonFeatureSlice === 10
                            ? "Expand list"
                            : "Collapse list"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-4 px-6 lg:px-[50px] 2xl:px-[200px]">
              <h3 className="text-[32px] font-bold pt-4 text-black">Reviews</h3>
              <div
                className="grid gap-4 mt-4"
                style={{
                  gridTemplateColumns: `${deviceType == "mobile"
                    ? "repeat(1, minmax(0, 1fr))"
                    : `repeat(${compareList.length}, minmax(0, 1fr))`
                    }`,
                }}
              >
                {compareList.map((item: any, index: number) => (
                  <div
                    className="p-4 w-full bg-white rounded-8 flex items-stretch flex-col"
                    key={index}
                  >
                    <ul>
                      <li className="flex justify-between items-center">
                        <span className="text-[16px] font-medium leading-[1.2] text-[#222222]">
                          Value for money
                        </span>
                        <div className="flex items-center w-[80px] justify-between">
                          <Rate
                            count={1}
                            value={item?.valueForMoney > 0 ? 1 : 0}
                            disabled
                          />
                          <span className="text-[16px] font-medium leading-[1.2] text-[#222222]">
                            ({item?.valueForMoney})
                          </span>
                        </div>
                      </li>

                      <li className="flex justify-between items-center">
                        <span className="text-[16px] font-medium leading-[1.2] text-[#222222]">
                          Ease of use
                        </span>
                        <div className="flex items-center w-[80px] justify-between ">
                          <Rate
                            count={1}
                            value={item?.easeOfUse > 0 ? 1 : 0}
                            disabled
                          />
                          <span className="text-[16px] font-medium leading-[1.2] text-[#222222]">
                            ({item?.easeOfUse})
                          </span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-[16px] font-medium leading-[1.2] text-[#222222]">
                          Features
                        </span>
                        <div className="flex items-center w-[80px] justify-between text-[#454545]">
                          <Rate
                            count={1}
                            value={item?.features > 0 ? 1 : 0}
                            disabled
                          />
                          <span className="text-[16px] font-medium leading-[1.2] text-[#222222]">
                            ({item?.features})
                          </span>
                        </div>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-[16px] font-medium leading-[1.2] text-[#222222]">
                          Customer support
                        </span>
                        <div className="flex items-center w-[80px] justify-between text-[#454545]">
                          <Rate
                            count={1}
                            value={item?.customerSupport > 0 ? 1 : 0}
                            disabled
                          />
                          <span className="text-[16px] font-medium leading-[1.2] text-[#222222]">
                            ({item?.customerSupport})
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCompare;
