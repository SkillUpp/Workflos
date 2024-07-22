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
import LoadingContext from "@/components/LoadingContext";
const productDetail = require('@/api/product').productDetail

interface MediaItem {
  id: number;
  img: string;
}

interface MenuItem {
  id: number;
  name: string;
  htmlId: string;
  active: boolean;
}

interface ProductInfo {
  photo?: string;
  name?: string;
  introduce?: string;
  valueForMoney?: number;
  totalRateUser?: number;
  description?: string;
  platformsSupported?: string[];
  typicalCustomers?: string[];
  supportOptions?: string[];
  keyBenefits?: string;
  price?: number;
  priceOption?: string[];
  priceDetail?: string;
  totalFeature?: number;
  supportFeatures?: string[];
  supportCommonFeatures?: string[];
  unsupportCommonFeatures?: string[];
  easeOfUse?: number;
  features?: number;
  customerSupport?: number;
}

const mediaList: MediaItem[] = [
  { id: 1, img: Ins },
  { id: 2, img: x },
  { id: 3, img: message },
  { id: 4, img: twitter },
];

const defaultCompareMenu: MenuItem[] = [
  { id: 1, name: "App Info", htmlId: "appInfo", active: true },
  { id: 2, name: "Overview", htmlId: "overview", active: false },
  { id: 3, name: "News", htmlId: "news", active: false },
  { id: 4, name: "Pricing", htmlId: "pricing", active: false },
  { id: 5, name: "Features", htmlId: "features", active: false },
  { id: 6, name: "Reviews", htmlId: "reviews", active: false },
  { id: 7, name: "Funding", htmlId: "funding", active: false },
  { id: 8, name: "Core Team", htmlId: "team", active: false },
  { id: 9, name: "Revenue", htmlId: "revenue", active: false },
  { id: 10, name: "Challenges", htmlId: "challenges", active: false },
];

