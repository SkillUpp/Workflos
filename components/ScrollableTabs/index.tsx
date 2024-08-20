import { useRef, useState } from "react";

const ScrollableTabs = ({ tabs, onTabClick }: any) => {
	const containerRef = useRef(null);
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);

	const handleClick = (index: number, tab: any) => {
		setSelectedTabIndex(index);

		const container = containerRef.current as any;
		const tabElement = container.children[index];

		const tabWidth = tabElement.getBoundingClientRect().width;
		const containerWidth = container.getBoundingClientRect().width;
		const scrollPosition = tabElement.offsetLeft - containerWidth / 2 + tabWidth / 2;

		container.scrollTo({
			left: scrollPosition,
			behavior: "smooth",
		});

		onTabClick(tab, index);
	};

	return (
		<div className="overflow-x-auto scrollbar-hide bg-white h-10 flex px-2" ref={containerRef}>
			{tabs.map((tab: any, index: number) => (
				<button
					key={tab.name}
					className={`px-4 py-2 whitespace-nowrap ${index === selectedTabIndex ? 'text-[#9747ff] border-b border-b-[#9747ff] font-bold' : 'text-gray-600'}`}
					onClick={() => handleClick(index, tab)}
				>
					{tab.name}
				</button>
			))}
		</div>
	);
};

export default ScrollableTabs;
