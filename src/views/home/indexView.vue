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
<HomeNew />
<!--  人气推荐-->
  <HomeHot />
<!--  品牌组件-->
  <HomeBrand />
<!--  商品区块-->
  <HomeProduct />
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
import HomeBrand from './components/home-brand'
import HomeProduct from './components/home-product'
export default {
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct
  }
}
</script>

<style lang="less" scoped>
</style>
