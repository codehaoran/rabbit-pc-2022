// 分类数据api
import request from '@/utils/request'

/**
 * 获取所有分类（顶级，二级，其对应商品）
 * @returns {*|AxiosPromise}
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
