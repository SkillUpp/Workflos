"use client";
import { useEffect, useState } from "react";
import styls from "./index.module.css";
import { Select } from "antd";
import Image from "next/image";
import SoftIcon from "@/images/soft-icon.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { productList } from "@/api/product";
import LoadingContext from "@/components/LoadingContext";

const Trending = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [softworeList, setSoftworeList] = useState([]);
  const handleJump = (path: string) => {
    route.push(path);
  };

  /**
   * 获取产品列表
   */
  const getSoftworeList = async () => {
    const params = {
      category: "CRM",
      sortBy: "HighestRated",
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
    <div className={styls.trending}>
      <div className={styls.trending__content}>
        <h3 className={styls.title}>Trending</h3>
        <div className={styls.main}>
          <div className={styls.list}>
            {loading && <LoadingContext />}
            {softworeList &&
              softworeList.map((item: any, index: number) => (
                <div
                  className={styls.item}
                  key={item.name}
                  onClick={() => handleJump("/detail")}
                >
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
                      <span className={styls.active}>NO.{index + 1}</span>
                    </div>
                  </div>
                  <div className={styls.content}>
                    <p className={styls.desc}>{item.description}</p>
                    <Link href={"/"} className={styls.more}>
                      Read more about DataSnipper
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
