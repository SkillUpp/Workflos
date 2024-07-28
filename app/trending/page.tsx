"use client";
import { useEffect, useState } from "react";
import styls from "./index.module.css";
import { Pagination, Select } from "antd";
import Image from "next/image";
import SoftIcon from "@/images/soft-icon.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { productList } from "@/api/product";
import LoadingContext from "@/components/LoadingContext";
import NoData from "@/components/Nodata";

const Trending = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [softworeList, setSoftworeList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const handleJump = (path: string) => {
    route.push(path);
  };

  /**
   * 获取产品列表
   */
  const getSoftworeList = async (page: number) => {
    const params = {
      limit: 10,
      page: page,
      sortby: "rateAvg"
    };
    try {
      setLoading(true);
      const res = await productList(params);
      if (res.data) {
        const list = res.data.list;
        setLoading(false);
        setTotalCount(res.data.totalCount);
        list.forEach(item => {
          item.introduce = item.introduce.replace(/\\u0026/g, '&');
        })
        setSoftworeList(list);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChangePage = (page: number) => {
    getSoftworeList(page);
    setPage(page)
  };
  useEffect(() => {
    getSoftworeList(1);
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
                  onClick={() => handleJump("/product/" + item.name)}
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
    </div>
  );
};

export default Trending;
