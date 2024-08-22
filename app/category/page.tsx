"use client";
import { MouseEvent, useEffect, useState } from "react";
import styls from "./index.module.css";
import { Pagination, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categoryList, productList } from "@/api/product";
import { productEnumList } from "@/utils/enum";
import LoadingContext from "@/components/LoadingContext";
import NoFound from "@/components/NoFound";
import CompareModal from "./CompareModal";

const tabs = [
  { id: 1, title: "Allapps", value: "rateAvg", active: true },
  { id: 2, title: "Leaders", value: "categoryLeaders", active: false },
  // { id: 3, title: "Guide", value: "EaseOfUse", active: false },
];

const Category = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [categoryTabs, setCategoryTabs] = useState(tabs);
  const [currentCategory, setCurrentCategory] = useState("CRM");
  const [currentSort, setCurrentSort] = useState("rateAvg");
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [softworeList, setSoftworeList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentItem, setCurrentItem] = useState<any>({});
  const [CategoryList, setCategoryList] = useState([]);
  const toggleCompareModal = () => setIsCompareModalOpen(!isCompareModalOpen);

  const handleTabClick = (id: number, name: string) => {
    setCurrentSort(name);
    setCategoryTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        active: tab.id === id,
      }))
    );
    getSoftworeList();
  };

  const getCategoryList = async () => {
    const res = await categoryList();
    setCategoryList(res.data);
  };

  const handleJumpCompare = () => {
    route.push("/compare");
  };

  /**
   * 跳转官网
   * @param path
   */
  const handleJumpWebsite = (path: string) => {
    window.open(path, "_blank");
  };

  /**
   * 获取产品列表
   */
  const getSoftworeList = async (category?: string, page?: number) => {
    const params = {
      category: category || currentCategory,
      sortBy: currentSort,
      limit: 10,
      page: page || 1,
    };
    try {
      setLoading(true);
      const res = await productList(params);
      if (res.data) {
        const list = res.data.list;
        setLoading(false);
        setTotalCount(res.data.totalCount);
        list.forEach((item: { description: string; introduce: string }) => {
          item.description = item.description.replace(/\\n/g, " ");
          item.description = item.description.replace(/\\r/g, " ");
          item.description = item.description.replace(/\\u0026/g, "&");
          item.introduce = item.introduce.replace(/\\u0026/g, "&");
        });
        setSoftworeList(list);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChangePage = (page: number) => {
    getSoftworeList("", page);
  };

  const handleCompare = (event: any, item: any) => {
    event.stopPropagation();
    setCurrentItem(item);
    // toggleCompareModal();
    setIsCompareModalOpen(true);
  };

  const handleJump = (path: string) => {
    route.push(path);
  };

  useEffect(() => {
    getCategoryList();
    getSoftworeList();
  }, []);
  return (
    <div className="pt-[86px] bg-[#f0f0f0] overflow-hidden min-h-[calc(100vh-86px)]">
      {loading && <LoadingContext />}
      <div>
        <h3 className="m-0 pt-[42px] px-[24px] lg:px-[56px] 2xl:px-[200px] pb-[14px] text-[32px] font-extrabold bg-white">
          Accounting Software
        </h3>
        <div className="flex items-center h-[52px] bg-black  px-[24px] lg:px-[56px] 2xl:px-[200px]">
          {categoryTabs.map((item) => (
            <div
              key={item.id}
              className={`text-[16px] text-white font-semibold ml-[160px] cursor-pointer first:ml-0 ${
                item.active
                  ? "text-[#9747ff] border-b border-[#9747ff] transition-all duration-300"
                  : ""
              }`}
              onClick={() => handleTabClick(item.id, item.value)}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className="hidden">
          <Select
            value={currentSort}
            onChange={(val) => {
              setCurrentSort(val);
              getSoftworeList();
            }}
          >
            {categoryTabs.map((item) => (
              <Select.Option value={item.value} key={item.id}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="pt-[13px] pb-[64px] px-[24px] lg:px-[56px] 2xl:px-[200px] bg-[#f0f0f0]">
          <div className="flex items-center justify-between h-[42px]">
            <p className="text-[24px] font-extrabold text-black leading-[42px]">
              {totalCount} software options
            </p>
          </div>

          <div className="flex items-center flex-col h-auto p-4 justify-between md:flex-row md:h-[57px] md:py-0 px-[20px] mt-[14px] bg-[#9747ff] rounded-[12px]">
            <div className="flex items-center">
              <i className="w-[24px] h-[24px] bg-share2 bg-cover"></i>
              <span className="pl-[16px] text-[20px] leading-8 text-white">
                Personalize your search
              </span>
            </div>
            <div className="w-[298px] common-select pt-4 md:pt-0">
              <Select
                value={currentCategory}
                onChange={(val: string) => {
                  setCurrentCategory(val);
                  getSoftworeList(val);
                }}
              >
                {CategoryList.map((item: { name: string }) => (
                  <Select.Option value={item.name} key={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex flex-col min-h-[300px]">
            {softworeList.map((item: any) => (
              <div
                className="relative mt-[24px] p-[12px_12px_0_12px] bg-white rounded-[12px] transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-[1.02]"
                key={item.name}
                onClick={() => handleJump(`/product/${item.name}`)}
              >
                <div className="flex justify-between pb-[12px] mb-[12px] border-b border-[rgba(151,71,255,0.3)]">
                  <div className="flex">
                    <div className="w-[42px] h-[42px] md:w-[76px] md:h-[76px] rounded-8">
                      <Image
                        src={item.photo}
                        alt=""
                        width={77}
                        height={77}
                        className="w-[42px] h-[42px] md:w-[76px] md:h-[76px] rounded-8 object-fill"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://aitracker.ai/empty.jpeg";
                        }}
                      />
                    </div>
                    <div className="pl-[12px]">
                      <div className="flex items-center">
                        <span className="max-w-[800px] text-[24px] font-semibold text-[#9747ff] truncate truncate-lines-1">
                          {item.name}
                        </span>
                      </div>
                      <p
                        className="mt-[6px] text-[14px] leading-[1.2] text-black truncate-lines-2"
                        dangerouslySetInnerHTML={{ __html: item?.introduce }}
                      ></p>
                    </div>
                  </div>
                  <div className="hidden md:flex">
                    <button
                      className="flex items-center bg-white border border-[#9747ff] rounded-[8px] h-[30px] px-[12px] cursor-pointer hover:opacity-50"
                      onClick={(e) => handleCompare(e, item)}
                    >
                      <i className="w-[20px] h-[20px] bg-compare bg-cover"></i>
                      <span className="pl-[10px] text-[#9747ff] text-[14px] leading-[1.2]">
                        Compare
                      </span>
                    </button>
                  </div>
                  <div className="flex md:hidden ">
                    <button
                      className="flex items-center bg-white border border-[#9747ff] rounded-[8px] h-[30px] px-[12px] cursor-pointer hover:opacity-50"
                      onClick={(e) => handleCompare(e, item)}
                    >
                      <i className="w-[20px] h-[20px] bg-compare bg-cover"></i>
                    </button>
                  </div>
                </div>
                <div className="pb-[12px]">
                  <p
                    className="m-0 text-[14px] text-[#333] line-clamp-2 truncate-lines-2"
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></p>
                  {/* <Link href="/" className="block mt-[6px] text-[#9747ff] font-extrabold text-[14px] leading-[1.2]">Read more about DataSnipper</Link> */}
                </div>
              </div>
            ))}
            {softworeList.length === 0 && (
              <NoFound
                title="No software found"
                message="Try searching for something else"
              />
            )}

            {totalCount > 10 && (
              <div className="mt-6">
                <Pagination
                  onChange={handleChangePage}
                  className="pagination flex justify-center mt-[24px]"
                  defaultCurrent={1}
                  total={totalCount}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {isCompareModalOpen && (
        <CompareModal close={() => toggleCompareModal()} item={currentItem} />
      )}
    </div>
  );
};

export default Category;
