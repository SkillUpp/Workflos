"use client";
import { message } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/userStore";

interface ICompareModalProps {
  close: () => void;
  item: any;
}

const CompareModal = (props: ICompareModalProps) => {
  const { item } = props;
  const route = useRouter();
  const { updateCompareStr } = useStore();
  const [compareList, setCompareList] = useState<any>([]);

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
      <div className="fixed top-[280px] left-1/2 transform -translate-x-1/2 w-[312px] bg-white rounded-lg p-[22px] shadow-lg">
        <h3 className="text-[20px] leading-[40px] font-bold text-black">
          App comparison
        </h3>
        <i
          className="absolute top-[16px] right-[16px] w-[20px] h-[20px] bg-[url('/images/close.svg')] bg-cover cursor-pointer"
          onClick={() => props.close()}
        ></i>
        <p className="text-[14px] leading-[1.2] text-[#454545]">
          {`Add up to 3 apps below to see how they compare. You can also use the
          "Compare" buttons while browsing.`}
        </p>

        <ul className="pt-[16px] list-none">
          {compareList.map((item: any) => (
            <li
              key={item.id}
              className="relative mt-[8px] w-full h-[60px] border border-dashed border-black rounded-[4px] box-border"
            >
              <div className="flex items-center h-full px-[16px]">
                <i
                  className="w-[24px] h-[24px] bg-closeCircle bg-cover cursor-pointer"
                  onClick={() => handleClose(item)}
                ></i>
                <div className="flex items-center pl-[12px] w-[calc(100%-24px)]">
                  <div className="w-10 h-10 rounded-8">
                    <Image
                      className="w-full h-full rounded-8"
                      src={item.photo}
                      width={40}
                      height={40}
                      alt=""
                      onError={(e) => {
                        e.currentTarget.src = "https://aitracker.ai/empty.jpeg";
                      }}
                    />
                  </div>
                  <span className="w-[calc(100%-40px)] pl-[12px] text-[16px] font-bold leading-[1.2] truncate-lines-1 text-[#222]">
                    {item.name}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center mt-[12px]">
          {compareList.length > 0 && (
            <button
              className="text-[16px] text-purple-600 hover:opacity-70"
              onClick={() => {
                handleRemoveAll();
                props.close();
              }}
            >
              Remove all
            </button>
          )}
          <button
            className="flex justify-center items-center bg-purple-600 text-white rounded-[5px] w-full h-[32px] mt-[8px] hover:opacity-70"
            onClick={() => handleJumpCompare()}
          >
            <i className="w-[20px] h-[20px] bg-compareWhite bg-cover"></i>
            <span className="pl-[8px] text-white">SEE COMPARISON</span>
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
