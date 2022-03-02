<template>
  <div class="container">
  <!--  首页入口（分类+广告）-->
    <div class="entry">
    <!--  左侧分类  -->
      <HomeCategory />
    <!--  轮播图  -->
    </div>
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
export default {
  components: {
    HomeCategory
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/styles/mixins";
@import "src/assets/styles/variables.less";

</style>
