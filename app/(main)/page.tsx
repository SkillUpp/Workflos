"use client";
import Link from "next/link";
import styls from "./index.module.css";
import { useState, useEffect } from "react";
import { Select } from "antd";
import SoftworeList from "@/components/SoftworeList";
import { useRouter } from "next/navigation";
import { productEnumList, sortOfRateEnumList } from "@/utils/enum";
import LoadingContext from "../../components/LoadingContext/index";
import { productList } from "@/api/product";

export default function Home() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentCategory, setCurrentCategory] = useState("CRM");
  const [currentSort, setCurrentSort] = useState("HighestRated");
  const [softworeTab, setSoftworeTab] = useState(sortOfRateEnumList);
  const [softworeList, setSoftworeList] = useState([]);

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
   * 获取产品列表
   */
  const getSoftworeList = async () => {
    const params = {
      keyword: searchValue,
      category: currentCategory,
      sortBy: currentSort,
      limit: 16,
      page: 1,
    };
    try {
      setLoading(true);
      const res = await productList(params);
      if (res.data) {
        setLoading(false);
        setSoftworeList(res.data.list);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSoftworeList();
  }, []);

  return (
    <div className={styls.main}>
      <div className={styls.searchPanel}>
        <div className={styls.searchPanel__input}>
          <div className={styls.search__content}>
            <h3 className={styls.title}>
              Where business leaders find software
            </h3>
            <div className={styls.input_wrap}>
              <input
                type="text"
                placeholder="Search apps, categories..."
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <i className={styls.search} onClick={() => getSoftworeList()}></i>
            </div>
          </div>

          <div className={styls.button__content}>
            <h3 className={styls.title}>
              Explore software categories customers love
            </h3>
            <div className={styls.button_wrap}>
              <Select
                defaultValue={currentCategory}
                onChange={(value) => {
                  setCurrentCategory(value);
                  getSoftworeList();
                }}
              >
                {productEnumList.map((item) => (
                  <Select.Option value={item.value}>{item.name}</Select.Option>
                ))}
              </Select>
              <i className={styls.arrow}></i>
            </div>
          </div>
        </div>
        <div className={styls.searchPanel__bg}>
          <div className={styls.product_info}>
            <h3 className={styls.title}>37K+</h3>
            <p className={styls.desc}>Software profiles</p>
          </div>
        </div>
      </div>

      <div className={styls.softwore}>
        <div className={styls.header}>
          <ul className={styls.softwore_list}>
            {softworeTab.map((item) => (
              <li
                className={`${styls.softwore_list_item} 
                ${item.value == currentSort && styls.active}`}
                key={item.id}
                onClick={() => handleChangeSoftwore(item.id, item.value)}
              >
                {item.name}
              </li>
            ))}
          </ul>
          <div className={styls.select_wrap}>
            <Select defaultValue={1}>
              {softworeTab.map((item) => (
                <Select.Option value={item.id}>{item.name}</Select.Option>
              ))}
            </Select>
          </div>
        </div>

        <div className={styls.content}>
          {loading && <LoadingContext />}
          <SoftworeList list={softworeList} />
          {softworeList.length > 10 && (
            <div className={styls.more} onClick={() => handleJump("/category")}>
              See all CRM Software
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
