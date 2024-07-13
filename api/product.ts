import qs from "qs";
import request from "@/utils/request";

/**
 * 获取产品列表
 */
export const productList = (data: any) => {
  return request({
    url: `/api/v1/item/list?${qs.stringify(data)}`,
    method: "GET",
  });
};

/**
 * 获取产品详情信息
 */
export const productDetail = (data: any) => {
  return request({
    url: "/api/v1/item/detail",
    method: "POST",
    data,
  });
};
