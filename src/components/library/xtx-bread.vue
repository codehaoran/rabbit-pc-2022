<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render () {
    /**
     * 用法
     * 1.template标签去除，单文件组件
     * 2.返回值就是组件内容
     * 3.vue2的h函数是传参进来，vue3的h函数需要导入进来
     * 4.h的第一个参数 标签名字 第二个 标签属性对象 第三个 子节点
     */
    /**
     * 需求
     * 1.创建xtx-bread父容器
     * 2.获取默认插槽内容
     * 3.去除xtx-bread-item组件的i标签 应该由reader函数创建
     * 4.遍历插槽中的item得到一个动态创建的节点 最后一个item不加i标签
     * 5.把动态创建的节点渲染在xtx-bread标签中
     */
    // 获取到indexView传来的插槽
    const items = this.$slots.default()
    const dynamicItem = []
    items.forEach((item, i) => {
      dynamicItem.push(item)
      if (i < items.length - 1) dynamicItem.push(h('i', { class: 'iconfont icon-angle-right' }))
    })
    return h('div', { class: 'xtx-bread' }, dynamicItem)
  }
}
</script>

<style lang='less'>
// 不使用scope 让样式作用到xtx-bread-item
@import "src/assets/styles/mixins";
@import "src/assets/styles/variables.less";
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
