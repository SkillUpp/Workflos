"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { productList } from '@/api/product';
import { JSONDATA } from './company';

const Home = () => {
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    let currentIndex = 0;

    async function fetchDataByName() {
      if (currentIndex >= JSONDATA.length) {
        clearInterval(intervalId); // 请求完所有数据后停止请求
        return;
      }
      
      const currentItem = JSONDATA[currentIndex];
      const params = {
        limit: 5,
        page: 1,
        keyword: currentItem.name,
      };

      const res = await productList(params);
      if (res.data && res.data.list) {
        setFilteredOptions(prevOptions => [...prevOptions, ...res.data.list]); // 累积返回的数据到filteredOptions
        setFetchedData(prevData => [...prevData, ...res.data.list]); // 累积返回的数据到fetchedData
      }

      currentIndex++;
      setRequestCount(prevCount => prevCount + 1); // 更新请求次数
    }

    const intervalId = setInterval(fetchDataByName, 1000); // 每8秒调用一次

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
      <p  className='btn btn-primary mt-20'>Requests made: {requestCount}</p> {/* 显示请求次数 */}
      <button onClick={downloadJson} disabled={fetchedData.length === 0} className='btn btn-primary mt-20'>
        Download JSON
      </button>

      {filteredOptions.length > 0 &&
        filteredOptions.map((option: any, index: number) => (
          <div
            key={index}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
          >
            {option.logo && (
              <Image
                src={option.logo}
                alt=""
                width={32}
                height={32}
                className="rounded-md"
              />
            )}
            <span className="ml-4 font-bold text-md overflow-hidden text-ellipsis whitespace-nowrap text-[#333333]">
              {option.name}
            </span>
          </div>
        ))}
    </div>
  );
};

export default Home;
