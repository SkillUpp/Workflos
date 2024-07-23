"use client";
import { useEffect, useState } from "react";
import styls from "./index.module.css";
import { Pagination, Select } from "antd";
import Image from "next/image";
import SoftIcon from "@/images/soft-icon.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CompareModal from "./CompareModal";
import { productList } from "@/api/product";
import { productEnumList } from "@/utils/enum";
import LoadingContext from "@/components/LoadingContext";
import NoData from "@/components/Nodata";

const tabs = [
  { id: 1, title: "Allapps", value: "HighestRated", active: true },
  { id: 2, title: "Leaders", value: "CategoryLeaders", active: false },
  { id: 3, title: "Guide", value: "EaseOfUse", active: false },
];

const Category = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [categoryTabs, setCategoryTabs] = useState(tabs);
  const [currentCategory, setCurrentCategory] = useState("CRM");
  const [currentSort, setCurrentSort] = useState("HighestRated");
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [softworeList, setSoftworeList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentItem, setCurrentItem] = useState<any>({});

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
      // category: category || currentCategory,
      sortBy: currentSort,
      limit: 10,
      page: page || 1,
    };
    try {
      setLoading(true);
      const res = await productList(params);
      if (res.data) {
        setLoading(false);
        setTotalCount(res.data.totalCount);
        setSoftworeList(res.data.list);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChangePage = (page: number) => {
    getSoftworeList("", page);
  };

  const handleCompare = (item: any) => {
    setCurrentItem(item);
    // toggleCompareModal();
    setIsCompareModalOpen(true);
  };

  useEffect(() => {
    getSoftworeList();
  }, []);
  return (
    <div className={styls.category}>
      {loading && <LoadingContext />}
      <div className={styls.category__content}>
        <h3 className={styls.title}>Accounting Software</h3>
        <div className={styls.category__tabs}>
          {categoryTabs.map((item) => (
            <div
              key={item.id}
              className={`${styls.category__item} ${
                item.active && styls.active
              }`}
              onClick={() => handleTabClick(item.id, item.value)}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className={styls.select_wrap}>
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
        <div className={styls.main}>
          <div className={styls.fillter}>
            <p className={styls.content}>{totalCount} software options</p>
            {/* <div className={styls.sort_wrap}>
              <span className={styls.label}>Sort by</span>
              <Select defaultValue={"1"}>
                <Select.Option value="1">Sponsored</Select.Option>
              </Select>
            </div> */}
          </div>

          <div className={styls.search}>
            <div className={styls.left}>
              <i className={styls.icon}></i>
              <span className={styls.text}>Personalize your search</span>
            </div>
            <div className={styls.right}>
              <Select
                value={currentCategory}
                onChange={(val: string) => {
                  setCurrentCategory(val);
                  getSoftworeList(val);
                }}
              >
                {productEnumList.map((item) => (
                  <Select.Option value={item.value} key={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
              {/* <Select defaultValue={"1"}>
                <Select.Option value="1">Any business size</Select.Option>
              </Select> */}
            </div>
          </div>

          <div className={styls.list}>
            {softworeList.map((item: any) => (
              <div className={styls.item} key={item.name}>
                <div className={styls.top}>
                  <div className={styls.left}>
                    <Image src={item.photo} alt="" width={77} height={77} />
                    <div className={styls.info}>
                      <div className={styls.title_wrap}>
                        <span className={styls.text}>{item.name}</span>
                        {/* <i className={styls.share_icon}></i> */}
                      </div>
                      <p className={styls.desc}>{item.introduce}</p>
                    </div>
                  </div>
                  <div className={styls.right}>
                    <button
                      className={styls.btn}
                      onClick={() => handleCompare(item)}
                    >
                      <i className={styls.compare}></i>
                      <span>Compare</span>
                    </button>

                    <button
                      className={styls.btn}
                      onClick={() => handleJumpWebsite(item.website)}
                    >
                      <span>VISIT WEBSITE</span>
                      <i className={styls.share}></i>
                    </button>
                  </div>
                </div>
                <div className={styls.content}>
                  <p className={styls.desc}>{item.description}</p>
                  <Link href={"/"} className={styls.more}>
                    Read more about DataSnipper
                  </Link>
                </div>
                {/* <div className={styls.bottom}>
                 <div className={styls.left}>
                   <i className={styls.user}></i>
                   <span>Users also considered</span>
                 </div>
                 <div className={styls.right}>
                   <i className={styls.arrow}></i>
                 </div>
               </div> */}
              </div>
            ))}
            {softworeList.length === 0 && <NoData />}

            {totalCount > 10 && (
              <Pagination
                onChange={handleChangePage}
                className={styls.pagination}
                defaultCurrent={1}
                total={totalCount}
              />
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
