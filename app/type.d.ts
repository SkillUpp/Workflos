/**
 * 分类信息
 */
export interface ICategoryList {
  name: string;
  total: number;
}

/**
 * 产品分类信息
 */
export interface IProductCategoryList {
  id: number;
  name: string;
  slug: string;
  cta_urls: {
    detail: string;
  };
}

/**
 * 产品信息
 */
export interface IPorductList {
  name: string;
  introduce: string;
  category: IProductCategoryList[];
  description: string;
  photo: string;
}
