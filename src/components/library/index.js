// 扩展vue原有功能：全局组件，自定义指令，挂载原型方法，
// vue2插件写法：导出一个对象，有install函数，默认传入Vue构造函数，Vue基础之上扩展
// vue3插件写法：导出一个对象，有install函数，默认传入app构造函数，Vue基础之上扩展

import XtxSkeleton from '@/components/library/xtx-skeleton'
import XtxCarousel from '@/components/library/xtx-carousel'
import XtxMore from '@/components/library/xtx-more'
export default {
  install (app) {
    // 在app上进行扩展，app提高component directive
    // 如果要挂载原型 app.config.globalProperties.$http
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
  }
}
