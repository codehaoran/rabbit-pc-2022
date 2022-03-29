<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter></SubFilter>
      <!-- 商品面板(排序+列表) -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort></SubSort>
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods"></GoodsItem>
          </li>
        </ul>
        <!-- 加载组件 -->
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData"></XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from '@/views/category/components/goods-item'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findCategoryGoods } from '@/api/category'

export default {
  name: 'SibCategory',
  components: {
    GoodsItem,
    SubBread,
    SubFilter,
    SubSort
  },
  setup () {
    const route = useRoute()
    // 加载中
    const loading = ref(false)
    // 是否加载完毕
    const finished = ref(false)
    const goodsList = ref([])
    // 请求参数
    let requestParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      loading.value = true
      // 设置二级分类的id
      requestParams.categoryId = route.params.id
      findCategoryGoods(requestParams).then(({ result }) => {
        // 获取数据成功
        if (result.items.length) {
          goodsList.value.push(...result.items)
          // 追加完成把page改成下一页
          requestParams.page++
        } else {
          // 没有数据代表加载完成
          finished.value = true
        }
        loading.value = false
      })
    }
    // 在更改了二级分类后（路由）重新加载数组
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/category/sub/${route.params.id}` === route.path) {
        finished.value = false
        goodsList.value = []
        requestParams = {
          page: 1,
          pageSize: 20
        }
      }
    }, { immediate: true })
    return {
      getData,
      loading,
      finished,
      goodsList
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  background: #FFF;
  padding: 0 25px;
  margin-top: 25px;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;

    li {
      margin-right: 20px;
      margin-bottom: 20px;

      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }

}
</style>
