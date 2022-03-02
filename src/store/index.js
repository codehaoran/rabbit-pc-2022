import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// 三个模块
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'
export default createStore({
  state: {
    username: 'hr'
  },
  // 计算属性
  getters: {
    newName (state) {
      return state.username + '!!!'
    }
  },
  mutations: {
    updateName (state) {
      state.username = 'dijia'
    }
  },
  actions: {
  },
  modules: {
    cart,
    user,
    category
  },
  // 配置插件
  plugins: [
    // 默认存储在localStorage
    createPersistedState({
      // 本地存储的名字
      key: 'eribbit-pc-store',
      // 指定需要存储的模块
      paths: ['user', 'cart']
    })
  ]
})
