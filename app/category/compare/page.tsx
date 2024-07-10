"use client";
import Image from "next/image";
import styls from "./index.module.css";
import Google from "@/images/google.svg";
import Link from "next/link";
import Ins from "@/images/ins.svg";
import x from "@/images/x.svg";
import message from "@/images/message.svg";
import twitter from "@/images/twitter.svg";
import { MouseEvent, useEffect, useState } from "react";
import { Select } from "antd";

const mediaList = [
  { id: 1, img: Ins },
  { id: 2, img: x },
  { id: 3, img: message },
  { id: 4, img: twitter },
];

const defaultCompareMenu = [
  {
    id: 1,
    htmlId: "overview",
    name: "Overview",
    active: true,
  },
  // {
  //   id: 2,
  //   name: "Screenshots",
  //   htmlId: "screenshots",
  //   active: false,
  // },
  {
    id: 3,
    name: "Pricing",
    htmlId: "pricing",
    active: false,
  },
  {
    id: 4,
    name: "Key features",
    htmlId: "features",
    active: false,
  },
  {
    id: 5,
    name: "Integrations",
    htmlId: "integrations",
    active: false,
  },
  // {
  //   id: 6,
  //   name: "Alternatives",
  //   htmlId: "alternatives",
  //   active: false,
  // },
];

const companyList = [
  { id: 1, img: Google, name: "Google" },
  { id: 2, img: Google, name: "Google" },
  { id: 3, img: Google, name: "Google" },
];

const overviewList = [{ id: 1 }, { id: 2 }, { id: 3 }];

