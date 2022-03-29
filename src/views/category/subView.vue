<template>
  <div class="sub-category">
    <div class="container">
<!--      面包屑-->
      <SubBread></SubBread>
<!--      筛选区-->
      <SubFilter></SubFilter>
<!--      测试复选框-->
<!--      <XtxCheckbox v-model="isAllChecked">全选</XtxCheckbox>{{isAllChecked}}-->
<!--      商品面板(排序+列表)-->
      <div class="goods-list">
        <SubSort></SubSort>
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import { ref } from 'vue'
export default {
  name: 'SibCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort
  },
  setup () {
    const isAllChecked = ref(true)
    return { isAllChecked }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  background: #FFF;
  padding: 0 25px;
  margin-top: 25px;

}
</style>
