"use client";
import { throttle } from "lodash";
import Image from "next/image";
import { Input } from "antd";
import styls from "./index.module.css";
import { useRouter } from "next/navigation";
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { launchList } from "@/api/product";
import LoadingContext from "@/components/LoadingContext";
import NoData from "@/components/Nodata";

const tags = ["All", "Upcoming", "Past", "Launches"];

const Launch = () => {
  const route = useRouter();
  const searchValue = useRef("");
  const handleJump = (path: string) => {
    route.push(path);
  };
  const [loading, setLoading] = useState(false);
  const [launchData, setLaunchData] = useState<any>([]);

  const handleChangeValue = useCallback(
    throttle((val: string) => {
      searchValue.current = val;
      getLaunchData();
    }, 1000),
    []
  );

  const getLaunchData = async () => {
    setLoading(true);
    const res = await launchList({ keyword: searchValue.current });
    if (res.data) {
      setLoading(false);
      setLaunchData(res.data.list);
    }
  };

  useEffect(() => {
    getLaunchData();
  }, []);
  return (
    <div className={styls.launch}>
      {loading && <LoadingContext />}
      <div className={styls.header}>
        <h3 className={styls.title}>Launch</h3>
        <p className={styls.desc}>The launchpad for Launch</p>
        <Input
          placeholder="Search for a Company"
          onChange={(e) => handleChangeValue(e.target.value)}
        />
        <div className={styls.tag_list}>
          {tags.map((item) => (
            <div className={styls.tag} key={item}>
              {item}
            </div>
          ))}
        </div>
        {/* <div className={styls.search}>
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
        </div> */}
      </div>
      <div className={styls.content}>
        <div className={styls.launch_list}>
          {launchData.length > 0 &&
            launchData.map((item: any, index: number) => (
              <div
                className={styls.launch_item}
                onClick={() => handleJump("/launch/" + item.name)}
              >
                <div className={styls.idx}>
                  <i className={styls.icon}></i>
                  <span className={styls.text}>{index + 1}</span>
                </div>
                <div className={styls.picture}>
                  <Image src={item.photo} alt="" width={74} height={74} />
                </div>
                <div className={styls.info}>
                  <h3 className={styls.title}>{item.title}</h3>
                  <p className={styls.desc}>{item.content}</p>
                  <div className={styls.user_info}>
                    {/* <div className={styls.user}>
                      <div className={styls.wrap}>
                        <Image src={User} alt={""} width={22} height={22} />
                        <span className={styls.name}>Sumanyu Sharma</span>
                      </div>
                      <div className={styls.wrap}>
                        <span className={styls.tie}>Hamming AI</span>
                        <span className={styls.time}>a day ago</span>
                      </div>
                    </div> */}
                    <div className={styls.tags}>
                      {item.category &&
                        item.category.map((tag: string) => (
                          <div className={styls.tag} key={tag}>
                            {tag}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {launchData.length === 0 && <NoData />}
        </div>
      </div>
    </div>
  );
};

export default Launch;
