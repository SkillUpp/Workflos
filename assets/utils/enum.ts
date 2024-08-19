import Ins from "@/images/ins-b.svg";
import twitter from "@/images/x.svg";
import facebook from "@/images/facebok-b.svg";
/**
 * 产品字典
 */
export const productEnumList = [
  { id: 1, name: "CRM", value: "CRM" },
  { id: 2, name: "CallCenter", value: "CallCenter" },
  { id: 3, name: "Accounting", value: "Accounting" },
];

/**
 * 排序值字典
 */
export const sortOfRateEnumList = [
  {
    id: 1,
    name: "Highest rated",
    value: "HighestRated",
    active: true,
  },
  {
    id: 2,
    name: "Category leaders",
    value: "CategoryLeaders",
    active: false,
  },
  {
    id: 3,
    name: "Ease of use",
    value: "EaseOfUse",
    active: false,
  },
  {
    id: 4,
    name: "Value for money",
    value: "ValueForMoney",
    active: false,
  },
];

interface ISocialMedia {
  linkedin: string;
  twitter: string;
  facebook: string;
}
export const MEDIA_TYPE: ISocialMedia = {
  linkedin: Ins,
  twitter: twitter,
  facebook: facebook,
};
