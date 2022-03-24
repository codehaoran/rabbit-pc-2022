<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{topCategory.name}}</XtxBreadItem>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height:500px" autoPlay />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" >
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
    <!--各个分类下的推荐商品-->
      <div v-for="item in subList" :key="item.id" class="ref-goods">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore :path="`/category/sub/${item.id}`" />
        </div>
        <div class="body">
          <GoodsItem v-for="goods in item.goods" :key="goods.id" :goods="goods" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { findBanner, findTopCategory } from '@/api/home'
import { useStore } from 'vuex'
import GoodsItem from './components/goods-item.vue'

export default {
  name: 'TopCategory',
  setup () {
    // 轮播图
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })
    // 面包屑+所有子分类
    const route = useRoute()
    const store = useStore()
    const topCategory = computed(() => {
      const item = store.state.category.list.find(item => {
        return item.id === route.params.id
      })
      if (item) return item
      else return {}
    })
    // 获取各个子类目下推荐商品
    const subList = ref({})
    // subList.value = result
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children
      })
    }
    watch(() => route.params.id, (newVal) => {
      newVal && getSubList()
    }, { immediate: true })
    return { sliders, topCategory, subList }
  },
  components: {
    GoodsItem
  }
}
</script>

<style scoped lang="less">
@import "src/assets/styles/mixins";
@import "src/assets/styles/variables.less";
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
