"use client";
import Image from "next/image";
import { Input, Select } from "antd";
import styls from "./index.module.css";
import T1 from "@/images/t.png";
import User from "@/images/user.png";
import { useRouter } from "next/navigation";

const tags = [
  "All",
  "Upcoming",
  "Past",
  "Launches",
  "All",
  "Upcoming",
  "Past",
  "Launches",
];

const Launch = () => {
  const route = useRouter();
  const handleJump = (path: string) => {
    route.push(path);
  };
  return (
    <div className={styls.launch}>
      <div className={styls.header}>
        <h3 className={styls.title}>Launch</h3>
        <p className={styls.desc}>The launchpad for Launch</p>
        <Input placeholder="Search for a Company" />
        <div className={styls.tag_list}>
          {tags.map((item) => (
            <div className={styls.tag} key={item}>
              {item}
            </div>
          ))}
        </div>
        <div className={styls.search}>
          <div className={styls.left}>
            <Select defaultValue={"1"}>
              <Select.Option value="1">All Batches</Select.Option>
            </Select>
            <Select defaultValue={"1"}>
              <Select.Option value="1">All Industries</Select.Option>
            </Select>
          </div>
          <div className={styls.sort_wrap}>
            <span className={styls.label}>Sort by</span>
            <Select defaultValue={"1"}>
              <Select.Option value="1">Date</Select.Option>
            </Select>
          </div>
        </div>
      </div>
      <div className={styls.content}>
        <div className={styls.launch_list}>
          <div
            className={styls.launch_item}
            onClick={() => handleJump("/launch/detail")}
          >
            <div className={styls.idx}>
              <i className={styls.icon}></i>
              <span className={styls.text}>1</span>
            </div>
            <div className={styls.picture}>
              <Image src={T1} alt="" width={74} height={74} />
            </div>
            <div className={styls.info}>
              <h3 className={styls.title}>
                Hamming - Make your RAG & AI agents reliable
              </h3>
              <p className={styls.desc}>
                The only end-to-end AI development platform you need: prompt
                management, evals, observability
              </p>
              <div className={styls.user_info}>
                <div className={styls.user}>
                  <div className={styls.wrap}>
                    <Image src={User} alt={""} width={22} height={22} />
                    <span className={styls.name}>Sumanyu Sharma</span>
                  </div>
                  <div className={styls.wrap}>
                    <span className={styls.tie}>Hamming AI</span>
                    <span className={styls.time}>a day ago</span>
                  </div>
                </div>
                <div className={styls.tags}>
                  {tags.map((item) => (
                    <div className={styls.tag} key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launch;
