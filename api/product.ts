import qs from "qs";
import request from "@/utils/request";

/**
 * 获取搜索列表
 */
export const categoryList = () => {
  return request({
    url: `/api/v1/item/categories`,
    method: "GET",
  });
};

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
export const productDetail = (name: string) => {
  return request({
    url: "/api/v1/item/detail?name=" + name,
  });
};

/**
 * 获取launch列表
 */
export const launchList = (data: any) => {
  return request({
    url: `/api/v1/launch/list?${qs.stringify(data)}`,
    method: "GET",
  });
};


/**
 * 获取launch详情信息
 */
export const launchDetail = (name: string) => {
  return request({
    url: "/api/v1/launch/detail?name=" + name,
  });
};