<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li v-for="item in list" :key="item.id" @mouseenter="showFn(item.id)" @mouseleave="hideFn(item.id)" >
      <RouterLink @click="hideFn(item.id)" :to="`/category/${item.id}`">{{item.name}}</RouterLink>
      <div class="layer" :class="{open: item.open}">
        <ul>
          <li v-for="itemSon in item.children" :key="itemSon.id">
            <RouterLink @click="hideFn(item.id)" :to="`/category/sub/${itemSon.id}`">
              <img :src="itemSon.picture" alt="">
              <p>{{itemSon.name}}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'app-header-nav',
  setup () {
    const store = useStore()
    const list = computed(() => {
      return store.state.category.list
    })

    // 跳转的时候不会关闭二级类目，通过数据来控制
    // 1.vuex每个分类加上open数据
    // 2.vuex提供显示和影藏的函数，修改open数据
    // 3.在组件中使用vuex中的函数，提供一个用来显示隐藏的类名
    const showFn = (id) => {
      store.commit('category/show', id)
    }
    const hideFn = (id) => {
      store.commit('category/hide', id)
    }
    return {
      list, showFn, hideFn
    }
  }
}
</script>

<style scoped lang="less">
@import "src/assets/styles/mixins";
@import "src/assets/styles/variables.less";
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      > .layer {
        //height: 132px;
        //opacity: 1;
      }
    }
  }
}

// 二级菜单样式
.layer {
  &.open {
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
32
