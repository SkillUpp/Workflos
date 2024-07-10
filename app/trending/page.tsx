"use client";
import { useState } from "react";
import styls from "./index.module.css";
import { Select } from "antd";
import Image from "next/image";
import SoftIcon from "@/images/soft-icon.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const trendingList = [{ id: 1 }, { id: 1 }, { id: 1 }];

const Trending = () => {
  const route = useRouter();

  const handleJump = (path: string) => {
    route.push(path);
  }
  return (
    <div className={styls.trending}>
      <div className={styls.trending__content}>
        <h3 className={styls.title}>Trending</h3>
        <div className={styls.main}>
          <div className={styls.list}>
            {trendingList &&
              trendingList.map((item) => (
                <div className={styls.item} key={item.id} onClick={()=> handleJump("/detail")}>
                  <div className={styls.top}>
                    <div className={styls.left}>
                      <Image src={SoftIcon} alt="" width={77} height={77} />

                      <div className={styls.info}>
                        <div className={styls.title_wrap}>
                          <span className={styls.text}>
                            616 software options
                          </span>
                          {/* <i className={styls.share_icon}></i> */}
                        </div>
                        <p className={styls.desc}>
                          Improve the speed and quality of your audit
                        </p>
                      </div>
                    </div>
                    <div className={styls.right}>
                      <span className={styls.active}>NO.1</span>
                    </div>
                  </div>
                  <div className={styls.content}>
                    <p className={styls.desc}>
                      DataSnipper is an intelligent Automation Platform created
                      for Audit and Finance teams
                    </p>
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
