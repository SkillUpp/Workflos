"use client";
import Image from "next/image";
import styls from "./index.module.css";
import Link from "next/link";
import Ins from "@/images/ins.svg";
import x from "@/images/x.svg";
import message from "@/images/message.svg";
import twitter from "@/images/twitter.svg";
import { useEffect, useState } from "react";
import { Dropdown, Progress, Rate, Select } from "antd";
import { productDetail } from "@/api/product";
import LoadingContext from "@/components/LoadingContext";

interface IOptionItem {
  name: string;
  slug: string;
}

const mediaList = [
  { id: 1, img: Ins },
  { id: 2, img: x },
  { id: 3, img: message },
  { id: 4, img: twitter },
];

const defaultCompareMenu = [
  {
    id: 1,
    htmlId: "appInfo",
    name: "App Info",
    active: true,
  },
  {
    id: 2,
    name: "Overview",
    htmlId: "overview",
    active: false,
  },
  {
    id: 3,
    name: "News",
    htmlId: "news",
    active: false,
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
    id: 4,
    name: "Reviews",
    htmlId: "reviews",
    active: false,
  },
  {
    id: 5,
    name: "Funding",
    htmlId: "funding",
    active: false,
  },
  {
    id: 6,
    name: "Core Team",
    htmlId: "team",
    active: false,
  },
  {
    id: 7,
    name: "Revenue",
    htmlId: "revenue",
    active: false,
  },
  {
    id: 9,
    name: "Challenges",
    htmlId: "challenges",
    active: false,
  },
];

