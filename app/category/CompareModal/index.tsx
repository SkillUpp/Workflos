"use client";
import { productList } from "@/api/product";
import styls from "./index.module.css";
import SoftIcon from "@/images/soft-icon.png";
import { Select, message } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/userStore";
const list = [{ id: 1, name: "App 1", image: SoftIcon }];

interface ICompareModalProps {
  close: () => void;
  item: any;
}

const CompareModal = (props: ICompareModalProps) => {
  const { item } = props;
  const route = useRouter();
  const { updateCompareStr } = useStore();
  const [compareList, setCompareList] = useState<any>([]);
  const [softworeList, setSoftworeList] = useState<any>([]);

  /**
   * remove all
   */
  const handleRemoveAll = () => {
    setCompareList([]);
  };

  const handleJumpCompare = () => {
    if (compareList.length < 2) {
      message.open({
        type: "info",
        content: "Please add at least 2 apps to compare",
      });
      return;
    }
    const names = compareList
      .map((item: { name: string }) => item.name)
      .join("&");
    updateCompareStr(names);
    route.push(`/category/${names}`);
  };

  const handleClose = (info: any) => {
    const newList = compareList.filter(
      (compareItem: any) => compareItem.name !== info.name
    );
    setCompareList(newList);
    if (newList.length == 0) {
      props.close();
    }
  };

  useEffect(() => {
    if (compareList.length > 3) {
      message.open({
        type: "info",
        content: "You can only add up to 4 apps to compare",
      });
      return;
    }
    const isItemInList = compareList.some(
      (compareItem: any) => compareItem.name == item.name
    );
    // if (!isItemInList) {
    setCompareList([...compareList, item]);
    // }
  }, [item]);

  return (
    <>
      <div className={styls.compareModal}>
        <h3 className={styls.title}>App comparison</h3>
        <i className={styls.close_icon} onClick={() => props.close()}></i>
        <p className={styls.desc}>
          Add up to 3 apps below to see how theycompare. You can also use the
          "Compare'buttons while browsing.
        </p>

        <ul className={styls.list}>
          {compareList.map((item: any) => (
            <li key={item.id}>
              <div className={styls.list_item}>
                <i
                  className={styls.close}
                  onClick={() => handleClose(item)}
                ></i>
                <div className={styls.company_info}>
                  <Image src={item.photo} width={58} height={58} alt="" />
                  <span>{item.name}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={styls.btns}>
          {compareList.length > 0 && (
            <button
              className={styls.remove_btn}
              onClick={() => {
                handleRemoveAll();
                props.close();
              }}
            >
              Remove all
            </button>
          )}

          <button className={styls.btn} onClick={() => handleJumpCompare()}>
            <i className={styls.icon}></i>
            <span>SEE COMPARISON</span>
          </button>
        </div>
      </div>

      {/* {isAddModal && (
        <div className={styls.add_modal}>
          <div className={styls.mask}></div>
          <div className={styls.main}>
            <h3 className={styls.title}>Add an app to compare</h3>
            <i className={styls.close} onClick={() => toggleAddModal()}></i>
            <div className={styls.input_wrap}>
              <Select
                placeholder="Search apps, categories..."
                labelInValue
                filterOption={false}
                onSearch={debounceFetcher}
              >
                {softworeList.map((item: any) => (
                  <Select.Option value={item.name}>{item.name}</Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default CompareModal;
