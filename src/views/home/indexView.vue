<template>
  <!--  首页入口（分类+广告）-->
  <div class="entry">
    <div class="container">
    <!--  左侧分类  -->
      <HomeCategory />
    <!--  轮播图  -->
      <HomeBanner />
    </div>
  </div>
<!--  新鲜好物-->
<!--  人气推荐-->
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
export default {
  components: {
    HomeCategory,
    HomeBanner
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/styles/mixins";
@import "src/assets/styles/variables.less";

</style>
