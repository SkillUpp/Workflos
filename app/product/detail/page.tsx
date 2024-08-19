"use client";
import Image from "next/image";
import Link from "next/link";
import Ins from "@/images/ins-w.svg";
import twitter from "@/images/ins-white.svg";
import Address from "@/images/address.svg";
import Industry from "@/images/industry.svg";
import facebook from "@/images/facebook-w.svg";
import Check from "@/images/check.svg";
import { useEffect, useRef, useState } from "react";
import Users from "@/images/users.svg";
import { addFavorite, checkExistList, productDetail, removeFavorite } from "@/api/product";
import LoadingContext from "@/components/LoadingContext";
import { marked } from "marked";
import { MEDIA_TYPE } from "@/utils/enum";
import moment from "moment";
import UserIcon from "@/images/user.svg";
import { Dropdown, message } from "antd";
import { useRouter } from "next/navigation";
import WebsiteSvg from "@/images/website.svg";
import StockSvg from "@/images/stock.svg";

const MEDIA_ENUM: any = {
  linkedin: Ins,
  twitter: twitter,
  facebook: facebook,
};

const defaultCompareMenu = [
  { id: 1, htmlId: "overview", name: "Overview", active: true },
  // { id: 11, name: "Dynamic", htmlId: "dynamic", active: false },
  { id: 2, name: "News", htmlId: "news", active: false },
  // { id: 3, name: "Specialties", htmlId: "specialties", active: false },
  // { id: 4, name: "AI Stack", htmlId: "stack", active: false },
  { id: 5, name: "Funding", htmlId: "funding", active: false },
  { id: 6, name: "Core Team", htmlId: "team", active: false },
  { id: 7, name: "Investor", htmlId: "investor", active: false },
  { id: 8, name: "Competitors", htmlId: "competitors", active: false },
  { id: 9, name: "Challenges", htmlId: "challenges", active: false },
  { id: 10, name: "Opening", htmlId: "hiring", active: false },
];

interface IProductDetailCompProps {
  info?: any;
  id?: string
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
  const { id } = props;
  const router = useRouter();
  const hasInitialized = useRef(false);
  const [isRecommed, setIsRecommed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<any>({});
  const [marketSlice, setMarketSlice] = useState(9);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [compareMenu, setCompareMenu] = useState(defaultCompareMenu);
  const scrollMenu = useRef(defaultCompareMenu);
  const customScrollY = useRef(0);
  const [favoriteStatus, setFavoriteStatus] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [recommedList, setRecommedList] = useState<any[]>([]);
  let timer = useRef<any>(null);

  const startTimeout = () => {
    if (timer.current) {
      clearTimeout(timer.current); // 清除上一次的定时器
    }
    timer.current = setTimeout(function () {
      console.log("定时器执行完成");
      timer.current = null; // 清除定时器后重置变量
    }, 2000);
  };

  const handleClick = (id: string) => {
    startTimeout();
    const el = document.getElementById(id);
    if (el) {
      startTimeout();
      const rect = el.getBoundingClientRect();
      const header = document.getElementById("productHeader");
      const headerHeight = header?.clientHeight as number;
      const targetTop =
        rect.top +
        window.pageYOffset -
        (getDeviceType() == "mobile"
          ? isScrolled
            ? 200
            : 346
          : isScrolled
            ? 165
            : headerHeight + 110);

      const scrollToTop = Math.max(targetTop, 0);
      customScrollY.current = scrollToTop;

      window.scroll({
        top: scrollToTop,
        behavior: "smooth",
      });
      const menus = JSON.parse(JSON.stringify(compareMenu));
      const menuData = menus.map((item: any) => ({
        ...item,
        active: item.htmlId === id,
      }));
      setCompareMenu(menuData);
    }
  };

  let lastActiveIndex = -1;
  const handleCompScroll = () => {
    console.log("执行", timer.current);
    if (timer.current) return;
    console.log("执行完成咯嘛", timer.current);
    const scrollPosition = window.scrollY + 168;
    let activeFound = false;
    const menus = JSON.parse(JSON.stringify(scrollMenu.current));
    const menuData = menus.map((item: any, index: number) => {
      const el = document.getElementById(item.htmlId);
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.pageYOffset;
        if (
          !activeFound &&
          scrollPosition >= top &&
          scrollPosition < top + el.offsetHeight
        ) {
          activeFound = true;
          lastActiveIndex = index;
          return {
            ...item,
            active: true,
          };
        }
      }
      return {
        ...item,
        active: false,
      };
    });
    if (!activeFound && lastActiveIndex !== -1) {
      menuData[lastActiveIndex].active = true;
    }
    if (!activeFound && lastActiveIndex == -1) {
      menuData[0].active = true;
    }
    setCompareMenu(menuData);
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleCompScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleCompScroll);
  //   };
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 设置菜单
  const setMenus = (data: any) => {
    const news = data?.news ? data?.news : [];
    const specialtiesList = data?.specialtiesList ? data?.specialtiesList : [];
    const funding = data?.funding ? data?.funding : [];
    const challenges = data?.challenges ? data?.challenges : [];
    const investors = data?.investors_list_cb ? data?.investors_list_cb : [];
    const competitors = data?.competitors ? data?.competitors : [];
    const coreTeam = data?.current_employees_cb ? data?.current_employees_cb : [];
    const menus = JSON.parse(JSON.stringify(compareMenu));
    const filteredMenus = menus.filter((item: any) => {
      if (investors.length == 0 && item.htmlId === "investor") {
        return false;
      }
      if (news.length == 0 && item.htmlId === "news") {
        return false;
      }
      if (coreTeam.length == 0 && item.htmlId === "team") {
        return false;
      }
      if (funding.length == 0 && item.htmlId === "funding") {
        return false;
      }
      if (challenges.length == 0 && item.htmlId === "challenges") {
        return false;
      }
      if (competitors.length == 0 && item.htmlId === "competitors") {
        return false;
      }
      return true;
    });
    scrollMenu.current = filteredMenus;
    setCompareMenu(filteredMenus);
  };

