import qs from "qs";
import request from "@/utils/request";
import Launch from '../app/launch/page';

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
export const productDetail = () => {
  return request({
    url: "/api/v1/item/detail",
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
export const launchDetail = () => {
  return request({
    url: "/api/v1/launch/detail",
  });
};