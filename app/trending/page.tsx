"use client";
import { useEffect, useState } from "react";
import styls from "./index.module.css";
import { Pagination, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categoryList, productList } from "@/api/product";
import { productEnumList } from "@/utils/enum";
import LoadingContext from "@/components/LoadingContext";
import NoFound from "@/components/NoFound";

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
      limit: 10,
      page: page || 1,
      sortby: "rateAvg",
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
        <div className="pt-[13px] pb-[64px] px-[24px] lg:px-[56px] 2xl:px-[200px] bg-[#f0f0f0]">
          <h3 className="text-[42px] font-bold text-black mt-[24px]">
            Trending
          </h3>
          <div className="flex flex-col min-h-[300px]">
            {softworeList.map((item: any, index: number) => (
              <div
                className="relative mt-[24px] p-[12px_12px_0_12px] bg-white rounded-[12px] transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-[1.02]"
                key={item.name}
                onClick={() => handleJump(`/product/${item.name}`)}
              >
                <div className="flex justify-between pb-[12px] mb-[12px] border-b border-[rgba(151,71,255,0.3)]">
                  <div className="flex">
                    <div className="w-[42px] h-[42px] md:w-[76px] md:h-[76px] rounded-8">
                      {item.photo && (
                        <div className="w-[40px] h-[40px] md:w-[77px] md:h-[77px] rounded-8 object-fill">
                          <Image
                            src={item.photo}
                            alt=""
                            width={77}
                            height={77}
                            className="w-full h-full rounded-8 object-fill"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://aitracker.ai/empty.jpeg";
                            }}
                          />
                        </div>
                      )}
                      {!item.photo && (
                        <div className="w-[40px] h-[40px] md:w-[77px] md:h-[77px] rounded-8 object-fill">
                          <Image
                            src="https://aitracker.ai/empty.jpeg"
                            alt=""
                            width={77}
                            height={77}
                            className="w-full h-full rounded-8 object-fill"
                          />
                        </div>
                      )}
                    </div>
                    <div className="pl-[12px]">
                      <div className="flex items-center">
                        <span className="w-[calc(100% - 70px)] lg:max-w-[800px] text-[16px] md:text-[24px] font-bold text-[#9747ff] truncate-lines-1 ">
                          {item.name}
                        </span>
                      </div>
                      <p
                        className="mt-[6px] text-[14px] md:text-[16px] leading-[1.2] text-black truncate-lines-2"
                        dangerouslySetInnerHTML={{ __html: item?.introduce }}
                      ></p>
                    </div>
                  </div>
                  <div className="flex text-[24px] md:text-[30px] text-[#9747ff] font-semibold">
                    No.{index + 1}
                  </div>
                </div>
                <div className="pb-[12px]">
                  <p
                    className="m-0 text-[14px] line-clamp-2 truncate-lines-2 text-[#333]"
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
    </div>
  );
};

export default Category;
