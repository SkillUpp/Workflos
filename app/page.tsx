"use client";
import Link from "next/link";
import Image from "next/image";
import { Select, Spin } from "antd";
import NoFound from "@/components/NoFound";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sortOfRateEnumList } from "@/utils/enum";
import { ICategoryList, IPorductList } from "./type";
import { categoryList, productList } from "@/api/product";
import LoadingContext from "@/components/LoadingContext";
import ScrollableTabs from "@/components/ScrollableTabs";

export default function Home() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSort, setCurrentSort] = useState("rateAvg");
  const [softworeTab, setSoftworeTab] = useState(sortOfRateEnumList);
  const [softworeList, setSoftworeList] = useState<IPorductList[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [CategoryList, setCategoryList] = useState<ICategoryList[]>([]);

  const handleJump = (path: string) => {
    route.push(path);
  };

  /**
   * tab 切换
   * @param id
   * @param val
   */
  const handleChangeSoftwore = (id: number, val: string) => {
    setCurrentSort(val);
    getSoftworeList();
  };

  /**
   * 获取分类列表
   */
  const getCategoryList = async () => {
    const res = await categoryList();
    setCategoryList(res.data);
  };

  /**
   * 获取产品列表
   */
  const getSoftworeList = async (category?: string) => {
    const params = {
      keyword: searchValue,
      category: category || currentCategory,
      sortBy: currentSort,
      limit: 21,
      page: 1,
    };
    try {
      setLoading(true);
      setSoftworeList([]);
      const res = await productList(params);
      if (res.data) {
        const list: IPorductList[] = res.data.list;
        list.forEach((item) => {
          item.description = item.description?.replace(/\\n/g, " ");
          item.description = item.description?.replace(/\\r/g, " ");
          item.description = item.description?.replace(/\\u0026/g, "&");
          item.introduce = item.introduce?.replace(/\\u0026/g, "&");
        });
        setSoftworeList(list);
        setTotalCount(res.data.totalCount);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleTabClick = (tab) => {
    setCurrentSort(tab.value)
    getSoftworeList()
  }

  useEffect(() => {
    getCategoryList();
    getSoftworeList();
  }, []);

  return (
    <div className="pt-[86px] overflow-hidden">
      <div className="px-[24px] sm:pt-[40px] pt-[80px] lg:px-[56px] xl:pl-[200px] relative flex justify-between pb-8 h-auto lg:pb-0 lg:h-[420px]">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col">
            <h3 className="text-[#9747ff] text-[32px] md:text-[36px] font-extrabold">
              Where business leaders find software
            </h3>
            <div className="relative h-[50px] mt-[32px] border border-black rounded-[24px]">
              <input
                type="text"
                placeholder="Search apps, categories..."
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-[20px] h-full w-full outline-none border-none text-black text-[18px] bg-transparent"
                onKeyDown={() => getSoftworeList()}
              />
              <i
                className="absolute right-[8px] top-1/2 w-[36px] h-[36px] bg-search bg-cover transform -translate-y-1/2 cursor-pointer hover:opacity-70"
                onClick={() => getSoftworeList()}
              ></i>
            </div>
            <div className="pt-[40px]">
              <h3 className="text-black text-[24px] font-semibold leading-5">
                Explore software categories customers love
              </h3>
              <div className="relative mt-4 h-[56px] border border-[#9747ff] rounded-[24px] cursor-pointer hover:opacity-80">
                <Select
                  showSearch
                  value={currentCategory}
                  onChange={(value) => {
                    setCurrentCategory(value);
                    getSoftworeList(value);
                  }}
                  className="w-full h-full bg-transparent text-[#9747ff] text-[24px] border-none cursor-pointer"
                >
                  {CategoryList.map((item) => (
                    <Select.Option value={item.name} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
                <i className="absolute right-[8px] top-1/2 w-[42px] h-[42px] bg-arrow bg-cover transform -translate-y-1/2 cursor-pointer hover:opacity-70"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-[35%] bottom-0 bg-search-bg bg-contain bg-no-repeat">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#9747ff] rounded-[8px] w-[298px] flex flex-col items-center justify-center py-[8px]">
            <h3 className="text-white text-[60px]">
              {" "}
              {totalCount ? totalCount / 1000 + "K" : "0k"}{" "}
            </h3>
            <p className="text-white text-[20px]">Software Profiles</p>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="w-full h-[52px] md:bg-black">
          <ul className="hidden md:flex items-center justify-around h-full mx-[90px] list-none">
            {softworeTab.map((item) => (
              <li
                className={`flex items-center text-white text-[16px] cursor-pointer ${item.value === currentSort
                    ? "text-[#9747ff] border-b border-[#9747ff]"
                    : ""
                  }`}
                key={item.name}
                onClick={() => handleChangeSoftwore(item.id, item.value)}
              >
                {item.name}
              </li>
            ))}
          </ul>
          <div className="block md:hidden">
            <ScrollableTabs tabs={softworeTab} onTabClick={handleTabClick} />
          </div>
          <div className="hidden">
            <Select
              defaultValue={currentSort}
              onChange={(value) => {
                setCurrentSort(value);
                getSoftworeList();
              }}
            >
              {softworeTab.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="bg-[#f0f0f0] py-[50px] px-6 lg:px-[50px] 2xl:px-[200px]">
          {loading && <LoadingContext />}
          {softworeList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {softworeList.map((item) => (
                <div
                  key={item.name}
                  className="w-full mb-1 bg-white rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                  onClick={() => handleJump(`product/${item.name}`)}
                >
                  <div className="flex-shrink-0 flex items-center">
                    {item.photo && (
                      <div className="w-[40px] h-[40px] rounded-md overflow-hidden">
                        <Image
                          src={item.photo}
                          alt=""
                          width={40}
                          height={40}
                          className="rounded-md object-contain w-full h-full"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://aitracker.ai/empty.jpeg";
                          }}
                        />
                      </div>
                    )}
                    {!item.photo && (
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

                    <h3 className="pl-2 text-black text-2xl font-extrabold leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.name}
                    </h3>
                  </div>
                  <div className="pl-3 flex flex-col">
                    <p
                      className="mt-1 text-sm text-black overflow-hidden text-ellipsis line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: item?.description,
                      }}
                    ></p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {softworeList.length == 0 && (
            <div className="h-100 flex items-center justify-center">
              <NoFound title="No products" message="" />
            </div>
          )}

          {softworeList.length >= 10 && (
            <Link
              href={"/category"}
              className="w-[198px] h-[30px] mx-auto flex items-center justify-center bg-[#9747ff] rounded-[5px] text-white text-[16px] mt-[50px] cursor-pointer hover:opacity-80"
              onClick={() => handleJump("/category")}
            >
              See all Software
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
