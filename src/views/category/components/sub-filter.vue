<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a @click="changeBrands(item.id)" :class="{ active: filterData.selectedBrand === item.id }"
           href="javascript:;" v-for="item in filterData.brands" :key="item.id">{{ item.name }}{{ filterData.selectedBrand }}</a>
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}</div>
      <div class="body">
        <!--        <a href="javascript:;">全部</a>-->
        <a @click="changeSub(item,sub.id)" :class="{ active: item.selectAttr === sub.id }" href="javascript:;"
           v-for="sub in item.properties" :key="sub.id">{{ sub.name }}</a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton animated class="item" width="800px" height="40px"/>
    <XtxSkeleton animated class="item" width="800px" height="40px"/>
    <XtxSkeleton animated class="item" width="600px" height="40px"/>
    <XtxSkeleton animated class="item" width="600px" height="40px"/>
    <XtxSkeleton animated class="item" width="600px" height="40px"/>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubFilter } from '@/api/category'

export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const route = useRoute()
    const filterLoading = ref(false)
    const filterData = ref(null)
    // 监听子分类路由id
    watch(() => route.params.id, (newVal) => {
      // 判断切换路由时是否为子分类
      if (newVal && `/category/sub/${newVal}` === route.path) {
        findSubFilter(newVal).then(data => {
          filterLoading.value = true
          // 每一组筛选条件都缺少”全部“,处理数据 加上全部
          // 每一组数据加上一个是否选中的ID
          // 1.品牌

          data.result.selectedBrand = null
          data.result.brands.unshift({
            id: null,
            name: '全部'
          })
          // 属性
          data.result.saleProperties.forEach(item => {
            item.selectAttr = null
            item.properties.unshift({
              id: null,
              name: '全部'
            })
          })
          console.log(data.result)
          filterData.value = data.result
          filterLoading.value = false
        })
      }
    }, { immediate: true })
    // 获取筛选参数
    const getFilterParams = () => {
      const obj = {
        brandId: null,
        attrs: []
      }
      // 品牌
      obj.brandId = filterData.value.selectedBrand
      // 销售属性
      filterData.value.saleProperties.forEach(item => {
        if (item.selectAttr) {
          const prop = item.properties.find(prop => prop.id === item.selectAttr)
          obj.attrs.push({
            groupName: item.name,
            propertyName: prop.name
          })
        }
      })
      if (obj.attrs.length === 0) obj.attrs = null
      return obj
    }
    // 记录当前选择的品牌
    const changeBrands = (brandId) => {
      if (filterData.value.selectedBrand === brandId) return
      filterData.value.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }
    // 记录当前选择的销售属性
    const changeSub = (item, subId) => {
      if (item.selectAttr === subId) return
      item.selectAttr = subId
      emit('filter-change', getFilterParams())
    }
    return {
      filterData,
      filterLoading,
      changeBrands,
      changeSub
    }
  }
}
</script>
<style scoped lang='less'>
@import "src/assets/styles/mixins";
@import "src/assets/styles/variables.less";
// loading 骨架
.xtx-skeleton {
  padding: 10px 0;
}

// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;

  .item {
    display: flex;
    line-height: 40px;

    .head {
      width: 80px;
      color: #999;
    }

    .body {
      flex: 1;

      a {
        margin-right: 36px;
        transition: all .3s;
        display: inline-block;

        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
