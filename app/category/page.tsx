"use client";
import { useState } from "react";
import styls from "./index.module.css";
import { Select } from "antd";
import Image from "next/image";
import SoftIcon from "@/images/soft-icon.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const tabs = [
  { id: 1, title: "Allapps", active: true },
  { id: 2, title: "Leaders", active: false },
  { id: 3, title: "Guide", active: false },
];

const Category = () => {
  const route = useRouter();
  const [categoryTabs, setCategoryTabs] = useState(tabs);

  const handleTabClick = (id: number) => {
    setCategoryTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        active: tab.id === id,
      }))
    );
  };

  const handleJumpCompare = () => {
    route.push("/compare");
  };
  return (
    <div className={styls.category}>
      <div className={styls.category__content}>
        <h3 className={styls.title}>Accounting Software</h3>
        <div className={styls.category__tabs}>
          {categoryTabs.map((item) => (
            <div
              key={item.id}
              className={`${styls.category__item} ${
                item.active && styls.active
              }`}
              onClick={() => handleTabClick(item.id)}
            >
              {item.title}
            </div>
          ))}
        </div>

        <div className={styls.main}>
          <div className={styls.fillter}>
            <p className={styls.content}>616 software options</p>
            <div className={styls.sort_wrap}>
              <span className={styls.label}>Sort by</span>
              <Select defaultValue={"1"}>
                <Select.Option value="1">Sponsored</Select.Option>
              </Select>
            </div>
          </div>

          <div className={styls.search}>
            <div className={styls.left}>
              <i className={styls.icon}></i>
              <span className={styls.text}>Personalize your search</span>
            </div>
            <div className={styls.right}>
              <Select defaultValue={"1"}>
                <Select.Option value="1">Any industry</Select.Option>
              </Select>
              <Select defaultValue={"1"}>
                <Select.Option value="1">Any business size</Select.Option>
              </Select>
            </div>
          </div>

          <div className={styls.list}>
            <div className={styls.item}>
              <div className={styls.top}>
                <div className={styls.left}>
                  <Image src={SoftIcon} alt="" width={77} height={77} />

                  <div className={styls.info}>
                    <div className={styls.title_wrap}>
                      <span className={styls.text}>616 software options</span>
                      <i className={styls.share_icon}></i>
                    </div>
                    <p className={styls.desc}>
                      Improve the speed and quality of your audit
                    </p>
                  </div>
                </div>
                <div className={styls.right}>
                  <button
                    className={styls.btn}
                    onClick={() => handleJumpCompare()}
                  >
                    <i className={styls.compare}></i>
                    <span>Compare</span>
                  </button>

                  <button className={styls.btn}>
                    <span>VISIT WEBSITE</span>
                    <i className={styls.share}></i>
                  </button>
                </div>
              </div>
              <div className={styls.content}>
                <p className={styls.desc}>
                  DataSnipper is an intelligent Automation Platform created for
                  Audit and Finance teams
                </p>
                <Link href={"/"} className={styls.more}>
                  Read more about DataSnipper
                </Link>
              </div>
              <div className={styls.bottom}>
                <div className={styls.left}>
                  <i className={styls.user}></i>
                  <span>Users also considered</span>
                </div>
                <div className={styls.right}>
                  <i className={styls.arrow}></i>
                </div>
              </div>
            </div>

            <div className={styls.item}>
              <div className={styls.top}>
                <div className={styls.left}>
                  <Image src={SoftIcon} alt="" width={77} height={77} />

                  <div className={styls.info}>
                    <div className={styls.title_wrap}>
                      <span className={styls.text}>616 software options</span>
                      <i className={styls.share_icon}></i>
                    </div>
                    <p className={styls.desc}>
                      Improve the speed and quality of your audit
                    </p>
                  </div>
                </div>
                <div className={styls.right}>
                  <button
                    className={styls.btn}
                    onClick={() => handleJumpCompare()}
                  >
                    <i className={styls.compare}></i>
                    <span>Compare</span>
                  </button>

                  <button className={styls.btn}>
                    <span>VISIT WEBSITE</span>
                    <i className={styls.share}></i>
                  </button>
                </div>
              </div>
              <div className={styls.content}>
                <p className={styls.desc}>
                  DataSnipper is an intelligent Automation Platform created for
                  Audit and Finance teams
                </p>
                <Link href={"/"} className={styls.more}>
                  Read more about DataSnipper
                </Link>
              </div>
              <div className={styls.bottom}>
                <div className={styls.left}>
                  <i className={styls.user}></i>
                  <span>Users also considered</span>
                </div>
                <div className={styls.right}>
                  <i className={styls.arrow}></i>
                </div>
              </div>
            </div>

            <div className={styls.item}>
              <div className={styls.top}>
                <div className={styls.left}>
                  <Image src={SoftIcon} alt="" width={77} height={77} />

                  <div className={styls.info}>
                    <div className={styls.title_wrap}>
                      <span className={styls.text}>616 software options</span>
                      <i className={styls.share_icon}></i>
                    </div>
                    <p className={styls.desc}>
                      Improve the speed and quality of your audit
                    </p>
                  </div>
                </div>
                <div className={styls.right}>
                  <button
                    className={styls.btn}
                    onClick={() => handleJumpCompare()}
                  >
                    <i className={styls.compare}></i>
                    <span>Compare</span>
                  </button>

                  <button className={styls.btn}>
                    <span>VISIT WEBSITE</span>
                    <i className={styls.share}></i>
                  </button>
                </div>
              </div>
              <div className={styls.content}>
                <p className={styls.desc}>
                  DataSnipper is an intelligent Automation Platform created for
                  Audit and Finance teams
                </p>
                <Link href={"/"} className={styls.more}>
                  Read more about DataSnipper
                </Link>
              </div>
              <div className={styls.bottom}>
                <div className={styls.left}>
                  <i className={styls.user}></i>
                  <span>Users also considered</span>
                </div>
                <div className={styls.right}>
                  <i className={styls.arrow}></i>
                </div>
              </div>
            </div>

            <div className={styls.item}>
              <div className={styls.top}>
                <div className={styls.left}>
                  <Image src={SoftIcon} alt="" width={77} height={77} />

                  <div className={styls.info}>
                    <div className={styls.title_wrap}>
                      <span className={styls.text}>616 software options</span>
                      <i className={styls.share_icon}></i>
                    </div>
                    <p className={styls.desc}>
                      Improve the speed and quality of your audit
                    </p>
                  </div>
                </div>
                <div className={styls.right}>
                  <button
                    className={styls.btn}
                    onClick={() => handleJumpCompare()}
                  >
                    <i className={styls.compare}></i>
                    <span>Compare</span>
                  </button>

                  <button className={styls.btn}>
                    <span>VISIT WEBSITE</span>
                    <i className={styls.share}></i>
                  </button>
                </div>
              </div>
              <div className={styls.content}>
                <p className={styls.desc}>
                  DataSnipper is an intelligent Automation Platform created for
                  Audit and Finance teams
                </p>
                <Link href={"/"} className={styls.more}>
                  Read more about DataSnipper
                </Link>
              </div>
              <div className={styls.bottom}>
                <div className={styls.left}>
                  <i className={styls.user}></i>
                  <span>Users also considered</span>
                </div>
                <div className={styls.right}>
                  <i className={styls.arrow}></i>
                </div>
              </div>
            </div>

            <div className={styls.item}>
              <div className={styls.top}>
                <div className={styls.left}>
                  <Image src={SoftIcon} alt="" width={77} height={77} />

                  <div className={styls.info}>
                    <div className={styls.title_wrap}>
                      <span className={styls.text}>616 software options</span>
                      <i className={styls.share_icon}></i>
                    </div>
                    <p className={styls.desc}>
                      Improve the speed and quality of your audit
                    </p>
                  </div>
                </div>
                <div className={styls.right}>
                  <button
                    className={styls.btn}
                    onClick={() => handleJumpCompare()}
                  >
                    <i className={styls.compare}></i>
                    <span>Compare</span>
                  </button>

                  <button className={styls.btn}>
                    <span>VISIT WEBSITE</span>
                    <i className={styls.share}></i>
                  </button>
                </div>
              </div>
              <div className={styls.content}>
                <p className={styls.desc}>
                  DataSnipper is an intelligent Automation Platform created for
                  Audit and Finance teams
                </p>
                <Link href={"/"} className={styls.more}>
                  Read more about DataSnipper
                </Link>
              </div>
              <div className={styls.bottom}>
                <div className={styls.left}>
                  <i className={styls.user}></i>
                  <span>Users also considered</span>
                </div>
                <div className={styls.right}>
                  <i className={styls.arrow}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
