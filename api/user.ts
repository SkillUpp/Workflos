import request from "@/utils/request";

/**
 * 获取用户信息
 */
export const userInfo = () => {
  return request({
    url: "/api/v1/user/me",
    method: "GET",
  });
};