const ProductDetail = (props: any) => {
  const { id } = props;
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState<any>({});

  const [compareMenu, setCompareMenu] = useState(defaultCompareMenu);
  const handleClick = (id: string) => {
    console.log(id, "id");

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

  /**
   * 获取产品详情
   */
  const getProductDetail = async () => {
    try {
      setLoading(true);
      const res = await productDetail(decodeURIComponent(id));
      if (res.data) {
        setLoading(false);
        setProductInfo(res.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const menu = (
    <div className={styls.dropdownWarp}>
      <div className={styls.wrap}>
        <div className={styls.rate}>
          <i className={styls.icon}></i>
          <span>5</span>
        </div>

        <Progress
          percent={productInfo?.rateInfo ? productInfo?.rateInfo["5"] : 0}
          showInfo={false}
          strokeColor="#9747ff"
        />
        <span className={styls.count}>
          {productInfo?.rateInfo
            ? (productInfo?.rateInfo["5"] / 100).toFixed(1) + "k"
            : "0"}
        </span>
      </div>
      <div className={styls.wrap}>
        <div className={styls.rate}>
          <i className={styls.icon}></i>
          <span>4</span>
        </div>
        <Progress
          percent={productInfo?.rateInfo ? productInfo?.rateInfo["4"] : 0}
          showInfo={false}
          strokeColor="#9747ff"
        />
        <span className={styls.count}>
          {productInfo?.rateInfo
            ? (productInfo?.rateInfo["4"] / 100).toFixed(1) + "k"
            : "0"}
        </span>
      </div>
      <div className={styls.wrap}>
        <div className={styls.rate}>
          <i className={styls.icon}></i>
          <span>3</span>
        </div>
        <Progress
          percent={productInfo?.rateInfo ? productInfo?.rateInfo["3"] : 0}
          showInfo={false}
          strokeColor="#9747ff"
        />
        <span className={styls.count}>
          {productInfo?.rateInfo ? productInfo?.rateInfo["3"] : "0"}
        </span>
      </div>
      <div className={styls.wrap}>
        <div className={styls.rate}>
          <i className={styls.icon}></i>
          <span>2</span>
        </div>
        <Progress
          percent={productInfo?.rateInfo ? productInfo?.rateInfo["2"] : 0}
          showInfo={false}
          strokeColor="#9747ff"
        />
        <span className={styls.count}>
          {productInfo?.rateInfo ? productInfo?.rateInfo["2"] : "0"}
        </span>
      </div>
      <div className={styls.wrap}>
        <div className={styls.rate}>
          <i className={styls.icon}></i>
          <span>1</span>
        </div>
        <Progress
          percent={productInfo?.rateInfo ? productInfo?.rateInfo["1"] : 0}
          showInfo={false}
          strokeColor="#9747ff"
        />
        <span className={styls.count}>
          {productInfo?.rateInfo ? productInfo?.rateInfo["1"] : "0"}
        </span>
      </div>
    </div>
  );

  useEffect(() => {
    setLoading(true);
    getProductDetail();
  }, [id]);

  return (
    <div className={styls.compare}>
      {loading && <LoadingContext />}
      <div className={styls.header}>
        <div className={styls.media}>
          <div className={styls.site_wrap}>
            {productInfo?.photo && (
              <Image src={productInfo?.photo} alt="" width={40} height={40} />
            )}
            <span>{productInfo?.name}</span>
          </div>
          <div className={styls.media_list}>
            {mediaList.map((item) => (
              <Link href="/" key={item.id}>
                <Image alt="" width={24} height={24} src={item.img} />
              </Link>
            ))}
          </div>
        </div>
        <p className={styls.address}>{productInfo?.introduce}</p>
        <Dropdown menu={menu} trigger={["hover"]}>
          <div className={styls.rate_info}>
            <span>{productInfo?.valueForMoney || "0"}</span>
            <Rate value={productInfo?.valueForMoney} disabled />
            <span className={styls.count}>
              (
              {productInfo?.totolRateUser
                ? productInfo.totolRateUser / 100 + "k"
                : 0}
              )
            </span>
          </div>
        </Dropdown>
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
            <Select defaultValue={"appInfo"} onChange={handleClick}>
              {compareMenu.map((item) => (
                <Select.Option value={item.htmlId} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className={styls.right}>
          <div className={styls.overview} id="appInfo">
            <h3 className={styls.title}>App Info</h3>
            <p className={styls.desc}>{productInfo?.description}</p>

            <div className={styls.box}>
              <h3 className={styls.title}>Platforms supported</h3>
              <ul className={styls.box_list}>
                {productInfo?.platformsSupported &&
                  productInfo.platformsSupported.map((item: IOptionItem) => (
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
                {productInfo?.typicalCustomers &&
                  productInfo.typicalCustomers.map((item: IOptionItem) => (
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
                {productInfo?.supportOptions &&
                  productInfo.supportOptions.map(
                    (item: string, index: number) => (
                      <li className={styls.box_item} key={index}>
                        <span>{item}</span>
                        <i className={styls.icon}></i>
                      </li>
                    )
                  )}
              </ul>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: productInfo?.keyBenefits,
              }}
            ></div>
          </div>

          <div className={styls.overview} id="overview">
            <h3 className={styls.title}>Overview</h3>

            <p className={styls.desc}>Comming Soon</p>
          </div>

          <div className={styls.news} id="news">
            <h3 className={styls.title}>News</h3>
            <p className={styls.desc}>Comming Soon</p>
            {/* <div className={styls.news_list}>
              <div className={styls.news_item}>
                <div className={styls.top}>
                  <span className={styls.time}>Jun 29, 2024</span>
                  <p className={styls.line}></p>
                </div>
                <p className={styls.desc}>
                  Google announced its next-generation Tensor Processing Units
                  (TPUs) called Trillium, the Wear OS 5 update, and the Gemini
                  1.5 Pro, its most capable generative AI model. The company has
                  opened access to the 2-million-token context window of the
                  Gemini 1.5 Pro AI model, enabling code execution and making
                  the Gemma 2 model available in Google AI Studio.
                </p>

                <div className={styls.company_list}>
                  <div className={styls.company_item}>
                    <h3 className={styls.title}>techcrunch.com</h3>
                    <p className={styls.text}>
                      Here are the hottest product announcements fromApple,
                      Google, Microsoft and others so far in 2024
                    </p>
                  </div>
                  <div className={styls.company_item}>
                    <h3 className={styls.title}>techcrunch.com</h3>
                    <p className={styls.text}>
                      Here are the hottest product announcements fromApple,
                      Google, Microsoft and others so far in 2024
                    </p>
                  </div>
                  <div className={styls.company_item}>
                    <h3 className={styls.title}>techcrunch.com</h3>
                    <p className={styls.text}>
                      Here are the hottest product announcements fromApple,
                      Google, Microsoft and others so far in 2024
                    </p>
                  </div>
                </div>
              </div>

              <div className={styls.news_item}>
                <div className={styls.top}>
                  <span className={styls.time}>Jun 29, 2024</span>
                  <p className={styls.line}></p>
                </div>
                <p className={styls.desc}>
                  Google announced its next-generation Tensor Processing Units
                  (TPUs) called Trillium, the Wear OS 5 update, and the Gemini
                  1.5 Pro, its most capable generative AI model. The company has
                  opened access to the 2-million-token context window of the
                  Gemini 1.5 Pro AI model, enabling code execution and making
                  the Gemma 2 model available in Google AI Studio.
                </p>
                <div className={styls.company_list}>
                  <div className={styls.company_item}>
                    <h3 className={styls.title}>techcrunch.com</h3>
                    <p className={styls.text}>
                      Here are the hottest product announcements fromApple,
                      Google, Microsoft and others so far in 2024
                    </p>
                  </div>
                  <div className={styls.company_item}>
                    <h3 className={styls.title}>techcrunch.com</h3>
                    <p className={styls.text}>
                      Here are the hottest product announcements fromApple,
                      Google, Microsoft and others so far in 2024
                    </p>
                  </div>
                  <div className={styls.company_item}>
                    <h3 className={styls.title}>techcrunch.com</h3>
                    <p className={styls.text}>
                      Here are the hottest product announcements fromApple,
                      Google, Microsoft and others so far in 2024
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div className={styls.news} id="pricing">
            <h3 className={styls.title}>Pricing</h3>
            <div className={styls.pricing_top}>
              <h4 className={styls.name}>Starting from</h4>
              <div className={styls.price}>
                <span className={styls.currency}>
                  {productInfo?.pricing?.currency_symbol}
                </span>
                <p>{productInfo?.pricing?.amount}</p>
              </div>
              <p className={styls.text}>per month</p>
            </div>
            <div className={styls.box}>
              <ul className={styls.box_list}>
                {productInfo?.pricing?.categories &&
                  productInfo?.pricing?.categories.map((item: string) => (
                    <li className={styls.box_item} key={item}>
                      <span>{item}</span>
                      <i className={styls.icon}></i>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className={styls.product} id="features">
            <h3 className={styls.title}>Features</h3>
            <div className={styls.box}>
              <ul className={styls.box_list}>
                <li className={`${styls.box_item}`}>
                  <span>Total features</span>
                  <span>{productInfo?.totalFeature}</span>
                </li>

                {productInfo?.supportFeatures &&
                  productInfo.supportFeatures.map((item: IOptionItem) => (
                    <li className={styls.box_item} key={item.slug}>
                      <span>{item.name}</span>
                      <i className={styls.icon}></i>
                    </li>
                  ))}

                {productInfo?.commonFeatures &&
                  productInfo.commonFeatures.map((item: IOptionItem) => (
                    <li className={styls.box_item} key={item.slug}>
                      <span>{item.name}</span>
                      <i className={styls.icon}></i>
                    </li>
                  ))}
                {/* {productInfo?.unsupportCommonFeatures &&
                  productInfo.unsupportCommonFeatures.map((item: string) => (
                    <li
                      className={`${styls.box_item} ${styls.nocheck}`}
                      key={item}
                    >
                      <span>{item}</span>
                      <i className={styls.icon}></i>
                    </li>
                  ))} */}
              </ul>
            </div>
          </div>

          <div className={styls.stack} id="reviews">
            <h3 className={styls.title}>Reviews</h3>
            <div className={styls.box}>
              <h3 className={styls.title}>Rating criteria</h3>
              <ul className={styls.box_list}>
                <li className={styls.box_item}>
                  <span>Value for money</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rate value={productInfo?.valueForMoney} disabled />(
                    {productInfo?.valueForMoney})
                  </div>
                </li>

                <li className={styls.box_item}>
                  <span>Ease of use</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rate value={productInfo?.easeOfUse} disabled />(
                    {productInfo?.easeOfUse})
                  </div>
                </li>
                <li className={styls.box_item}>
                  <span>Features</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rate value={productInfo?.features} disabled />(
                    {productInfo?.features})
                  </div>
                </li>
                <li className={styls.box_item}>
                  <span>Customer support</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rate value={productInfo?.customerSupport} disabled />(
                    {productInfo?.customerSupport})
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={styls.funding} id="funding">
            <h3 className={styls.title}>Funding</h3>
            <p className={styls.desc}>Comming Soon</p>
            {/* <ul className={styls.funding_list}>
              <li className={styls.funding_item}>
                Google.org commits $25M in funding to accelerate progress
                towards the Sustainable Development Goals.
              </li>
              <li className={styls.funding_item}>
                Google.org commits $30M to fund big bet projects that accelerate
                technological advances in climate information and action through
                the Google.org Impact Challenge on Climate Innovation.
              </li>
              <li className={styls.funding_item}>
                Google.org has committed $40 million in funding to organizations
                that use data science and innovative new approaches to advance
                racial justice since 2015.
              </li>
              <li className={styls.funding_item}>
                Google.org has committed $100 million in funding to support
                effective solutions throughout the course of the COVID-19
                pandemic.
              </li>
              <li className={styls.funding_item}>
                The top individual insider shareholders of Google are Larry Page
                and Sergey Brin, and the top institutional shareholders are
                Vanguard Group Inc., BlackRock, Inc., and T. Rowe Price
                Associates, Inc.
              </li>
            </ul> */}
          </div>

          <div className={styls.team} id="team">
            <h3 className={styls.title}>Core Team</h3>
            <p className={styls.desc}>Comming Soon</p>
            {/* <ul className={styls.team_list}>
              <li className={styls.team_item}>
                <h3 className={styls.name}>Sundar Pichai</h3>
                <p className={styls.desc}>CEO of Google and Alphabet Inc.</p>
              </li>
              <li className={styls.team_item}>
                <h3 className={styls.name}>Sundar Pichai</h3>
                <p className={styls.desc}>CEO of Google and Alphabet Inc.</p>
              </li>
              <li className={styls.team_item}>
                <h3 className={styls.name}>Sundar Pichai</h3>
                <p className={styls.desc}>CEO of Google and Alphabet Inc.</p>
              </li>
              <li className={styls.team_item}>
                <h3 className={styls.name}>Sundar Pichai</h3>
                <p className={styls.desc}>CEO of Google and Alphabet Inc.</p>
              </li>
              <li className={styls.team_item}>
                <h3 className={styls.name}>Sundar Pichai</h3>
                <p className={styls.desc}>CEO of Google and Alphabet Inc.</p>
              </li>
              <li className={styls.team_item}>
                <h3 className={styls.name}>Sundar Pichai</h3>
                <p className={styls.desc}>CEO of Google and Alphabet Inc.</p>
              </li>
              <li className={styls.team_item}>
                <h3 className={styls.name}>Sundar Pichai</h3>
                <p className={styls.desc}>CEO of Google and Alphabet Inc.</p>
              </li>
              <li className={styls.team_item}>
                <h3 className={styls.name}>Sundar Pichai</h3>
                <p className={styls.desc}>CEO of Google and Alphabet Inc.</p>
              </li>
              <li className={styls.team_item}>
                <h3 className={styls.name}>Sundar Pichai</h3>
                <p className={styls.desc}>CEO of Google and Alphabet Inc.</p>
              </li>
            </ul> */}
          </div>

          <div className={styls.funding} id="revenue">
            <h3 className={styls.title}>Revenue</h3>
            <p className={styls.desc}>Comming Soon</p>
            {/* <ul className={styls.funding_list}>
              <li className={styls.funding_item}>
                Google's revenue in the first quarter of 2024 amounted to over
                79.9 billion U.S. dollars.
              </li>
              <li className={styls.funding_item}>
                The company's annual revenue in 2023 was 305.63 billion U.S.
                dollars, its highest value to date.
              </li>
              <li className={styls.funding_item}>
                Google's annual revenue from 2002 to 2023 is as follows:
              </li>
              <li className={styls.funding_item}>
                Google's total yearly revenue in 2023 was $307.4 billion, with a
                breakdown of revenue streams including Google Search & Other,
                YouTube Ads, Google Network, Google Other, and Google Cloud.
              </li>
              <li className={styls.funding_item}>
                Alphabet Inc.'s revenue, as the parent company of Google,
                reported $68.01 billion in the first quarter of 2022.
              </li>
            </ul> */}
          </div>

          <div className={styls.funding} id="challenges">
            <h3 className={styls.title}>Challenges</h3>
            <p className={styls.desc}>Comming Soon</p>
            {/* <ul className={styls.funding_list}>
              <li className={styls.funding_item}>
                Google's revenue in the first quarter of 2024 amounted to over
                79.9 billion U.S. dollars.
              </li>
              <li className={styls.funding_item}>
                The company's annual revenue in 2023 was 305.63 billion U.S.
                dollars, its highest value to date.
              </li>
              <li className={styls.funding_item}>
                Google's annual revenue from 2002 to 2023 is as follows:
              </li>
              <li className={styls.funding_item}>
                Google's total yearly revenue in 2023 was $307.4 billion, with a
                breakdown of revenue streams including Google Search & Other,
                YouTube Ads, Google Network, Google Other, and Google Cloud.
              </li>
              <li className={styls.funding_item}>
                Alphabet Inc.'s revenue, as the parent company of Google,
                reported $68.01 billion in the first quarter of 2022.
              </li>
            </ul> */}
          </div>

          {/* <div className={styls.hiring} id="hiring">
            <h3 className={styls.title}>Hiring</h3>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
