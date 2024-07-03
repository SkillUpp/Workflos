import Link from "next/link";
import styls from "./index.module.css";

export default async function Home() {
  return (
    <div className={styls.main}>
      <div className={styls.searchPanel}>
        <div className={styls.searchPanel__input}>
          <div className={styls.search__content}>
            <h3 className={styls.title}>
              Where business leaders find software
            </h3>
            <div className={styls.input_wrap}>
              <input
                type="text"
                placeholder="Search apps, categories, reviews..."
              />
              <i className={styls.search}></i>
            </div>
          </div>

          <div className={styls.button__content}>
            <h3 className={styls.title}>
              Explore software categories customers love
            </h3>
            <div className={styls.button_wrap}>
              <button className={styls.btn}>CRM Software</button>
              <i className={styls.arrow}></i>
            </div>
          </div>
        </div>
        <div className={styls.searchPanel__bg}>

          <div className={styls.product_info}>
            <h3 className={ styls.title}>37K+</h3>
            <p className={ styls.desc}>Software profiles</p>
          </div>
        </div>
      </div>
    </div>
  );
}
