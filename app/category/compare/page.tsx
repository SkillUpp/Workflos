"use client";
import Image from "next/image";
import styls from "./index.module.css";
import Google from "@/images/google.svg";
import { useEffect, useState } from "react";
import { Rate, Select } from "antd";
import { productDetail } from "@/api/product";
import LoadingContext from "@/components/LoadingContext";
interface IOptionItem {
  name: string;
  slug: string;
  show?: boolean
}

const defaultCompareMenu = [
  {
    id: 1,
    htmlId: "overview",
    name: "App Info",
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
    name: "Features",
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
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const targetTop = rect.top + window.pageYOffset - 100;
      const scrollToTop = Math.max(targetTop, 0);
      window.scroll({
        top: scrollToTop,
        behavior: 'smooth',
      });
      const menus = compareMenu.map((item) => ({
        ...item,
        active: item.htmlId === id,
      }));
      setCompareMenu(menus);
    }
  };

  const getProductDetail = async (id: string) => {
    try {
      const res = await productDetail(id);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id) {
        const ids = encodeURIComponent(id).split("%2526");
        setLoading(true);
        try {
          const results = await Promise.all(
            ids.map((item) => getProductDetail(decodeURIComponent(item)))
          );
          const data = results;
          data.forEach((item) => {
            item.commonFeatureSlice = 10
            item.supportFeatureSlice = 10
            item.introduce = item.introduce ? item.introduce.replace(/\\u0026/g, '&') : "";
            item.description = item.description ? item.description.replace(/\\n/g, "<br/>") : ""
            item.keyBenefits = item.keyBenefits ? item.keyBenefits.replace(/\\n/g, "<br/>") : ""
            item.commonFeatures = updateCommonFeaturesWithSupport(item.commonFeatures, item.supportFeatures);
          })

          console.log(data, 'data');
          
          setCompareData((prevData: any) => [
            ...prevData,
            ...data.filter(Boolean),
          ]);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
    };
    fetchProductDetails();
  }, []);

  /**
   * 数据设置
   * @param commonFeatures 
   * @param support 
   * @returns 
   */
  const updateCommonFeaturesWithSupport = (commonFeatures, supportFeatures) => {
    const supportSlugs = new Set(supportFeatures.map(feature => feature.slug));
    return commonFeatures.map(feature => ({
      ...feature,
      show: supportSlugs.has(feature.slug),
    }));
  };
  return (
    <div className={styls.compare}>
      {loading && <LoadingContext />}
      <div className={styls.header}>
        <h3 className={styls.title}>Compare</h3>
        <div className={styls.list}>
          {compareData &&
            compareData.map((item: any) => (
              <div
                className={`${styls.item} ${compareData.length == 2 ? styls.two : styls.three
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
            <h3 className={styls.title}>App Info</h3>
            <div className={styls.list}>
              {compareData &&
                compareData.map((item: any) => (
                  <div
                    className={`${styls.item} ${compareData.length == 2 ? styls.two : styls.three
                      }`}
                    key={item.name}
                  >
                    {/* <h3 className={styls.title}>App Info</h3> */}
                    <p className={styls.desc}>{item?.description}</p>

                    <div className={styls.box}>
                      <h3 className={styls.title}>Platforms supported</h3>
                      <ul className={styls.box_list}>
                        {item?.platformsSupported &&
                          item.platformsSupported.map((item: IOptionItem) => (
                            <li className={styls.box_item} key={item.slug}>
                              <span>{item.name}</span>
                              <i className={styls.icon}></i>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className={styls.box}>
                      <h3 className={styls.title}>Typical customers</h3>
                      <ul className={styls.box_list}>
                        {item?.typicalCustomers &&
                          item.typicalCustomers.map((item: IOptionItem) => (
                            <li className={styls.box_item} key={item.slug}>
                              <span>{item.name}</span>
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

                    {/* <div
                      dangerouslySetInnerHTML={{
                        __html: item?.keyBenefits,
                      }}
                    ></div> */}

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
                  className={`${styls.item} ${compareData.length == 2 ? styls.two : styls.three
                    }`}
                  key={item.name}
                >
                  <div className={styls.pricing_top}>
                    <h4 className={styls.name}>Starting from</h4>
                    <p className={styls.price}>{item?.price ? item?.price / 100 : 0}</p>
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

                  {/* <div
                    style={{ paddingTop: "16px" }}
                    dangerouslySetInnerHTML={{
                      __html: item?.priceDetail,
                    }}
                  ></div> */}
                </div>
              ))}
            </div>
          </div>

          <div className={styls.wrap} id="features">
            <h3 className={styls.title}>Key features</h3>
            <div className={styls.list}>
              {compareData.map((item: any, index: number) => (
                <div
                  className={`${styls.item} ${compareData.length == 2 ? styls.two : styls.three
                    }`}
                  key={item.name}
                >
                  <div className={styls.box}>
                    <div className={styls.totalCount}>
                      <span>{item?.name} features</span>
                      <span>{item?.supportFeatures?.length + 1}</span>
                    </div>
                    <ul className={`${styls.box_list} ${styls.box_list_feature}`}>
                      {item?.supportFeatures &&
                        item?.supportFeatures.slice(0, item.supportFeatureSlice).map((item: IOptionItem) => (
                          <li className={`${styls.box_item}`} key={item.slug}>
                            <span>{item.name}</span>
                            <i className={styls.icon}></i>
                          </li>
                        ))}
                    </ul>
                    {item?.supportFeatures?.length > 10 && (
                      <button className={styls.moreBtn} onClick={() => {
                        setCompareData((prev) => {
                          return prev.map((item: any, idx: number) => {
                            if (index === idx) {
                              return {
                                ...item,
                                supportFeatureSlice: item.supportFeatureSlice === 10 ? item.supportFeatures.length : 10,
                              };
                            }
                            return item;
                          });
                        })
                      }}>{item.supportFeatureSlice === 10 ? 'Expand list' : "Collapse list"}</button>
                    )}
                  </div>

                  <div className={styls.box}>
                    <div className={styls.totalCount}>
                      <span>Common features</span>
                      <span>{item.commonFeatures.length + 1}</span>
                    </div>
                    <ul className={`${styls.box_list} ${styls.box_list_feature}`}>
                      {item.commonFeatures &&
                        item.commonFeatures.slice(0, item.commonFeatureSlice).map((item: IOptionItem) => (
                          <li className={`${styls.box_item} ${!item.show && styls.nocheck}`} key={item.slug}>
                            <span>{item.name}</span>
                            <i className={styls.icon}></i>
                          </li>
                        ))}
                    </ul>
                    {item.commonFeatures.length > 10 && (
                      <button className={styls.moreBtn} onClick={() => {
                        setCompareData((prev) => {
                          return prev.map((item: any, idx: number) => {
                            if (index === idx) {
                              return {
                                ...item,
                                commonFeatureSlice: item.commonFeatureSlice === 10 ? item.commonFeatures.length : 10,
                              };
                            }
                            return item;
                          });
                        })
                      }}>{item.commonFeatureSlice === 10 ? 'Expand list' : "Collapse list"}</button>
                    )}
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
                  className={`${styls.item} ${compareData.length == 2 ? styls.two : styls.three
                    }`}
                  key={item.name}
                >
                  <div className={styls.box}>
                    <h3 className={styls.title}>Rating criteria</h3>
                    <ul className={styls.box_list}>
                      <li className={styls.box_item}>
                        <span>Value for money</span>
                        <div className={styls.rateWrap}>
                          <Rate
                            count={1}
                            value={item?.valueForMoney > 0 ? 1 : 0}
                            disabled
                          />
                          ({item?.valueForMoney})
                        </div>
                      </li>

                      <li className={styls.box_item}>
                        <span>Ease of use</span>
                        <div className={styls.rateWrap}>
                          <Rate
                            count={1}
                            value={item?.easeOfUse > 0 ? 1 : 0}
                            disabled
                          />
                          ({item?.easeOfUse})
                        </div>
                      </li>
                      <li className={styls.box_item}>
                        <span>Features</span>
                        <div className={styls.rateWrap}>
                          <Rate
                            count={1}
                            value={item?.features > 0 ? 1 : 0}
                            disabled
                          />
                          ({item?.features})
                        </div>
                      </li>
                      <li className={styls.box_item}>
                        <span>Customer support</span>
                        <div className={styls.rateWrap}>
                          <Rate
                            count={1}
                            value={item?.customerSupport > 0 ? 1 : 0}
                            disabled
                          />
                          ({item?.customerSupport})
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
