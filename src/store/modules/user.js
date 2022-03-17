// 用户模块

export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '13234',
        mobile: '1',
        token: ''
      }
    }
  },
  Mutations: {
    // 退出登录
    logOut (state, payload) {
      this.state.profile = {}
    },
    // 修改用户信息
    setUser (state, payload) {
      state.profile = payload
    }
  }
}
