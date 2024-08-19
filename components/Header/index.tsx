"use client";
import _ from 'loadsh'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import BarIcon from "@/images/bars.svg";
import { usePathname, useRouter } from "next/navigation";
import Select from "../Select";
import { userInfo } from "@/api/user";
import { useStore } from "@/store/userStore";
import {
  AUTH0_LOGIN_URL,
  AUTH0_LOGOUT_URL,
  AUTH0_SIGNUP_URL,
} from "@/utils/constant";
import WorkflosLogo from '@/assets/images/workflos.svg'


const defaultNavList = [
  { title: "Category", id: "category-section", path: "/category" },
  { title: "Trending", id: "agenda-section", path: "/trending" },
  { title: "Launch", id: "speakers-sectionid", path: "/launch" },
  { title: "Blog", id: "partners-section", path: "/blog" },
  { title: "About", id: "partners-section", path: "/about" },
];

const Header = () => {
  const { updateUser, user } = useStore();
  const route = useRouter();
  const pathname = usePathname();
  const [navList, setNavList] = useState(defaultNavList);
  const [currentPathName, setPathName] = useState(pathname);
  const [isnavbarToggler, setIsnavbarToggler] = useState(false);

  const handleJump = (path: string) => {
    setIsnavbarToggler(false);
    route.push(path);
  };

  /**
   * 获取用户信息
   */
  const getUserInfo = async () => {
    const result = await userInfo();
    if (result && result.data) {
      setNavList(defaultNavList);
      updateUser(result.data);
    }
  };

  const handleHrefJump = _.debounce((href: string) => {
    window.location.href = href;
  }, 300);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!user?.uid) {
      const list = JSON.parse(JSON.stringify(navList));
      const index = list.findIndex(
        (item: { title: string }) => item.title === "Favorite"
      );
      list.splice(index, 1);
      setNavList(list);
    }
  }, []);

  useEffect(() => {
    setPathName(pathname);
  }, [pathname]);
  return (
    <header className="fixed z-50 top-0 right-0 left-0 flex items-center justify-between w-full h-[86px] bg-white">
      <div className="w-full">
        <nav className="w-full flex items-center justify-between relative px-[24px] xl:px-[50px] 2xl:px-[90px]">
          <div className="w-full flex items-center h-[34px] justify-between">
            <Link href="/" className="h-[34px] w-[226px]">
              <Image src={WorkflosLogo} alt="logo" width={226} height={34} />
            </Link>

            <button
              className="block lg:hidden border border-black p-2 outline-none transition-shadow duration-150 ease-in-out rounded-md bg-transparent cursor-pointer"
              type="button"
              aria-controls="navigation"
              aria-expanded={isnavbarToggler}
              aria-label="Toggle navigation"
              onClick={() => setIsnavbarToggler(!isnavbarToggler)}
            >
              <Image
                className="block w-6 h-6 bg-center bg-no-repeat"
                src={BarIcon}
                alt=""
                width={24}
                height={24}
              />
            </button>

            <div
              id="navigation"
              className={`absolute z-100 lg:static top-full left-0 w-full lg:w-auto flex-col lg:flex-row lg:flex mt-[22px] lg:mt-0 2xl:pl-[80px] xl:pl-[40px] lg:pl-[16px] 2xl:pr-[80px] xl:pr-[40px] lg:pr-[16px] ${isnavbarToggler ? "flex" : "hidden"
                } transition-transform transform ${isnavbarToggler ? "translate-y-0" : "-translate-y-full"
                } lg:translate-y-0 bg-white`}
            >
              <ul className="flex flex-col lg:flex-row w-full px-[24px] lg:px-0 pb-4 lg:pb-0">
                {navList.map((item, index) => (
                  <li
                    className="list-none lg:ml-[20px] xl:ml-[30px] 2xl:ml-[50px]  first:ml-0 lg:first:ml-0 h-[40px] lg:h-auto"
                    key={index}
                    onClick={() => handleJump(item.path)}
                  >
                    <div className="text-black font-semibold no-underline cursor-pointer hover:text-[#666666] flex items-center h-full">
                      {item.title}
                    </div>
                  </li>
                ))}
                {!user?.uid && (
                  <div className="flex lg:hidden items-center mt-4">
                    <button
                      className="flex justify-center items-center w-[80px] h-[34px] px-[10px] text-customPurple cursor-pointer bg-white border border-[#9747FF] rounded-[5px] text-[16px] leading-[24px] ml-[5px] first:ml-0"
                      onClick={() => handleHrefJump(AUTH0_LOGIN_URL)}
                    >
                      Sign in
                    </button>
                    <button
                      className="flex justify-center items-center w-[80px] h-[34px] px-[10px] text-white cursor-pointer bg-[#9747FF] border border-[#9747FF] rounded-[5px] text-[16px] leading-[24px] ml-[5px] first:ml-0"
                      onClick={() => handleHrefJump(AUTH0_SIGNUP_URL)}
                    >
                      Sign up
                    </button>
                  </div>
                )}
                {user?.uid && (
                  <div className="flex lg:hidden items-center">
                    <div className="flex items-center">
                      <Image
                        className="w-12 h-12 rounded-md"
                        src={user?.picture}
                        alt=""
                        width={64}
                        height={64}
                      />
                      <div className="flex flex-col ml-4">
                        <h3 className="text-ellipsis w-[150px] overflow-hidden text-[#111111] font-bold">
                          {user?.name}
                        </h3>
                        <p className="text-ellipsis w-[150px] overflow-hidden text-[#333333] from-neutral-600">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <button
                      className="flex justify-center items-center w-[72px] h-[34px] px-[10px] text-customPurple cursor-pointer bg-white border border-[#9747FF] rounded-[5px] text-[16px] leading-[24px] ml-[5px] first:ml-0"
                      onClick={() => handleHrefJump(AUTH0_LOGOUT_URL)}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </ul>
            </div>
          </div>

          <div className="w-auto lg:w-full flex justify-end">
            <div className="hidden w-[180px] md:w-[260px] lg:w-[200px] xl:w-[200px] 2xl:w-[290px] sm:block absolute lg:static sm:left-[50%] sm:translate-x-[-50%] sm:top-[50%] sm:translate-y-[-50%] lg:translate-y-0 lg:translate-x-0 lg:mx-[20px] xl:mx-[40px] 2xl:mx-[60px]">
              <Select />
            </div>
            {!user?.uid && (
              <div className="hidden lg:flex items-center">
                <button
                  className="flex justify-center items-center w-[80px] h-[34px] px-[10px] text-customPurple cursor-pointer bg-white border border-[#9747FF] rounded-[5px] text-[16px] leading-[24px] ml-[5px] first:ml-0"
                  onClick={() => handleHrefJump(AUTH0_LOGIN_URL)}
                >
                  Sign in
                </button>
                <button
                  className="flex justify-center items-center w-[80px] h-[34px] px-[10px] text-white cursor-pointer bg-[#9747FF] border border-[#9747FF] rounded-[5px] text-[16px] leading-[24px] ml-[5px] first:ml-0"
                  onClick={() => handleHrefJump(AUTH0_SIGNUP_URL)}
                >
                  Sign up
                </button>
              </div>
            )}
            {user?.uid && (
              <div className="hidden lg:flex items-center group transition-all duration-300">
                <div className="flex items-center">
                  <Image
                    className="w-12 h-12 rounded-md"
                    src={user?.picture}
                    alt=""
                    width={64}
                    height={64}
                  />
                  <div className="flex flex-col ml-4">
                    <h3 className="text-ellipsis w-[150px] overflow-hidden text-[#111111] font-bold">
                      {user?.name}
                    </h3>
                    <p className="text-ellipsis w-[150px] overflow-hidden text-[#333333] from-neutral-600">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <button
                  className="hidden group-hover:flex justify-center items-center w-[72px] h-[34px] px-[10px] text-customPurple cursor-pointer bg-white border border-[#9747FF] rounded-[5px] text-[16px] leading-[24px] ml-[5px] first:ml-0"
                  onClick={() => handleHrefJump(AUTH0_LOGOUT_URL)}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
