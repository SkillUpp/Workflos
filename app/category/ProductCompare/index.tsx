"use client"
import Image from "next/image";
import { useState, useRef } from "react";

interface Props {
	list?: any
}

const ProductCompare = (props: Props) => {
	const { list } = props;
	const [compareList, setCompareList] = useState<any>()
	const hasInitialized = useRef(false);

	/**
	 * 数据设置
	 * @param commonFeatures 
	 * @param support 
	 * @returns 
	 */
	const updateCommonFeaturesWithSupport = (commonFeatures: any, supportFeatures: any) => {
		const supportSlugs = new Set(supportFeatures.map((feature: any) => feature.slug));
		return commonFeatures.map((feature: any) => ({
			...feature,
			show: supportSlugs.has(feature.slug),
		}));
	};

	/**
	 * 数据转换
	 * @param lists 
	 * @returns 
	 */
	const normalizePlatforms = (lists: any) => {
		const largestList = lists.reduce((maxList: any, currentList: any) =>
			currentList.platformsSupported.length > maxList.platformsSupported.length
				? currentList
				: maxList
		);
		const referencePlatforms = largestList.platformsSupported.map((platform: any) => ({
			name: platform.name,
			slug: platform.slug,
			check: true,
		}));

		return lists.map((list: any) => {
			const updatedPlatforms = referencePlatforms.map((refPlatform: any) => {
				const existingPlatform = list.platformsSupported.find(
					(platform: any) => platform.slug === refPlatform.slug
				);
				if (existingPlatform) {
					return { ...refPlatform, check: true };
				} else {
					return { ...refPlatform, check: false };
				}
			});
			return {
				...list,
				platformsSupported: updatedPlatforms,
			};
		});
	}

	/**
	 * 数据转换
	 * @param lists 
	 * @returns 
	 */
	const normalizeTypical = (lists: any) => {
		const largestList = lists.reduce((maxList: any, currentList: any) =>
			currentList.typicalCustomers.length > maxList.typicalCustomers.length
				? currentList
				: maxList
		);
		const referencePlatforms = largestList.typicalCustomers.map((platform: any) => ({
			name: platform.name,
			slug: platform.slug,
			check: true,
		}));

		return lists.map((list: any) => {
			const updatedPlatforms = referencePlatforms.map((refPlatform: any) => {
				const existingPlatform = list.typicalCustomers.find(
					(platform: any) => platform.slug === refPlatform.slug
				);
				if (existingPlatform) {
					return { ...refPlatform, check: true };
				} else {
					return { ...refPlatform, check: false };
				}
			});
			return {
				...list,
				typicalCustomers: updatedPlatforms,
			};
		});
	}

	/**
	 * 
	 * @param lists 
	 * @returns 
	 */
	const normalizeSupportOptions = (lists: any) => {
		// Step 1: Find the list with the most support options
		const largestList = lists.reduce((maxList: { supportOptions: string | any[]; }, currentList: { supportOptions: string | any[]; }) =>
			currentList.supportOptions.length > maxList.supportOptions.length
				? currentList
				: maxList
		);

		// Step 2: Create a reference array based on the largest list's support options
		const referenceSupportOptions = largestList.supportOptions.map((option: any) => ({
			name: option,
			check: true, // Set check = true for the reference list
		}));

		// Step 3: Normalize other lists by comparing with the reference array
		return lists.map((list: { supportOptions: any[]; }) => {
			const updatedSupportOptions = referenceSupportOptions.map((refOption: { name: any; }) => {
				const existingOption = list.supportOptions.find(
					option => option === refOption.name
				);
				if (existingOption) {
					return { ...refOption, check: true };
				} else {
					return { ...refOption, check: false };
				}
			});
			return {
				...list,
				supportOptions: updatedSupportOptions,
			};
		});
	}

	/**
	 * 初始化数据
	 */
	const initData = () => {
		const newList = normalizePlatforms(list);
		const newList1 = normalizeTypical(newList)
		const newList2 = normalizeSupportOptions(newList1)
		newList1.forEach((item: any) => {
			item.commonFeatureSlice = 10
			item.supportFeatureSlice = 10
			item.introduce = item.introduce ? item.introduce.replace(/\\u0026/g, '&') : "";
			item.description = item.description ? item.description.replace(/\\n/g, "<br/>") : ""
			item.description = item.description ? item.description.replace(/\\r/g, "<br/>") : ""
			item.keyBenefits = item.keyBenefits ? item.keyBenefits.replace(/\\n/g, "<br/>") : ""
			item.commonFeatures = updateCommonFeaturesWithSupport(item.commonFeatures, item.supportFeatures);
		})
		console.log(newList2, 'ww');

		setCompareList(newList2)
	}

	if (!hasInitialized.current) {
		initData();
		hasInitialized.current = true;
	}
	return (
		<div className="mt-[86px] bg-gray-200 overflow-x-hidden">
			{compareList && compareList.length > 0 && (
				<>
					<div className="mx-auto px-6 lg:px-[50px] 2xl:px-[200px]">
						<h3 className="text-[42px] font-bold pt-8">Compare</h3>
						<div className="grid gap-4 py-4" style={{ gridTemplateColumns: `repeat(${compareList.length}, minmax(0, 1fr))` }}>
							{compareList.map((item: any, index: number) => (
								<div className="p-4 w-full bg-white rounded-8" key={index}>
									<div className="flex items-center justify-center h-10">
										<Image src={item.photo} alt="" width={40} height={40} />
										<span className="text-xl font-bold ml-4">{item.name}</span>
									</div>
									<p className="text-gray-500 text-center mt-4 truncate-lines-2" dangerouslySetInnerHTML={{
										__html: item?.description,
									}}></p>
								</div>
							))}
						</div>
					</div>


					<div className="mx-auto px-6 lg:px-[50px] 2xl:px-[200px]">
						<div>
							<h3 className="text-[32px] font-bold pt-4">App Info</h3>
							<div className="grid gap-4 mt-4" style={{ gridTemplateColumns: `repeat(${compareList.length}, minmax(0, 1fr))` }}>
								{compareList.map((item: any, index: number) => (
									<div className="p-4 w-full bg-white rounded-8 flex items-stretch flex-col" key={index}>
										<p className="text-gray-500 truncate-lines-3" dangerouslySetInnerHTML={{
											__html: item?.description,
										}}></p>

										<div className="w-full mt-4">
											<h4 className="text-[18px] whitespace-nowrap leading-[1.2] text-[#222] font-bold mt-4 md:mt-0">Platforms supported</h4>
											<ul className="mt-2">
												{item.platformsSupported &&
													item.platformsSupported.map((item: any) => (
														<li className="flex items-center justify-between pt-1" key={item.slug}>
															<span>{item.name}</span>
															{item.check && <i className="w-[20px] h-[20px] ml-[8px] bg-check bg-contain bg-no-repeat bg-center"></i>}
															{!item.check && <i className="w-[20px] h-[20px] ml-[8px] bg-close1 bg-contain bg-no-repeat bg-center"></i>}
														</li>
													))}
											</ul>
										</div>
										<div className="w-full mt-4">
											<h4 className="text-[18px] whitespace-nowrap leading-[1.2] text-[#222] font-bold mt-4 md:mt-0">Typical customers</h4>
											<ul className="mt-2">
												{item.typicalCustomers &&
													item.typicalCustomers.map((item: any) => (
														<li className="flex items-center justify-between pt-1" key={item.slug}>
															<span>{item.name}</span>
															{item.check && <i className="w-[20px] h-[20px] ml-[8px] bg-check bg-contain bg-no-repeat bg-center"></i>}
															{!item.check && <i className="w-[20px] h-[20px] ml-[8px] bg-close1 bg-contain bg-no-repeat bg-center"></i>}
														</li>
													))}
											</ul>
										</div>
										<div key={index} className="w-full mt-4">
											<h4 className="text-[18px] whitespace-nowrap leading-[1.2] text-[#222] font-bold mt-4 md:mt-0">Customer support</h4>
											<ul className="mt-2">
												{item.supportOptions &&
													item.supportOptions.map((item: any) => (
														<li className="flex items-center justify-between pt-1" key={item.name}>
															<span>{item.name}</span>
															{item.check && <i className="w-[20px] h-[20px] ml-[8px] bg-check bg-contain bg-no-repeat bg-center"></i>}
															{!item.check && <i className="w-[20px] h-[20px] ml-[8px] bg-close1 bg-contain bg-no-repeat bg-center"></i>}
														</li>
													))}
											</ul>
										</div>
									</div>
								))}
							</div>
						</div>

					</div>
				</>



			)}
		</div>
	)
}

export default ProductCompare