const Compare = () => {
  const [compareMenu, setCompareMenu] = useState(defaultCompareMenu);
  const handleClick = (id: string) => {
    console.log(id);
    
    const el = document.getElementById(id);
    el && el.scrollIntoView({ behavior: "smooth" });
    const menus = JSON.parse(JSON.stringify(compareMenu));
    menus.forEach((item: { active: boolean; htmlId: string }) => {
      item.active = false;
      if (item.htmlId == id) {
        item.active = true;
      }
    });
    setCompareMenu(menus);
  };

  return (
    <div className={styls.compare}>
      <div className={styls.header}>
        <h3 className={styls.title}>Compare</h3>
        <div className={styls.list}>
          {companyList.map((item) => (
            <div
              className={`${styls.item} ${
                companyList.length == 2 ? styls.two : styls.three
              }`}
              key={item.id}
            >
              <Image src={item.img} alt="" width={140} height={42} />
              <button className={styls.btn}>LEARN MORE</button>
            </div>
          ))}
        </div>
      </div>
      <div className={styls.content}>
        <div className={styls.left}>
          <div className={styls.menu_list}>
            {compareMenu.map((item) => (
              <div
                className={`${styls.menu_item} ${item.active && styls.active}`}
                key={item.id}
                onClick={() => handleClick(item.htmlId)}
              >
                <span className={styls.text}>{item.name}</span>
              </div>
            ))}
          </div>
          <div className={styls.select_wrap}>
            <Select defaultValue={"overview"} onChange={handleClick}>
              {compareMenu.map((item) => (
                <Select.Option value={item.htmlId} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className={styls.right}>
          <div className={styls.wrap} id="overview">
            <h3 className={styls.title}>Overview</h3>
            <div className={styls.list}>
              {overviewList.map((item) => (
                <div
                  className={`${styls.item} ${
                    overviewList.length == 2 ? styls.two : styls.three
                  }`}
                  key={item.id}
                >
                  <p className={styls.desc}>
                    Full Slate is a cloud based appointment scheduling software
                  </p>
                  <div className={styls.box}>
                    <h3 className={styls.title}>Platforms supported</h3>
                    <ul className={styls.box_list}>
                      <li className={styls.box_item}>
                        <span>Web-based</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={styls.box_item}>
                        <span>iPhone app</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={styls.box_item}>
                        <span>Android app</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item} ${styls.nocheck}`}>
                        <span>Windows Phone app</span>
                        <i className={styls.icon}></i>
                      </li>
                    </ul>
                  </div>
                  <div className={styls.box}>
                    <h3 className={styls.title}>Typical customers</h3>
                    <ul className={styls.box_list}>
                      <li className={styls.box_item}>
                        <span>Freelancers</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={styls.box_item}>
                        <span>Small businesses</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={styls.box_item}>
                        <span>Mid size businesses</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item} ${styls.nocheck}`}>
                        <span>Large enterprises</span>
                        <i className={styls.icon}></i>
                      </li>
                    </ul>
                  </div>

                  <div className={styls.box}>
                    <h3 className={styls.title}>Customer support</h3>
                    <ul className={styls.box_list}>
                      <li className={styls.box_item}>
                        <span>Phone</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={styls.box_item}>
                        <span>Online</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={styls.box_item}>
                        <span>Knowledge base</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item} ${styls.nocheck}`}>
                        <span>Video tutorials</span>
                        <i className={styls.icon}></i>
                      </li>
                    </ul>
                  </div>

                  <button className={styls.btn}>VIEW MORE DETAILS</button>
                </div>
              ))}
            </div>
          </div>

          <div className={styls.wrap} id="pricing">
            <h3 className={styls.title}>Pricing</h3>
            <div className={styls.list}>
              {overviewList.map((item) => (
                <div
                  className={`${styls.item} ${
                    overviewList.length == 2 ? styls.two : styls.three
                  }`}
                  key={item.id}
                >
                  <div className={styls.pricing_top}>
                    <h4 className={styls.name}>Starting from</h4>
                    <p className={styls.price}>39.95</p>
                    <p className={styls.text}>per month</p>
                  </div>
                  <div className={styls.box}>
                    <ul className={styls.box_list}>
                      <li className={`${styls.box_item} ${styls.nocheck}`}>
                        <span>Free trial available</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item} ${styls.nocheck}`}>
                        <span>Free account</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={styls.box_item}>
                        <span>Mid size businesses</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item}`}>
                        <span>Subscription based</span>
                        <i className={styls.icon}></i>
                      </li>
                    </ul>
                  </div>
                  <button className={styls.btn}>VIEW MORE DETAILS</button>
                </div>
              ))}
            </div>
          </div>

          <div className={styls.wrap} id="features">
            <h3 className={styls.title}>Key features</h3>
            <div className={styls.list}>
              {overviewList.map((item) => (
                <div
                  className={`${styls.item} ${
                    overviewList.length == 2 ? styls.two : styls.three
                  }`}
                  key={item.id}
                >
                  <div className={styls.box}>
                    <ul className={styls.box_list}>
                      <li className={`${styls.box_item}`}>
                        <span>Total features</span>
                        <span>19</span>
                      </li>
                      <li className={`${styls.box_item} ${styls.nocheck}`}>
                        <span>API</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item} ${styls.nocheck}`}>
                        <span>Activity Tracking</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={styls.box_item}>
                        <span>Alerts/Notifications</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item}`}>
                        <span>Calendar Management</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item}`}>
                        <span>Class Scheduling</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item}`}>
                        <span>Drag & Drop</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item}`}>
                        <span>Reminders</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item}`}>
                        <span>Self Service Portal</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item}`}>
                        <span>Third-Party Integrations</span>
                        <i className={styls.icon}></i>
                      </li>
                    </ul>
                  </div>
                  <button className={styls.btn}>VIEW MORE DETAILS</button>
                </div>
              ))}
            </div>
          </div>

          <div className={styls.wrap} id="integrations">
            <h3 className={styls.title}>Integrations</h3>
            <div className={styls.list}>
              {overviewList.map((item) => (
                <div
                  className={`${styls.item} ${
                    overviewList.length == 2 ? styls.two : styls.three
                  }`}
                  key={item.id}
                >
                  <div className={styls.box}>
                    <ul className={styls.box_list}>
                      <li className={`${styls.box_item}`}>
                        <span>Total features</span>
                        <span>19</span>
                      </li>
                      <li className={`${styls.box_item} ${styls.nocheck}`}>
                        <span>API</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item} ${styls.nocheck}`}>
                        <span>Activity Tracking</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={styls.box_item}>
                        <span>Alerts/Notifications</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item}`}>
                        <span>Calendar Management</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item}`}>
                        <span>Class Scheduling</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item}`}>
                        <span>Drag & Drop</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item}`}>
                        <span>Reminders</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item}`}>
                        <span>Self Service Portal</span>
                        <i className={styls.icon}></i>
                      </li>
                      <li className={`${styls.box_item}`}>
                        <span>Third-Party Integrations</span>
                        <i className={styls.icon}></i>
                      </li>
                    </ul>
                  </div>
                  <button className={styls.btn}>VIEW MORE DETAILS</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
