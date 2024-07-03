import Image from "next/image";
import styls from "./index.module.css";
import Logo from "@/images/workflos.svg";
import Link from "next/link";

const defaultNavList = [
  { title: "About", id: "about-section", path: "/" },
  { title: "Studio", id: "agenda-section", path: "/studio" },
  { title: "Portfolio", id: "speakers-sectionid", path: "/portfolio" },
  { title: "Insights", id: "partners-section", path: "/Insights" },
];
const Footer = () => {
  return (
    <footer className={styls.footer}>
      <div className={styls.container}>
        <div className={styls.row}>
          <div className={`${styls.col}`}>
            <div className="logo">
              <Image src={Logo} alt="logo" width={200} height={40} />
            </div>
          </div>

          <ul className={styls.navbar_nav}>
            {defaultNavList.map((item, index) => (
              <li className={styls.nav_item} key={index}>
                <Link
                  className={styls.nav_link}
                  key={item.title}
                  prefetch
                  href={item.path}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* <ul className={styls.social_list}>
            <li>
              <a href="javascript:;">
                <Image src={Ins} alt="" width={32} height={32} />
              </a>
            </li>
            <li>
              <a href="#">
                <Image src={X} alt="" width={32} height={32} />
              </a>
            </li>
          </ul> */}
        </div>
        <ul className={`${styls.navbar_nav} ${styls.navbar_nav_mobile}`}>
          {defaultNavList.map((item, index) => (
            <li className={styls.nav_item} key={index}>
              <Link
                className={styls.nav_link}
                key={item.title}
                href={item.path}
                prefetch
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
