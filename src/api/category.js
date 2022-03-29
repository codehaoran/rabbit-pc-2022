// 分类数据api
import request from '@/utils/request'

/**
 * 获取所有分类（顶级，二级，其对应商品）
 * @returns {*|AxiosPromise}
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

/**
 * 获取顶级类目信息
 * @param  {String} id
 * @returns {*|AxiosPromise}
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

/**
 *
 * @param  id 二级分类的id
 * @returns {*|AxiosPromise}
 */
export const findSubFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

/**
 * 获取分类下的商品
 * @param params {Object}
 * @returns {*|AxiosPromise}
 */
export const findCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}
