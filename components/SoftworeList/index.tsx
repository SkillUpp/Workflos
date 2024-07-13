"use client";
import Image from "next/image";
import SIcon from "@/images/s1.png";
import styls from "./index.module.css";
import { useRouter } from "next/navigation";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from "react";

const SoftworeList = (props: any) => {
  const { list } = props;
  const route = useRouter();

  const handleJump = (path: string) => {
    route.push(path);
  };
  return (
    <div className={styls.list}>
      {list && list.map((item: any, index: number) => (
        <div
          className={styls.list_item}
          key={index}
          onClick={() => handleJump("/detail")}
        >
          <div className={styls.left}>
            <Image src={item.icon} alt="" width={36} height={36} />
          </div>
          <div className={styls.right}>
            <h3 className={styls.title}>{item.name}</h3>
            <p className={styls.desc}>{item.description}</p>
          </div>
        </div>
      ))}
      {list.length == 0 && (
        <div className={styls.noData}>
          <p className={styls.title}>No Data</p>
        </div>
      )}
    </div>
  );
};

export default SoftworeList;
