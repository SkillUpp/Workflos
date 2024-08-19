"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { productDetail, productList } from '@/api/product';
import { JSONDATA } from './company';
import ProductDetailComp from './detail/page';

const Home = () => {
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [filteredOptions, setFilteredOptions] = useState({});
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    let currentIndex = 0;

    async function fetchDataByName() {
      if (currentIndex >= JSONDATA.length) {
        clearInterval(intervalId); // 请求完所有数据后停止请求
        return;
      }
      const currentItem = JSONDATA[currentIndex];
      console.log(currentItem, 'currentItem')
      const res = await productDetail(encodeURIComponent(currentItem.name));
      if (res) {
        setFilteredOptions(res)
      }

      currentIndex++;
      setRequestCount(prevCount => prevCount + 1); // 更新请求次数
    }

    const intervalId = setInterval(fetchDataByName, 2000); // 每8秒调用一次

    return () => clearInterval(intervalId); // 清理定时任务
  }, []);

  const downloadJson = () => {
    const jsonData = JSON.stringify(fetchedData, null, 2); // 格式化为 JSON 字符串
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fetched_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>API Data Fetching and JSON Download</h1>
      <p className='btn btn-primary mt-20'>Requests made: {requestCount}</p> {/* 显示请求次数 */}
      <button onClick={downloadJson} disabled={fetchedData.length === 0} className='btn btn-primary mt-20'>
        Download JSON
      </button>

      <ProductDetailComp info={filteredOptions} index={requestCount}/>
    </div>
  );
};

export default Home;
