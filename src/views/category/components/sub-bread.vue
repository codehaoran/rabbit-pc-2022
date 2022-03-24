<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem :key="category.sub.id" v-if="category.sub">{{category.sub.name}}</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'SubBread',
  setup () {
    // vuex获取顶级和二级类目数据
    // 数据对象： {top:{id,name},children:{id,name}}
    const store = useStore()
    const route = useRoute()
    const category = computed(() => {
      const cate = {}
      // 获取数据
      store.state.category.list.forEach(top => {
        if (top.children) {
          const sub = top.children.find(sub => sub.id === route.params.id)
          if (sub) {
            cate.top = { id: top.id, name: top.name }
            cate.sub = { id: sub.id, name: sub.name }
          }
        }
      })
      console.log(cate)
      return cate
      // sub: {id: '109248004', name: '宠物用品'}
      // top: {id: '1005000', name: '居家'}
    })
    return { category }
  }
}
</script>

<style lang="less" scoped>

</style>
