import Image from "next/image";
import styls from "./index.module.css";
import Google from "@/images/google.svg";
import Link from "next/link";
import Ins from "@/images/ins.svg";
import x from "@/images/x.svg";
import message from "@/images/message.svg";
import twitter from "@/images/twitter.svg";

const mediaList = [
  { id: 1, img: Ins },
  { id: 2, img: x },
  { id: 3, img: message },
  { id: 4, img: twitter },
];

const CompareMenu = [
  {
    id: 1,
    name: "Overview",
    active: true,
  },
  {
    id: 2,
    name: "News",
    active: false,
  },
  {
    id: 3,
    name: "Products",
    active: false,
  },
  {
    id: 4,
    name: "AI Stack",
    active: false,
  },
  {
    id: 5,
    name: "Funding",
    active: false,
  },
  {
    id: 6,
    name: "Core Team",
    active: false,
  },
  {
    id: 7,
    name: "Revenue",
    active: false,
  },
  {
    id: 8,
    name: "Competitors",
    active: false,
  },
  {
    id: 9,
    name: "Challenges",
    active: false,
  },
  {
    id: 10,
    name: "Hiring",
    active: false,
  },
];

const Compare = () => {
  return (
    <div className={styls.compare}>
      <div className={styls.header}>
        <div className={styls.media}>
          <div className={styls.site_wrap}>
            <Image src={Google} alt="" width={145} height={42} />
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
            {CompareMenu.map((item) => (
              <div
                className={`${styls.menu_item} ${item.active && styls.active}`}
                key={item.id}
              >
                <span className={styls.text}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styls.right}>
          <div className={styls.overview}>
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

          <div className={styls.news}>
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

          <div className={styls.product}>
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
        </div>
      </div>
    </div>
  );
};

export default Compare;
