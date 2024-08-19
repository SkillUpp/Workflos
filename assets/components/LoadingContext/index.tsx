import styls from "./index.module.css";

const LoadingContext = () => {
  return (
    <div className={styls.loadingMain}>
      <div className={styls.loadingWrap}>
        <i className={styls.loadingSvg}></i>
      </div>
    </div>
  );
};

export default LoadingContext;
