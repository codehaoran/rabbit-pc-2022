<template>
<div ref="target" class="home-new">
  <home-panel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #right><xtx-more path="/" /></template>
    <!-- 面板内容 -->
    <Transition name="fade">
      <ul v-if="goods.length" class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="">
            <p class="name ellipsis">{{item.name}}</p>
            <p class="price">&yen;{{item.price}}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton bg="#f0f9f4" v-else />
    </Transition>
  </home-panel>
</div>
</template>

<script>
import { useLazyData } from '@/hooks'
import { findNew } from '@/api/home'
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
export default {
  name: 'home-new',
  setup () {
    const { result, target } = useLazyData(findNew)
    return {
      goods: result,
      target
    }
  },
  components: {
    HomePanel, HomeSkeleton
  }
}
</script>

<style lang="less" scoped>
@import "src/assets/styles/mixins";
@import "src/assets/styles/variables.less";
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
