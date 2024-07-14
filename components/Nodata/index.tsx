import styls from "./index.module.css";
const NoData = () => {
  return (
    <div className={styls.noData}>
      <i className={styls.icon}></i>
      <span>No Data</span>
    </div>
  );
};



export default NoData;