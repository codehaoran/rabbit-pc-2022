<template>
  <div class='xtx-goods-page' v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{ goods.categories[1].name }}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{ goods.categories[0].name }}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <goods-image :images="goods.mainPictures" />
        </div>
        <div class="spec"></div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant v-if="goods"/>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-images'
import { findGoodsId } from '@/api/product'
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'XtxGoodsPage',
  components: { GoodsImage, GoodsRelevant },
  setup () {
    // 获取商品详情数据
    const goods = useGoods()
    return { goods }
  }
}
const useGoods = () => {
  const goods = ref(null)
  const route = useRoute()
  console.log(route.path)
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoodsId(route.params.id).then(data => {
        // 让商品数据为空，然后使用v-if指令可以使组件创建和销毁 重新加载数据
        goods.value = null
        nextTick(() => {
          goods.value = data.result
        })
        console.log(data.result)
      })
    }
  }, { immediate: true })
  return goods
}
</script>

<style scoped lang='less'>

.goods-info {

  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