  /**
   * 域名过滤
   * @param searchResults
   * @returns
   */
  function filterResultsByDomain(searchResults: any[]) {
    // Helper function to extract domain from URL
    function extractDomain(url: string | URL) {
      const domain = new URL(url).hostname;
      return domain;
    }

    function removeDuplicatesByDomain(results: any[]) {
      const domainMap = new Map();

      results.forEach((result) => {
        if (!domainMap.has(result.domain)) {
          domainMap.set(result.domain, result);
        }
      });

      return Array.from(domainMap.values());
    }
    searchResults.forEach((item) => {
      item.domain = extractDomain(item.url);
    });

    const uniqueResults = removeDuplicatesByDomain(searchResults);
    return uniqueResults;
  }

  const handleUpdateFavoriteState = async (type: string) => {
    const params = {
      itemName: info.name,
      itemId: info.id,
    };
    if (type == "add") {
      try {
        setFavoriteLoading(true);
        const res = await addFavorite(params);
        if (res.data) {
          setFavoriteLoading(false);
          setFavoriteStatus(true);
          message.success("Added successfully.");
        }
      } catch (error) {
        setFavoriteLoading(false);
      }
    }
    if (type == "remove") {
      try {
        setFavoriteLoading(true);
        const res = await removeFavorite(params);
        if (res.data) {
          setFavoriteLoading(false);
          setFavoriteStatus(false);
          message.success("Removed successfully.");
        }
      } catch (error) {
        setFavoriteLoading(false);
      }
    }
  };

  /**
   * 跳转相似公司、如果公司在aitracker 平台不存在就跳转去领英
   * @param name 
   * @param link 
   * @returns 
   */
  const jumpToDetail = async (name: string, link: string) => {
    setLoading(true);
    const res = await checkExistList({ list: [name] });
    if (res.data) {
      setLoading(false);
      const data = res.data;
      if (data.length > 0 && data[0].exist) {
        router.push('/product/' + name)
        return
      }
      // window.open(link, '_blank')

    }
  }

