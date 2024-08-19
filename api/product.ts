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
 * 获取产品列表
 */
export const favoriteList = (data: any) => {
  return request({
    url: `/api/v1/favorite-item/list?${qs.stringify(data)}`,
    method: "GET",
  });
};


/**
 * 关注
 */
export const addFavorite = (data: any) => {
  return request({
    url: `/api/v1/favorite-item/add-favorite`,
    method: "POST",
    data
  });
};

/**
 * 取消关注
 */
export const removeFavorite = (data: any) => {
  return request({
    url: `/api/v1/favorite-item/remove-favorite`,
    method: "POST",
    data
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

/**
 * 校验公司是否存在
 * @param data 
 * @returns 
 */
export const checkExistList = (data: any) => {
  return request({
    url: `/api/v1/item/check-exist-list`,
    method: "POST",
    data
  });
};
