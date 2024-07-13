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
    id: 2,
    name: "News",
    htmlId: "news",
    active: false,
  },
  {
    id: 3,
    name: "Products",
    htmlId: "products",
    active: false,
  },
  {
    id: 4,
    name: "AI Stack",
    htmlId: "stack",
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
    id: 8,
    name: "Competitors",
    htmlId: "competitors",
    active: false,
  },
  {
    id: 9,
    name: "Challenges",
    htmlId: "challenges",
    active: false,
  },
  {
    id: 10,
    name: "Hiring",
    htmlId: "hiring",
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
      const res = await productDetail();
      if (res.data) {
        setLoading(false);
        setProductInfo(res.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <div className={styls.compare}>
      {loading && <LoadingContext />}
      <div className={styls.header}>
        <div className={styls.media}>
          <div className={styls.site_wrap}>
            <Image src={productInfo?.photo} alt="" width={145} height={42} />
          </div>
          <div className={styls.media_list}>
            {mediaList.map((item) => (
              <Link href="/" key={item.id}>
                <Image alt="" width={24} height={24} src={item.img} />
              </Link>
            ))}
          </div>
        </div>
        <p className={styls.address}>
          Mountain View, California, United States
        </p>
        <div className={styls.wrap}>
          <div className={styls.phone}>
            <i className={styls.phone_icon}></i>
            <span className={styls.text}>+1 650 253 0000</span>
          </div>
          <div className={styls.email}>
            <i className={styls.email_icon}></i>
            <span className={styls.text}>google@google.com</span>
          </div>
        </div>
        <div className={styls.tags}>
          <div className={styls.user}>
            <i className={styls.icon}></i>
            <span className={styls.text}>100+</span>
          </div>
          <div className={styls.found}>
            <i className={styls.icon}></i>
            <span className={styls.text}>Founded in 1998</span>
          </div>
          <div className={styls.qian}>
            <span>$</span>
            <span className={styls.text}>100+</span>
          </div>
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

          <div className={styls.product} id="products">
            <h3 className={styls.title}>Product</h3>
            <ul className={styls.product_list}>
              <li className={styls.product_item}>
                Google offers a wide range of products and services, including
                Android, Chrome, Google Play, Wear OS, Chromecast, Fitbit,
                Google Nest, Pixel, Gemini, Bard, Google Assistant, Maps, News,
                Search, Shopping, Photos, Translate, and more.
              </li>
              <li className={styls.product_item}>
                Google provides various business products and services,
                including AdMob, AdSense, Analytics, Android Enterprise,
                Blogger, Business Messages, Business Profile, Chrome Enterprise,
                Enterprise Search, Google Ad Manager, Google Ads, Google
                Assistant, Google Cloud, Google Digital Garage, Google Maps
                Platform, Google Marketing Platform, and more.
              </li>
              <li className={styls.product_item}>
                Google offers developer products and services, including App
                Testing, Business Messages, Cloud Computing, Devices,
                Engagement, Game Services, Google Wallet, Growth, Maps +
                Location, Messaging + Notifications, Monetization, Monitoring,
                Payments, Sign in + Identity, Storage + Sync, and more.
              </li>
              <li className={styls.product_item}>
                Google Workspace provides a suite of productivity and
                collaboration tools, including Gmail, Drive, Meet, Calendar,
                Chat, Docs, Sheets, Slides, Keep, Sites, Forms, AppSheet, and
                more, with pricing plans starting at $6 USD per user/month.
              </li>
              <li className={styls.product_item}>
                Google also offers various other products and services,
                including Google One (cloud storage), Google Photos, Google
                Drive, Gmail, Gemini Advanced (AI-powered features), Magic
                Editor (Google Photos feature), and more, with pricing plans
                starting at 15 GB storage for free.
              </li>
            </ul>
          </div>

          <div className={styls.stack} id="stack">
            <h3 className={styls.title}>AI Stack</h3>
            <ul className={styls.stack_list}>
              <li className={styls.stack_item}>
                Google offers a wide range of products and services, including
                Android, Chrome, Google Play, Wear OS, Chromecast, Fitbit,
                Google Nest, Pixel, Gemini, Bard, Google Assistant, Maps, News,
                Search, Shopping, Photos, Translate, and more.
              </li>
              <li className={styls.stack_item}>
                Google provides various business products and services,
                including AdMob, AdSense, Analytics, Android Enterprise,
                Blogger, Business Messages, Business Profile, Chrome Enterprise,
                Enterprise Search, Google Ad Manager, Google Ads, Google
                Assistant, Google Cloud, Google Digital Garage, Google Maps
                Platform, Google Marketing Platform, and more.
              </li>
              <li className={styls.stack_item}>
                Google offers developer products and services, including App
                Testing, Business Messages, Cloud Computing, Devices,
                Engagement, Game Services, Google Wallet, Growth, Maps +
                Location, Messaging + Notifications, Monetization, Monitoring,
                Payments, Sign in + Identity, Storage + Sync, and more.
              </li>
              <li className={styls.stack_item}>
                Google Workspace provides a suite of productivity and
                collaboration tools, including Gmail, Drive, Meet, Calendar,
                Chat, Docs, Sheets, Slides, Keep, Sites, Forms, AppSheet, and
                more, with pricing plans starting at $6 USD per user/month.
              </li>
              <li className={styls.stack_item}>
                Google also offers various other products and services,
                including Google One (cloud storage), Google Photos, Google
                Drive, Gmail, Gemini Advanced (AI-powered features), Magic
                Editor (Google Photos feature), and more, with pricing plans
                starting at 15 GB storage for free.
              </li>
            </ul>
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

          {/* <div className={styls.hiring} id="hiring">
            <h3 className={styls.title}>Hiring</h3>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
