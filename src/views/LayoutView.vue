<template>
  <!-- 顶部 -->
  <AppNavbar />
  <!-- 吸顶头部 -->
  <AppHeaderSticky />
  <!-- 头部 -->
  <AppHeader />
  <!-- 内容容器 -->
  <div class="main">
    <!-- 二级路由 -->
    <router-view></router-view>
  </div>
  <!-- 底部 -->
  <AppFooter />
</template>
<script>
import AppNavbar from '@/components/app-navbar.vue'
import AppHeader from '@/components/app-header.vue'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import AppFooter from '@/components/app-footer.vue'

import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  },
  components: {
    AppNavbar, AppHeader, AppFooter, AppHeaderSticky
  }
}
</script>
