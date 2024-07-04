"use client";
import Link from "next/link";
import Image from "next/image";
import styls from "./index.module.css";
import AILogo from "@/images/workflos.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";

const defaultNavList = [
  { title: "Category", id: "category-section", path: "/category" },
  { title: "Trending", id: "agenda-section", path: "/trending" },
  { title: "Launch", id: "speakers-sectionid", path: "/launch" },
  { title: "Blog", id: "partners-section", path: "/blog" },
  { title: "About", id: "partners-section", path: "/about" },
];

const Header = () => {
  const route = useRouter();
  const [navList, setNavList] = useState(defaultNavList);
  const [isnavbarToggler, setIsnavbarToggler] = useState(false);

  const handleJump = (path: string) => {
    setIsnavbarToggler(false);
    route.push(path);
  };
  return (
    <header className={`${styls.header} ${isnavbarToggler ? styls.show : ""}`}>
      <div className={styls.header_top}>
        <nav className={styls.main_nav}>
          <Link className={styls.scrollto} href="/">
            <Image
              className={styls.logo_icon}
              src={AILogo}
              alt="logo"
              width={194}
              height={30}
            />
          </Link>

          <button
            className={`${styls.navbar_toggler} `}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navigation"
            aria-controls="navigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setIsnavbarToggler(!isnavbarToggler)}
          >
            <span className={styls.navbar_toggler_icon}></span>
          </button>

          <div
            id="navigation"
            className={`${styls.navbar_collapse} ${
              isnavbarToggler ? styls.show : ""
            }`}
          >
            <ul className={styls.navbar_nav}>
              {navList.map((item, index) => (
                <li
                  className={styls.nav_item}
                  key={index}
                  onClick={() => handleJump(item.path)}
                >
                  <div className={styls.nav_link} key={item.title}>
                    {item.title}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styls.header_top_right}>
            <button className={ styls.btn}>Sign in</button>
            <button className={ styls.btn}>Join</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
