"use client";
import Link from "next/link";
import styls from "./index.module.css";
import { useState } from "react";
import { Select } from "antd";
import SoftworeList from "@/components/SoftworeList";
import { useRouter } from "next/navigation";

const defaultSoftworeTab = [
  {
    id: 1,
    name: "Highest rated",
  },
  {
    id: 2,
    name: "Category leaders",
  },
  {
    id: 3,
    name: "Ease of use",
  },
  {
    id: 4,
    name: "Value for money",
  },
];

export default function Home() {
  const route = useRouter();
  const [softworeValue, setSoftworeValue] = useState(1);
  const [softworeTab, setSoftworeTab] = useState(defaultSoftworeTab);

  const handleJump = (path: string) => {
    route.push(path);
  };

  return (
    <div className={styls.main}>
      <div className={styls.searchPanel}>
        <div className={styls.searchPanel__input}>
          <div className={styls.search__content}>
            <h3 className={styls.title}>
              Where business leaders find software
            </h3>
            <div className={styls.input_wrap}>
              <input type="text" placeholder="Search apps, categories..." />
              <i className={styls.search}></i>
            </div>
          </div>

          <div className={styls.button__content}>
            <h3 className={styls.title}>
              Explore software categories customers love
            </h3>
            <div className={styls.button_wrap}>
              <Select defaultValue={"1"}>
                <Select.Option value="1">CRM Software</Select.Option>
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
                ${item.id == softworeValue && styls.active}`}
                key={item.id}
                onClick={() => setSoftworeValue(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
          <div className={styls.select_wrap}>
            <Select defaultValue={1}>
              {defaultSoftworeTab.map((item) => (
                <Select.Option value={item.id}>{item.name}</Select.Option>
              ))}
            </Select>
          </div>
        </div>

        <div className={styls.content}>
          <SoftworeList />

          <div className={styls.more} onClick={() => handleJump("/category")}>
            See all CRM Software
          </div>
        </div>
      </div>
    </div>
  );
}
