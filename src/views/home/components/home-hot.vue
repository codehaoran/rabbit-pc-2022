<template>
  <HomePanel ref="target" title="人气推荐" sub-title="人气爆款 不容错过">
    <Transition name="fade">
      <ul v-if="goods.length" ref="pannel" class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <p class="name">{{item.title}}</p>
            <p class="desc">{{item.alt}}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else />
    </Transition>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
import { findHot } from '@/api/home'
import { useLazyData } from '@/hooks'

export default {
  name: 'home-hot',
  setup () {
    // const goods = ref([])
    // findHot().then(data => {
    //   goods.value = data.result
    // })
    // const target = ref(null)
    const { result, target } = useLazyData(findHot)
    return { goods: result, target }
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
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