const ProductDetailPage = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState<ProductInfo>({});
  const [compareMenu, setCompareMenu] = useState(defaultCompareMenu);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    el && el.scrollIntoView({ behavior: "smooth" });
    const updatedMenu = compareMenu.map((item) => ({
      ...item,
      active: item.htmlId === id,
    }));
    setCompareMenu(updatedMenu);
  };

  const getProductDetail = async () => {
    try {
      setLoading(true);
      const res = await productDetail(id);
      if (res.data) {
        setProductInfo(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, [id]);

  const menu = (
    <div className={styls.dropdownWrap}>
      {[5, 4, 3, 2, 1].map((rate, idx) => (
        <div className={styls.wrap} key={idx}>
          <div className={styls.rate}>
            <i className={styls.icon}></i>
            <span>{rate}</span>
          </div>
          <Progress
            percent={rate * 10}
            showInfo={false}
            strokeColor="#9747ff"
          />
          <span className={styls.count}>{rate * 100}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styls.compare}>
      {loading && <LoadingContext />}
      <div className={styls.header}>
        <div className={styls.media}>
          <div className={styls.siteWrap}>
            {productInfo?.photo && (
              <Image
                src={productInfo?.photo}
                alt={productInfo?.name}
                width={40}
                height={40}
              />
            )}
            <span>{productInfo?.name}</span>
          </div>
          <div className={styls.mediaList}>
            {mediaList.map((item) => (
              <Link href="/" key={item.id}>
                <Image alt="" width={24} height={24} src={item.img} />
              </Link>
            ))}
          </div>
        </div>
        <p className={styls.address}>{productInfo?.introduce}</p>
        <Dropdown overlay={menu} trigger={["hover"]}>
          <div className={styls.rateInfo}>
            <span>{(productInfo?.valueForMoney || 0) / 10}</span>
            <Rate value={(productInfo?.valueForMoney || 0) / 10} disabled />
            <span className={styls.count}>
              (
              {productInfo?.totalRateUser
                ? `${productInfo.totalRateUser / 1000}k`
                : 0}
              )
            </span>
          </div>
        </Dropdown>
      </div>

      <div className={styls.content}>
        <div className={styls.left}>
          <div className={styls.menuList}>
            {compareMenu.map((item) => (
              <div
                className={`${styls.menuItem} ${item.active && styls.active}`}
                key={item.id}
                onClick={() => handleClick(item.htmlId)}
              >
                <span className={styls.text}>{item.name}</span>
              </div>
            ))}
          </div>
          <div className={styls.selectWrap}>
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
              <ul className={styls.boxList}>
                {productInfo?.platformsSupported?.map((item) => (
                  <li className={styls.boxItem} key={item}>
                    <span>{item}</span>
                    <i className={styls.icon}></i>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styls.box}>
              <h3 className={styls.title}>Typical customers</h3>
              <ul className={styls.boxList}>
                {productInfo?.typicalCustomers?.map((item) => (
                  <li className={styls.boxItem} key={item}>
                    <span>{item}</span>
                    <i className={styls.icon}></i>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styls.box}>
              <h3 className={styls.title}>Customer support</h3>
              <ul className={styls.boxList}>
                {productInfo?.supportOptions?.map((item) => (
                  <li className={styls.boxItem} key={item}>
                    <span>{item}</span>
                    <i className={styls.icon}></i>
                  </li>
                ))}
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

            <p className={styls.desc}>
              Google LLC is an American multinational corporation and technology
              company focusing on online advertising, search engine technology,
              cloud computing, computer software, quantum computing, e-commerce,
              consumer electronics, and artificial intelligence. The company's
              business areas include advertising, search, platforms and
              operating systems, and enterprise and hardware products Alphabet,
              the parent company of Google, topped $100 billion in annual sales
              for the first time in Google's 20-year history
            </p>
          </div>

          <div className={styls.news} id="news">
            <h3 className={styls.title}>News</h3>
            <div className={styls.news_list}>
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
            </div>
          </div>

          <div className={styls.news} id="pricing">
            <h3 className={styls.title}>Pricing</h3>
            <div className={styls.pricing_top}>
              <h4 className={styls.name}>Starting from</h4>
              <p className={styls.price}>
                {productInfo?.price ? productInfo?.price / 100 : 0}
              </p>
              <p className={styls.text}>per month</p>
            </div>
            <div className={styls.box}>
              <ul className={styls.box_list}>
                {productInfo?.priceOption &&
                  productInfo.priceOption.map((item: string) => (
                    <li className={styls.box_item} key={item}>
                      <span>{item}</span>
                      <i className={styls.icon}></i>
                    </li>
                  ))}
              </ul>
            </div>

            <div
              style={{ paddingTop: "16px" }}
              dangerouslySetInnerHTML={{
                __html: productInfo?.priceDetail,
              }}
            ></div>
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
                  productInfo.supportFeatures.map((item: string) => (
                    <li className={styls.box_item} key={item}>
                      <span>{item}</span>
                      <i className={styls.icon}></i>
                    </li>
                  ))}

                {productInfo?.supportCommonFeatures &&
                  productInfo.supportCommonFeatures.map((item: string) => (
                    <li className={styls.box_item} key={item}>
                      <span>{item}</span>
                      <i className={styls.icon}></i>
                    </li>
                  ))}
                {productInfo?.unsupportCommonFeatures &&
                  productInfo.unsupportCommonFeatures.map((item: string) => (
                    <li
                      className={`${styls.box_item} ${styls.nocheck}`}
                      key={item}
                    >
                      <span>{item}</span>
                      <i className={styls.icon}></i>
                    </li>
                  ))}
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
                    <Rate value={productInfo?.valueForMoney / 10} disabled />(
                    {productInfo?.valueForMoney / 10})
                  </div>
                </li>

                <li className={styls.box_item}>
                  <span>Ease of use</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rate value={productInfo?.easeOfUse / 10} disabled />(
                    {productInfo?.easeOfUse / 10})
                  </div>
                </li>
                <li className={styls.box_item}>
                  <span>Features</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rate value={productInfo?.features / 10} disabled />(
                    {productInfo?.features / 10})
                  </div>
                </li>
                <li className={styls.box_item}>
                  <span>Customer support</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Rate value={productInfo?.customerSupport / 10} disabled />(
                    {productInfo?.customerSupport / 10})
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={styls.funding} id="funding">
            <h3 className={styls.title}>Funding</h3>
            <ul className={styls.funding_list}>
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
            </ul>
          </div>

          <div className={styls.team} id="team">
            <h3 className={styls.title}>Core Team</h3>
            <ul className={styls.team_list}>
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
            </ul>
          </div>

          <div className={styls.funding} id="revenue">
            <h3 className={styls.title}>Revenue</h3>
            <ul className={styls.funding_list}>
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
            </ul>
          </div>

          <div className={styls.funding} id="challenges">
            <h3 className={styls.title}>Challenges</h3>
            <ul className={styls.funding_list}>
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
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
