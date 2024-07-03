import request from "@/utils/request";

/**
 * 获取blog 列表
 */
export const blogList = (url: string) => {
  return request({
    url,
  });
};

export const blogDetail = (id: string) => {
  return request({
    url: `/items/blog/${id}`,
  });
};

export const createContact = (data: any) => {
  return request({
    method: "POST",
    url: `/items/alphaDAO`,
    data,
  });
};
