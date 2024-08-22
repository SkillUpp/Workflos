import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import SearchIcon from "@/images/search.svg";
import { productList } from "@/api/product";
import { useRouter } from "next/navigation";
import LoadingIcon from "@/images/loading.svg";
import { useStore } from "@/store/userStore";
import { LoginDialog } from "@/utils/utils";
import { AUTH0_LOGIN_URL } from "@/utils/constant";

function debounce(func: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const Select = () => {
  const route = useRouter();
  const { user } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>("");
  const [filteredOptions, setFilteredOptions] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * 获取产品列表
   */
  const getProductList = async (str: string) => {
    const params = {
      limit: 5,
      page: 1,
      keyword: str,
    };
    setLoading(true);
    setFilteredOptions([]);
    const res = await productList(params);
    if (res.data) {
      console.log(res.data.list, "list");

      setFilteredOptions(res.data.list);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setFilteredOptions([]);
  };

  const handleSelectOption = (option: any) => {
    setSelectedOption("");
    setIsOpen(false);
    if (!user?.uid) {
      localStorage.setItem("redirect_url", option.name);
      window.location.href = AUTH0_LOGIN_URL;
      return;
    }
    if (user?.uid) {
      route.push("/product/" + option.name);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    if (term.trim() === "") {
      setFilteredOptions([]);
      setSelectedOption(term);
    } else {
      setSelectedOption(term);
      if (term.length > 1) {
        debouncedFetchData(term);
      }
    }
  };

  const debouncedFetchData = useCallback(
    debounce(async (value) => {
      handleSearch(value);
    }, 600),
    []
  );

  const handleSearch = (val?: string) => {
    getProductList(val ? val : selectedOption);
    setIsOpen(true);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative z-40" ref={dropdownRef}>
      <div className="inline-block relative w-full">
        <div>
          <input
            className="placeholder-ellipsis w-full pl-4 pr-8 py-2 rounded-2xl border border-r border-[#9747FF] focus:outline-none focus:border-[#9747FF] text-[#333333]"
            type="text"
            placeholder="Search for any company"
            value={selectedOption ? selectedOption : ""}
            onChange={handleInputChange}
            onKeyUp={handleKeyDown}
          />
          <Image
            onClick={() => handleSearch()}
            src={SearchIcon}
            alt="Search"
            className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
            width={24}
            height={20}
          />
        </div>
        {isOpen && (
          <div className="absolute h-[250px] z-10 mt-2 w-full rounded-lg shadow-lg bg-white border border-gray-300">
            {loading && (
              <div className="px-4 py-2 text-gray-500 flex items-center justify-center h-[246px]">
                <Image
                  src={LoadingIcon}
                  alt=""
                  width={20}
                  height={20}
                  className="animate-spin"
                />
                <span className="pl-4">Loading...</span>
              </div>
            )}
            {filteredOptions.length === 0 && !loading && (
              <div className="px-4 py-2 text-gray-500 h-[246px] flex items-center justify-center">
                No data
              </div>
            )}
            {filteredOptions.length > 0 &&
              filteredOptions.map((option: any) => (
                <div
                  key={option.name}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                  onClick={() => handleSelectOption(option)}
                >
                  {option.photo && (
                    <div className="rounded-md w-8 h-8 flex items-center justify-center">
                      <Image
                        src={option.photo}
                        alt=""
                        width={28}
                        height={28}
                        className="rounded-md w-full h-full object-fill"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://aitracker.ai/empty.jpeg";
                        }}
                      />
                    </div>
                  )}
                  <span className="ml-4 font-bold text-md overflow-hidden text-ellipsis whitespace-nowrap text-[#333333]">
                    {option.name}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
