<template>
  <div class="top-category">
    <div class="container">
    <!--面包屑-->
      <XtxBread>
        <XtxBreadItem :to="{path: '/'}">首页</XtxBreadItem>
        <XtxBreadItem :to="{path: '/category/100500'}">电器</XtxBreadItem>
        <XtxBreadItem>电饭锅</XtxBreadItem>
      </XtxBread>
    <!--轮播图-->
    <!--全部分类-->
    <!--各个分类下的推荐商品-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopCategory'
}
</script>

<style lang="less" scoped>

</style>
