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
import NoData from "../Nodata";

const SoftworeList = (props: any) => {
  const { list } = props;
  const route = useRouter();

  const handleJump = (path: string) => {
    route.push(path);
  };
  return (
    <div className={styls.list}>
      {list &&
        list.map((item: any, index: number) => (
          <div
            className={styls.list_item}
            key={item.name}
            onClick={() => handleJump(`product/${item.name}`)}
          >
            <div className={styls.left}>
              <Image src={item.photo} alt="" width={36} height={36} />
            </div>
            <div className={styls.right}>
              <h3 className={styls.title}>{item.name}</h3>
              <p className={styls.desc}>{item.description}</p>
            </div>
          </div>
        ))}
      <div
        className={`${styls.list_item} ${styls.hidden}`}
      ></div>
      {list.length == 0 && (
        <NoData />
      )}
    </div>
  );
};

export default SoftworeList;
