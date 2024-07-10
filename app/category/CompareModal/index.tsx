"use client";
import styls from "./index.module.css";
import SoftIcon from "@/images/soft-icon.png";
import Image from "next/image";
import { useState } from "react";
const list = [{ id: 1, name: "App 1", image: SoftIcon }];

interface ICompareModalProps {
  close: () => void;
}

const CompareModal = (props: ICompareModalProps) => {
  const [isAddModal, setAddModal] = useState(false);
  const [compareList, setCompareList] = useState(list);
  const toggleAddModal = () => setAddModal(!isAddModal);

  /**
   * remove all
   */
  const handleRemoveAll = () => {
    setCompareList([]);
  };

  return (
    <>
      <div className={styls.compareModal}>
        <h3 className={styls.title}>App comparison</h3>
        <i className={styls.close_icon} onClick={() => props.close()}></i>
        <p className={styls.desc}>
          Add up to 4 apps below to see how theycompare. You can also use the
          "Compare'buttons while browsing.
        </p>

        <ul className={styls.list}>
          {compareList.map((item) => (
            <li key={item.id}>
              {item.image ? (
                <div className={styls.list_item}>
                  <i className={styls.close}></i>
                  <Image src={SoftIcon} width={160} height={58} alt="" />
                </div>
              ) : (
                <i className={styls.add} onClick={() => toggleAddModal()}></i>
              )}
            </li>
          ))}
        </ul>
        <div className={styls.btns}>
          <button
            className={styls.remove_btn}
            onClick={() => handleRemoveAll()}
          >
            Remove all
          </button>

          <button className={styls.add_btn} onClick={() => toggleAddModal()}>
            <i className={styls.icon}></i>
            <span>Add COMPARISON</span>
          </button>
          <button className={styls.btn}>
            <i className={styls.icon}></i>
            <span>SEE COMPARISON</span>
          </button>
        </div>
      </div>

      {isAddModal && (
        <div className={styls.add_modal}>
          <div className={styls.mask}></div>
          <div className={styls.main}>
            <h3 className={styls.title}>Add an app to compare</h3>
            <i className={styls.close} onClick={() => toggleAddModal()}></i>
            <div className={styls.input_wrap}>
              <input type="text" placeholder="Search apps, categories..." />
              <i className={styls.search}></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompareModal;
