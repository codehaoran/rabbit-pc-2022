import request from '@/utils/request'

/**
 * @param id 商品id
 */
export const findGoodsId = (id) => {
  return request('/goods', 'get', { id })
}
