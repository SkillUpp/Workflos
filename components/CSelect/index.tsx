// components/CustomSelect.tsx

import { useState, useRef, useEffect } from "react";

interface CustomSelectProps {
  options: any[];
  onSelect: (value: any) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option.label);
    onSelect(option.label);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative">
      <div
        className="bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 block w-full leading-tight cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="text-sm whitespace-nowrap">{selectedOption || "Select an option"}</span>
        <svg
          className="fill-current h-4 w-4 absolute right-0 top-0 m-3 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M10 12l5-5H5l5 5z" />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 shadow-lg rounded-md">
          {options.map((option, index) => (
            <div
              key={index}
              className="py-2 px-4 cursor-pointer text-sm whitespace-nowrap hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
