"use client";
import styls from "./index.module.css";
import Image from "next/image";
import Image1 from "@/images/s1.png";
import Ins from "@/images/ins.svg";
import x from "@/images/x.svg";
import Link from "next/link";
import { useState, useEffect } from "react";
import { launchDetail } from "@/api/product";
import Category from "../../category/page";
import LoadingContext from "@/components/LoadingContext";

const mediaList = [
  { id: 1, img: Ins },
  { id: 2, img: x },
];

const LaunchDetail = (props: any) => {
  const { id } = props;
  const [loading, setLoading] = useState(false);
  const [launchInfo, setLaunchInfo] = useState<any>(null);

  const getLaunchDetail = async () => {
    setLoading(true);
    const res = await launchDetail(id);
    if (res.data) {
      setLoading(false);
      setLaunchInfo(res.data);
    }
  };

  useEffect(() => {
    if (id) {
      getLaunchDetail();
    }
  }, [id]);

  return (
    <div className={styls.detail}>
      {loading && <LoadingContext />}
      <div className={styls.header}>
        <h3 className={styls.title}>{launchInfo?.title}</h3>
        <p className={styls.desc}>{launchInfo?.content}</p>

        <div className={styls.info}>
          {/* <div className={styls.left}>
            <Image src={Image1} alt="" width={50} height={50} />
            <span className={styls.name}>By Fernando Fierro</span>
            <span className={styls.time}>5 days ago</span>
          </div> */}
          <div className={styls.right}>
            {mediaList.map((item) => (
              <Link href="/" key={item.id}>
                <Image alt="" width={24} height={24} src={item.img} />
              </Link>
            ))}
          </div>
        </div>

        <div className={styls.site_info}>
          <span className={styls.site}>http://www.accessowl.io/</span>
          <span className={styls.desc}>
            {launchInfo?.category &&
              launchInfo.category.map((item: string) => <>#{item}</>)}
          </span>
        </div>
      </div>

      <div className={styls.content}>
        <p className={styls.text}>{launchInfo?.title}</p>
        <p className={`${styls.text} ${styls.index}`}>{launchInfo?.content}</p>
      </div>
    </div>
  );
};
export default LaunchDetail;
