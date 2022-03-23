// 扩展vue原有功能：全局组件，自定义指令，挂载原型方法，
// vue2插件写法：导出一个对象，有install函数，默认传入Vue构造函数，Vue基础之上扩展
// vue3插件写法：导出一个对象，有install函数，默认传入app构造函数，Vue基础之上扩展

import defaultImg from '@/assets/images/200.png'
// import XtxSkeleton from '@/components/library/xtx-skeleton'
// import XtxCarousel from '@/components/library/xtx-carousel'
// import XtxMore from '@/components/library/xtx-more'
// import XtxBread from '@/components/library/xtx-bread'
// import XtxBreadItem from '@/components/library/xtx-bread-item'

// context() 参数：1.目录 2.是否加载子目录 3.文件匹配 正则
const importFn = require.context('./', false, /\.vue$/)
// console.log(importFn.keys())
export default {
  install (app) {
    // 在app上进行扩展，app提高component directive
    // 如果要挂载原型 app.config.globalProperties.$http
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)
    // 根据keys批量注册
    importFn.keys().forEach(key => {
      // 导入组件
      const component = importFn(key).default
      // console.log(component)
      // 注册组件
      app.component(component.name, component)
    })
    // 定义指令
    defineDirective(app)
  }
}
// 定义指令
const defineDirective = app => {
  // 图片懒加载指令
  // 原理：先存储图片地址不能在src上，当图片进入可视区，将存储的图片地址设置给图片元素即可
  app.directive('lazy', {
    // vue2 监听使用指令的DOM是否创建好，钩子函数：inserted
    // vue3 的指令拥有的钩子函数和组件的一样，使用指令的DOM是否创建好，钩子函数：mounted
    mounted (el, binding) {
      // 创建一个观察对象 用来观察使用当前元素的指令
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        // 进入可视区
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          // 把指令的值设置给el的src属性 binding.value就是指令的值
          // 处理图片加载失败 error 图片加载失败 load 图片加载成功
          el.onerror = () => {
            // 加载失败设置默认图片
            el.src = defaultImg
          }
          el.src = binding.value

          // console.log('进入可视区')
          // console.log(el)
        }
      }, {
        threshold: 0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}
