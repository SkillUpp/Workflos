"use client";
import Image from "next/image";
import styls from "./index.module.css";
import Google from "@/images/google.svg";
import Ins from "@/images/ins.svg";
import x from "@/images/x.svg";
import message from "@/images/message.svg";
import twitter from "@/images/twitter.svg";
import { useEffect, useState } from "react";
import { Rate, Select } from "antd";
import { productDetail } from "@/api/product";
import LoadingContext from "@/components/LoadingContext";

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
    name: "Reviews",
    htmlId: "reviews",
    active: false,
  },
  // {
  //   id: 5,
  //   name: "Integrations",
  //   htmlId: "integrations",
  //   active: false,
  // },
];

const companyList = [
  { id: 1, img: Google, name: "Google" },
  { id: 2, img: Google, name: "Google" },
  { id: 3, img: Google, name: "Google" },
];

const Compare = (props: any) => {
  const { id } = props;
  const [loading, setLoading] = useState(false);
  const [compareData, setCompareData] = useState<any>([]);
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

  const getProductDetail = async (id: string) => {
    try {
      const res = await productDetail();
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        const ids = encodeURI(id).split("%2526");
        setLoading(true);

        const results = await Promise.all(
          ids.map((item) => getProductDetail(item))
        );
        setCompareData((prevData: any) => [
          ...prevData,
          ...results.filter(Boolean),
        ]);
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, []);
  return (
    <div className={styls.compare}>
      {loading && <LoadingContext />}
      <div className={styls.header}>
        <h3 className={styls.title}>Compare</h3>
        <div className={styls.list}>
          {compareData &&
            compareData.map((item) => (
              <div
                className={`${styls.item} ${
                  compareData.length == 2 ? styls.two : styls.three
                }`}
                key={item.name}
              >
                <div className={styls.logo_info}>
                  <Image src={item.photo} alt="" width={40} height={40} />
                  <span className={styls.name}>{item.name}</span>
                </div>
                {/* <button className={styls.btn}>LEARN MORE</button> */}
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
              {compareData &&
                compareData.map((item: any) => (
                  <div
                    className={`${styls.item} ${
                      compareData.length == 2 ? styls.two : styls.three
                    }`}
                    key={item.name}
                  >
                    <h3 className={styls.title}>App Info</h3>
                    <p className={styls.desc}>{item?.description}</p>

                    <div className={styls.box}>
                      <h3 className={styls.title}>Platforms supported</h3>
                      <ul className={styls.box_list}>
                        {item?.platformsSupported &&
                          item.platformsSupported.map((val: string) => (
                            <li className={styls.box_item} key={val}>
                              <span>{val}</span>
                              <i className={styls.icon}></i>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className={styls.box}>
                      <h3 className={styls.title}>Typical customers</h3>
                      <ul className={styls.box_list}>
                        {item?.typicalCustomers &&
                          item.typicalCustomers.map((val: string) => (
                            <li className={styls.box_item} key={val}>
                              <span>{val}</span>
                              <i className={styls.icon}></i>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className={styls.box}>
                      <h3 className={styls.title}>Customer support</h3>
                      <ul className={styls.box_list}>
                        {item?.supportOptions &&
                          item.supportOptions.map((val: string) => (
                            <li className={styls.box_item} key={val}>
                              <span>{val}</span>
                              <i className={styls.icon}></i>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.keyBenefits,
                      }}
                    ></div>

                    {/* <button className={styls.btn}>VIEW MORE DETAILS</button> */}
                  </div>
                ))}
            </div>
          </div>

          <div className={styls.wrap} id="pricing">
            <h3 className={styls.title}>Pricing</h3>
            <div className={styls.list}>
              {compareData.map((item: any) => (
                <div
                  className={`${styls.item} ${
                    compareData.length == 2 ? styls.two : styls.three
                  }`}
                  key={item.name}
                >
                  <div className={styls.pricing_top}>
                    <h4 className={styls.name}>Starting from</h4>
                    <p className={styls.price}>{item?.price / 100}</p>
                    <p className={styls.text}>per month</p>
                  </div>
                  <div className={styls.box}>
                    <ul className={styls.box_list}>
                      {item?.priceOption &&
                        item.priceOption.map((val: string) => (
                          <li className={styls.box_item} key={val}>
                            <span>{val}</span>
                            <i className={styls.icon}></i>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div
                    style={{ paddingTop: "16px" }}
                    dangerouslySetInnerHTML={{
                      __html: item?.priceDetail,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          <div className={styls.wrap} id="features">
            <h3 className={styls.title}>Key features</h3>
            <div className={styls.list}>
              {compareData.map((item) => (
                <div
                  className={`${styls.item} ${
                    compareData.length == 2 ? styls.two : styls.three
                  }`}
                  key={item.name}
                >
                  <div className={styls.box}>
                    <ul className={styls.box_list}>
                      <li className={`${styls.box_item}`}>
                        <span>Total features</span>
                        <span>{item?.totalFeature}</span>
                      </li>

                      {item?.supportFeatures &&
                        item.supportFeatures.map((val: string) => (
                          <li className={styls.box_item} key={val}>
                            <span>{val}</span>
                            <i className={styls.icon}></i>
                          </li>
                        ))}

                      {item?.supportCommonFeatures &&
                        item.supportCommonFeatures.map((item: string) => (
                          <li className={styls.box_item} key={item}>
                            <span>{item}</span>
                            <i className={styls.icon}></i>
                          </li>
                        ))}
                      {item?.unsupportCommonFeatures &&
                        item.unsupportCommonFeatures.map((val: string) => (
                          <li
                            className={`${styls.box_item} ${styls.nocheck}`}
                            key={val}
                          >
                            <span>{val}</span>
                            <i className={styls.icon}></i>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {/* <button className={styls.btn}>VIEW MORE DETAILS</button> */}
                </div>
              ))}
            </div>
          </div>

          <div className={styls.wrap} id="reviews">
            <h3 className={styls.title}>Reviews</h3>
            <div className={styls.list}>
              {compareData.map((item: any) => (
                <div
                  className={`${styls.item} ${
                    compareData.length == 2 ? styls.two : styls.three
                  }`}
                  key={item.name}
                >
                  <div className={styls.box}>
                    <h3 className={styls.title}>Rating criteria</h3>
                    <ul className={styls.box_list}>
                      <li className={styls.box_item}>
                        <span>Value for money</span>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Rate value={item?.valueForMoney / 10} disabled />(
                          {item?.valueForMoney / 10})
                        </div>
                      </li>

                      <li className={styls.box_item}>
                        <span>Ease of use</span>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Rate value={item?.easeOfUse / 10} disabled />(
                          {item?.easeOfUse / 10})
                        </div>
                      </li>
                      <li className={styls.box_item}>
                        <span>Features</span>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Rate value={item?.features / 10} disabled />(
                          {item?.features / 10})
                        </div>
                      </li>
                      <li className={styls.box_item}>
                        <span>Customer support</span>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Rate value={item?.customerSupport / 10} disabled />(
                          {item?.customerSupport / 10})
                        </div>
                      </li>
                    </ul>
                  </div>
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
