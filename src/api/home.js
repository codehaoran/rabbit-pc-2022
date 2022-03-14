// 首页api
import request from '@/utils/request'

/**
 * 获取品牌
 * @param {Integer} limit - 品牌个数
 * @returns {*|AxiosPromise}
 */
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}

/**
 * 获取广告区轮播图
 * @returns {*|AxiosPromise}
 */
export const findBanner = () => {
  return request('/home/banner', 'get')
}

/**
 * 获取新鲜好物
 * @returns {*|AxiosPromise}
 */
export const findNew = () => {
  return request('/home/new', 'get')
}

/**
 * 获取热门商品
 * @returns {*|AxiosPromise}
 */
export const findHot = () => {
  return request('/home/hot', 'get')
}
