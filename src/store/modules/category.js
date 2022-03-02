// 分类模块
import { topCategory } from '@/api/constants.js'
import { findAllCategory } from '@/api/category.js'

export default {
  namespaced: true,
  state () {
    return {
      // 分类信息，依赖topCategory重新设置，保证有初始化数据
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 修改
  mutations: {
    // payload所以分类的集合
    setList (state, payload) {
      state.list = payload
    },
    // 定义和show和hide函数，控制二级分类显示和隐藏
    show (state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = true
    },
    hide (state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = false
    }
  },
  // 获取分类函数
  actions: {
    async getList ({ commit }) {
      // 获取分类数据
      const date = await findAllCategory()
      // 给每个分类加上控制二级分类显示隐藏的数据
      date.result.forEach(top => {
        top.open = false
      })
      // 修改分类数据
      commit('setList', date.result)
    }
  }
}