  useEffect(() => {
    scrollToTop();
  }, []);


  /**
  * 获取产品详情信息
  */
  const initData = () => {
    const result: any = props.info?.data;
    setInfo(result);
    setMenus(result)
    const searchResults =
      result?.overview.length > 0 ? result?.overview[0].search_results : [];
    setSearchResults(filterResultsByDomain(searchResults));
    setFavoriteStatus(result?.favoriteStatus);
    if (result?.top4_similar_pages) {
      setRecommedList(result.top4_similar_pages || [])
    }
  }

  if (!hasInitialized.current) {
    initData();
    hasInitialized.current = true;
  }

  const AddressMenu = (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <ul className="flex flex-col gap-2">
        {info?.locations &&
          info?.locations.map((item: string) => (
            <li key={item} className="text-gray-700">
              {item}
            </li>
          ))}
      </ul>
    </div>
  );

  return (
    <div className=" mt-20 bg-gray-200 overflow-x-hidden">
      {loading && <LoadingContext />}
      {/* <div className="absolute inset-0 z-0 left-[80%] translate-x-[-50%] top-[90px]">
        <Image
          className="hidden"
          src={Bg}
          alt="Background"
          objectFit="cover"
          quality={100}
          width={500}
          height={500}
        />
      </div> */}
      <div
        id="productHeader"
        className={`w-full h-auto py-8 md:pb-0 ${isScrolled
          ? "h-[60px] fixed top-[86px] left-0 right-0 z-10 pt-[10px] pb-[10px] md:pt-[10px] md:pb-[10px] justify-center"
          : "md:h-auto md:pt-[32px] md:pb-[32px]"
          } box-border bg-customPurple flex flex-col px-6 xl:pl-[56px] 2xl:pl-[360px] xl:pr-[56px] 2xl:pr-[200px] overflow-x-auto transition-all duration-300`}
      >
        <div
          className={`flex items-center justify-between ${!isScrolled && "mb-2"
            }`}
        >
          <div className="flex items-center">
            {info?.logo && (
              <Image
                src={info?.logo}
                alt={info?.name}
                width={40}
                height={40}
                className="rounded-md"
              />
            )}
            <h3
              className={`text-xl ml-3 font-bold text-white truncate-lines-1`}
            >
              {info?.name}
            </h3>
          </div>
          <div className="cursor-pointer relative z-10">
            <button
              onClick={() =>
                handleUpdateFavoriteState(favoriteStatus ? "remove" : "add")
              }
              className="flex items-center border text-white px-2 py-1 rounded-md hover:bg-customPurple/80 transition-all duration-300 cursor-pointer"
            >
              {favoriteLoading && <i className="loadingState"></i>}
              <span>{favoriteStatus ? "Following" : "Follow"}</span>
            </button>
          </div>
        </div>
        {/* 如果 short_description 不存在就展示 overview*/}
        {!isScrolled &&
          info?.overview &&
          info?.overview.length > 0 &&
          !info?.short_description_cb && (
            <p
              className="text-md leading-tight mb-2 mt-2 text-white truncate-lines-3 relative z-10 prose"
              dangerouslySetInnerHTML={{
                __html: marked(
                  info?.overview[0].report.replace(/\[citation\]\(\d+\)/g, "")
                ),
              }}
            ></p>
          )}
        {!isScrolled && info?.short_description_cb && (
          <p
            className="text-md leading-tight mb-2 mt-2 text-white truncate-lines-3 relative z-10 prose"
            dangerouslySetInnerHTML={{
              __html: marked(
                info?.short_description_cb.replace(/\[citation\]\(\d+\)/g, "")
              ),
            }}
          ></p>
        )}
        {!isScrolled && info?.website && (
          <div className="flex items-center space-x-9 mb-2 group">
            <div className="flex items-center">
              <Image src={WebsiteSvg} width={24} height={24} alt="" />
              <Link className="pl-1.5 text-sm leading-tight text-white group-hover:underline" href={info.website} target="_blank">
                {info?.website}
              </Link>
            </div>
          </div>
        )}
        {!isScrolled && info?.stock && info.stock?.name && info.stock?.market != 'N/A' && (
          <div className="flex items-center space-x-9 mb-2 group">
            <div className="flex items-center">
              <Image src={StockSvg} width={24} height={24} alt="" />
              <div className="flex items-center text-white">
                <span className="px-1.5 text-sm leading-tight text-white font-bold">{info.stock.market}</span>
                |
                <span className="px-1.5 text-sm leading-tight text-white font-bold">{ info.stock.last_update}</span>
                |
                <span className="px-1.5 text-sm leading-tight text-white font-bold">{ info.stock.price}</span>
              </div>
            </div>
          </div>
        )}
        {!isScrolled && (
          <div>
            {info?.headquarters && (
              <div className="flex items-center space-x-9 mb-2">
                <Dropdown overlay={AddressMenu} trigger={["hover"]}>
                  <div className="flex items-center">
                    <Image
                      src={Address}
                      width={24}
                      height={24}
                      alt="Phone Icon"
                    />
                    <span className="pl-1.5 text-sm leading-tight text-white">
                      {info?.headquarters}
                    </span>
                  </div>
                </Dropdown>
              </div>
            )}
            {info?.industry && (
              <div className="flex items-center space-x-9 mb-2">
                <div className="flex items-center">
                  <Image src={Industry} width={24} height={24} alt="" />
                  <span className="pl-1.5 text-sm leading-tight text-white">
                    {info?.industry}
                  </span>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <div className="flex items-center justify-center border border-white rounded text-white text-sm leading-tight h-5 px-1.5">
                <Image src={UserIcon} width={16} height={16} alt="Email Icon" />
                <span>
                  {info?.employees?.gte > 0 ? info?.employees?.gte + "+" : ""}
                </span>
              </div>
              <div className="flex items-center justify-center border border-white rounded text-white text-sm leading-tight h-5 px-1.5">
                <span>Founded in {info?.foundingYear}</span>
              </div>
              {/* <div className="flex items-center justify-center border border-white rounded text-white text-sm leading-tight h-5 px-1.5">
                <span>$</span>
                <span className="ml-1">100+</span>
              </div> */}
            </div>

            <div className={`pt-4 flex space-x-3`}>
              {info?.socialNetworks &&
                info?.socialNetworks.map((item: any) => (
                  <Link href={item.url} key={item.type}>
                    <Image
                      alt="Social Icon"
                      width={24}
                      height={24}
                      src={MEDIA_ENUM[item.type]}
                    />
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
      {/* 移动端 */}
      <div
        className={`block md:hidden w-full mb-4 fixed z-10 px-6 transition-all duration-300 ${isScrolled ? "top-[146.5px]" : ""
          }`}
      >
        <div className="relative h-10 flex flex-row items-center bg-gray-200 overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div className="absolute h-full w-px right-0"></div>
          {compareMenu.map((item) => (
            <div
              key={item.id}
              className={`animation-all-3 cursor-pointer flex items-center justify-end h-8 mr-4 whitespace-nowrap text-[#333333] ${item.active
                ? "font-bold text-[#333] border-b-[2px] border-customPurple"
                : ""
                }`}
              onClick={() => handleClick(item.htmlId)}
            >
              <span className="text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`reative flex flex-col md:flex-row px-6 xl:pl-[56px] xl:pr-5 2xl:pl-56 2xl:pr-5 pt-6 z-10`}
      >
        {/* 侧边栏 */}
        <div className="flex-shrink-0 w-full mr-6 md:w-32">
          <div
            className={`hidden md:block fixed z-10 ${isScrolled ? "top-[144px] md:top-[160px]" : ""
              } `}
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

        <div
          className={`flex-grow overflow-y-auto  ${isScrolled
            ? "absolute left-[24px] right-[24px] top-[160px] md:top-[160px] md:left-[176px] md:right-[24px] lg:left-[176px] lg:right-[24px] xl:left-[210px] xl:right-[306px] 2xl:left-[376px] 2xl:right-[306px]"
            : "mt-8 md:mt-0"
            }`}
        >
          <div
            id="overview"
            className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-2 text-[#222]">Overview</h3>
            {info?.overview && info?.overview.length > 0 && (
              <p
                className="text-md mt-6 text-[#454545] prose"
                dangerouslySetInnerHTML={{
                  __html: marked(
                    info?.overview[0]?.report.replace(
                      /\[citation\]\(\d+\)/g,
                      ""
                    )
                  ),
                }}
              ></p>
            )}

            <h3 className="text-lg text-[#333] font-bold mt-4">Sources</h3>
            <div className="space-y-2 mt-4">
              {searchResults.length > 0 &&
                searchResults.map(
                  (item: { title: string; url: string; snippet: string }) => {
                    return (
                      <div
                        className="p-4 border rounded cursor-pointer parent-hover"
                        key={item.title + item.url}
                        onClick={() => window.open(item.url, "_blank")}
                      >
                        <h3 className="font-semibold text-[#343434] ">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#454545]">{item.snippet}</p>
                      </div>
                    );
                  }
                )}
            </div>
          </div>

          {/* 动态 */}
          {/* {info.top3_updates && info.top3_updates.length > 0 && (
            <div
              id="dynamic"
              className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2 text-[#333]">Dynamic</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                {info.top3_updates.map((item: { full_link: string, subtitle: string }) => (
                  <div
                    className="p-4 border rounded cursor-pointer"
                    key={item.subtitle}
                    onClick={() => window.open(item.full_link, "_blank")}
                  >
                    <h3 className="font-semibold text-[#343434] text-sm">
                      {item.subtitle}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* 新闻 */}
          {info?.news && info.news.length > 0 && (
            <div
              id="news"
              className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2 text-[#333]">News</h3>
              {(!info?.news || info?.news?.length == 0) && (
                <div className="space-y-6 text-[#454545]">Comming Soon</div>
              )}

              {info?.news &&
                info.news.map((item: any) => (
                  <>
                    <div key={item.company_id}>
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-[#222]">
                          {moment(item.news_published_at).format(
                            "MMM DD, YYYY"
                          )}
                        </span>
                        <div className="flex-grow h-px bg-gray-300 mx-2"></div>
                      </div>
                      <div>
                        {item?.data?.newsReport && (
                          <p
                            className="text-sm mb-2 prose"
                            dangerouslySetInnerHTML={{
                              __html: marked(
                                item?.data?.newsReport.replace(
                                  /\[citation\]\(\d+\)/g,
                                  ""
                                )
                              ),
                            }}
                          ></p>
                        )}
                      </div>
                    </div>

                    {item?.data?.citations &&
                      item?.data?.citations?.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                          {item?.data?.citations?.map((c: any) => (
                            <div
                              className="p-4 border rounded cursor-pointer parent-hover"
                              key={c.title + c.url}
                              onClick={() => window.open(c.url, "_blank")}
                            >
                              <p className="text-sm text-customPurple truncate-lines-1">
                                {c.url}
                              </p>
                              <h3 className="font-semibold text-[#343434] text-sm">
                                {c.title}
                              </h3>
                            </div>
                          ))}
                        </div>
                      )}
                  </>
                ))}
            </div>
          )}

          {/*           
          {info?.specialtiesList && (
            <div
              id="specialties"
              className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2 text-[#333]">Specialties</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {info?.specialtiesList && info?.specialtiesList?.map((item: any) => (
                  <li key={item} className="text-sm text-[#454545] flex items-center justify-between">
                    <span>{item}</span>
                    <Image src={Check} alt="check" width={16} height={16} className="inline-block ml-1" />
                  </li>
                ))}
              </ul>
            </div>
          )} */}

          {info?.funding && info?.funding.length > 0 && (
            <div
              id="funding"
              className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
            >
              <h3 className="text-xl font-bold text-[#333]">Funding</h3>
              {info?.funding && info?.funding.length > 0 && (
                <p
                  className="text-md mt-6 text-[#454545] prose"
                  dangerouslySetInnerHTML={{
                    __html: marked(
                      info?.funding[0]?.report.replace(
                        /\[citation\]\(\d+\)/g,
                        ""
                      )
                    ),
                  }}
                ></p>
              )}

              <h3 className="text-lg text-[#333] font-bold mt-4">Sources</h3>
              <div className="space-y-2 mt-4">
                {info?.funding?.length > 0 &&
                  info.funding[0]?.search_results.map(
                    (item: { title: string; url: string; snippet: string }) => {
                      return (
                        <div
                          className="p-4 border rounded cursor-pointer parent-hover"
                          key={item.title}
                          onClick={() => window.open(item.url, "_blank")}
                        >
                          <h3 className="font-semibold text-[#333]">
                            {item.title}
                          </h3>
                          <p className="text-sm text-[#454545]">
                            {item.snippet}
                          </p>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          )}

          {info?.current_employees_cb && info?.current_employees_cb.length > 0 && (
            <div
              id="team"
              className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2 text-[#333]">Core Team</h3>
              <ul className="list-none ml-0 text-sm flex flex-wrap justify-between">
                {info?.current_employees_cb.map(
                  (item: any) => (
                    <li
                      className="parent-hover p-4 border rounded-md cursor-pointer w-full lg:w-[49%] mt-4 flex flex-col text-[#444444] hover:text-[#000000] transition-all duration-300 ease-in-out"
                      key={item.name}
                    >
                      <Link
                        href={`https://linkedin.com/company/${item.identifier.permalink}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-2"
                      >
                        <Image
                          className="rounded-md w-12 h-12 object-fill"
                          src={item.person_identifier.image}
                          alt=""
                          width={40}
                          height={40}
                        />
                        <h3>{item.person_identifier.value}</h3>
                      </Link>
                      <p className="text-md pt-2 pl-2">{item.title}</p>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {info?.investors_list_cb && info?.investors_list_cb.length > 0 && (
            <div
              id="investor"
              className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2 text-[#333]">Investor</h3>
              <ul className="list-none ml-0 text-sm flex flex-wrap justify-between">
                {info?.investors_list_cb
                  .filter((item: any, index: number, self: any) =>
                    index === self.findIndex((t: any) => t.investor_identifier?.value === item.investor_identifier?.value)
                  )
                  .map((item: any, index: number) => (
                    <li
                      className="p-2 border rounded-md w-full lg:w-[49%] mt-4 flex flex-col text-[#444444] transition-all duration-300 ease-in-out"
                      key={index}
                    >
                      <div className="flex items-center space-x-2 h-full">
                        {item.investor_identifier && (
                          <Image
                            className="rounded-md"
                            src={item.investor_identifier.image}
                            alt=""
                            width={40}
                            height={40}
                          />
                        )}
                        <h3>{item.investor_identifier.value}</h3>
                      </div>
                    </li>
                  ))}

              </ul>
            </div>
          )}

          {info?.competitors && info?.competitors.length > 0 && (
            <div
              id="competitors"
              className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2 text-[#333]">
                Competitors
              </h3>
              {info?.competitors && info?.competitors.length > 0 && (
                <p
                  className="text-md mt-6 text-[#454545] prose"
                  dangerouslySetInnerHTML={{
                    __html: marked(
                      info?.competitors[0]?.report.replace(
                        /\[citation\]\(\d+\)/g,
                        ""
                      )
                    ),
                  }}
                ></p>
              )}

              <h3 className="text-lg text-[#333] mt-6 font-bold">Sources</h3>
              <div className="space-y-2 mt-4">
                {info?.competitors?.length > 0 &&
                  info.competitors[0]?.search_results.map(
                    (item: { title: string; url: string; snippet: string }) => {
                      return (
                        <div
                          className="p-4 border rounded cursor-pointer parent-hover"
                          key={item.title}
                          onClick={() => window.open(item.url, "_blank")}
                        >
                          <h3 className="font-semibold text-[#333]">
                            {item.title}
                          </h3>
                          <p className="text-sm text-[#454545]">
                            {item.snippet}
                          </p>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          )}

          {info?.challenges && info?.challenges.length > 0 && (
            <div
              id="challenges"
              className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2 text-[#333]">Challenges</h3>
              {info?.challenges && info?.challenges.length > 0 && (
                <p
                  className="text-md mt-6 text-[#454545] prose"
                  dangerouslySetInnerHTML={{
                    __html: marked(
                      info?.challenges[0]?.report.replace(
                        /\[citation\]\(\d+\)/g,
                        ""
                      )
                    ),
                  }}
                ></p>
              )}

              <h3 className="text-lg text-[#333] mt-6 font-bold">Sources</h3>
              <div className="space-y-2 mt-4">
                {info?.challenges?.length > 0 &&
                  info.challenges[0]?.search_results.map(
                    (item: { title: string; url: string; snippet: string }) => {
                      return (
                        <div
                          className="p-4 border rounded cursor-pointer parent-hover"
                          key={item.title}
                          onClick={() => window.open(item.url, "_blank")}
                        >
                          <h3 className="font-semibold text-[#333]">
                            {item.title}
                          </h3>
                          <p className="text-sm text-[#454545]">
                            {item.snippet}
                          </p>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          )}

          <div
            id="hiring"
            className="mb-4 bg-white box-border px-5 py-5 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-2 text-[#333]">Opening</h3>

            <div className="flex mt-6 items-center">
              <Image src={Users} alt="" width={24} height={24} />
              <h3 className="pl-4 text-lg text-[#333] font-bold">Leadership</h3>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {info?.leadership?.length > 0 &&
                info.leadership[0]?.openings.map(
                  (item: {
                    title: string;
                    count: string;
                    apply_link: string;
                  }) => {
                    return (
                      <div
                        className="p-2 border rounded w-fit cursor-pointer"
                        key={item.title}
                        onClick={() => window.open(item.apply_link, "_blank")}
                      >
                        <h3 className="font-semibold flex justify-between text-[#666] hover:text-customPurple">
                          {item.title}
                        </h3>
                      </div>
                    );
                  }
                )}

              {info?.leadership?.length == 0 && (
                <p className="text-md text-[#454545]">Comming Soon</p>
              )}
              <p></p>
            </div>
            {info?.leadership && info?.leadership.length > 0 && (
              <p
                className="text-md mt-6 text-[#454545] prose"
                dangerouslySetInnerHTML={{
                  __html: marked(
                    info?.leadership[0]?.report.replace(
                      /\[citation\]\(\d+\)/g,
                      ""
                    )
                  ),
                }}
              ></p>
            )}
            {info?.leadership?.length > 0 &&
              info.leadership[0].tools.length > 0 && (
                <h3 className="text-lg text-[#333] mt-6 font-bold">
                  Internal tools：
                </h3>
              )}

            {/* Jobs */}
            {info?.jobs &&
              info?.jobs?.items &&
              info?.jobs?.items.length > 0 && (
                <>
                  <div className="flex mt-6 items-center">
                    <Image src={Users} alt="" width={24} height={24} />
                    <h3 className="pl-4 text-lg text-[#333] font-bold">Jobs</h3>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-4">
                    {info?.jobs?.items.map((item: any, index: number) => (
                      <li
                        key={item.index}
                        className="parent-hover text-sm text-[#454545] border p-2 rounded-lg cursor-pointer"
                        onClick={() =>
                          window.open(item.job_result_link, "_blank")
                        }
                      >
                        <div className="flex justify-between">
                          <p className="text-xs text-[#333]">
                            {item.job_location}
                          </p>
                          <p className="text-xs text-[#666]">
                            {item.job_list_date}
                          </p>
                        </div>
                        <p className="text-xs text-[#222] pt-2">
                          {item.job_title}
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              )}

            <div className="flex flex-wrap gap-3 mt-4">
              {info?.leadership?.length > 0 &&
                info.leadership[0].tools.map((item: string) => {
                  return (
                    <div className="p-2 border rounded w-fit" key={item}>
                      <h3 className="font-semibold flex justify-between text-[#666] text-xs ">
                        {item}
                      </h3>
                    </div>
                  );
                })}
            </div>

            <div className="flex mt-6 items-center">
              <Image src={Users} alt="" width={24} height={24} />
              <h3 className="pl-4 text-lg text-[#333] font-bold">
                Go-to-Market
              </h3>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {info?.productAndEngineering?.length > 0 &&
                info.productAndEngineering[0]?.openings
                  ?.slice(0, marketSlice)
                  .map(
                    (item: {
                      title: string;
                      count: string;
                      apply_link: string;
                    }) => {
                      return (
                        <div
                          className="p-2 border rounded w-fit cursor-pointer"
                          key={item.title}
                          onClick={() => window.open(item.apply_link, "_blank")}
                        >
                          <h3 className="font-semibold flex justify-between text-[#666] hover:text-customPurple">
                            {item.title}
                          </h3>
                        </div>
                      );
                    }
                  )}
              {info?.productAndEngineering?.length > 0 &&
                info.productAndEngineering[0]?.openings?.length > 9 &&
                marketSlice !=
                info.productAndEngineering[0]?.openings.length && (
                  <div
                    className="p-2 border rounded w-fit cursor-pointer bg-customPurple text-white"
                    onClick={() =>
                      setMarketSlice(
                        info.productAndEngineering[0]?.openings.length
                      )
                    }
                  >
                    show more
                  </div>
                )}
            </div>

            <h3 className="text-lg text-[#333] mt-6 font-bold">
              Product & Engineering
            </h3>
            {info?.productAndEngineering &&
              info?.productAndEngineering.length > 0 && (
                <p
                  className="text-md mt-6 text-[#454545] prose"
                  dangerouslySetInnerHTML={{
                    __html: marked(
                      info?.productAndEngineering[0]?.report.replace(
                        /\[citation\]\(\d+\)/g,
                        ""
                      )
                    ),
                  }}
                ></p>
              )}

            <h3 className="text-lg text-[#333] mt-6 font-bold">
              Internal tools：
            </h3>
            <div className="flex flex-wrap gap-3 mt-4">
              {info?.productAndEngineering?.length > 0 &&
                info.productAndEngineering[0]?.tools.map((item: string) => {
                  return (
                    <div className="p-2 border rounded w-fit" key={item}>
                      <h3 className="font-semibold flex justify-between text-[#666] text-xs ">
                        {item}
                      </h3>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className={`${isRecommed ? 'block' : 'hidden'} fixed right-12 border border-gray-200 lg:block w-[276px] flex-shrink-0 bg-white rounded-lg  ${isScrolled ? 'lg:fixed lg:right-5 lg:top-[160px]' : 'lg:static lg:ml-3 lg:border-0 lg:right-auto h-full'}`}>
          <h3 className="text-lg font-bold text-[#111] p-3 border-b">Similar Compaines</h3>
          {recommedList && recommedList.length > 0 && (
            <ul className="h-full max-h-[400px] overflow-y-auto p-3">
              {recommedList.map((item, index) => (
                <li
                  key={index}
                  className="m-2 border border-gray-100 p-2 rounded-md cursor-pointer hover:shadow-lg hover:shadow-gray-200 group"
                >
                  <div className="flex items-center" onClick={() => jumpToDetail(item.name, item.link)}>
                    <Image src={item.logo_url} alt="" width={40} height={40} className="mr-2 rounded-md" />
                    <h3 className="font-bold text-lg truncate-lines-1 text-black group-hover:text-customPurple group-hover:underline">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 pt-2 text-sm truncate truncate-lines-2 group-hover:text-customPurple group-hover:underline">
                    {item.industry}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="block fixed right-0 top-[50%] transform -translate-y-[50%] bg-customPurple p-2 rounded-lg text-white cursor-pointer rotate-[-90deg] origin-bottom-right lg:hidden" onClick={() => setIsRecommed(!isRecommed)}>
        Similar Compaines
      </div>
    </div>
  );
};

export default ProductDetailComp;
