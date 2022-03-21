// 提供复用逻辑的函数(钩子)
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
// target 监听的目标 dom对象
/**
 * 数据懒加载函数
 * @param {Element} target DOM对象
 * @param {Function} apiFn api函数
 */
// 传入api
export const useLazyData = apiFn => {
  const result = ref([])
  const target = ref(null)
  // stop 停止观察
  const { stop } = useIntersectionObserver(
    // 监听的目标
    target,
    // isIntersecting 用来判断是否进入可视区
    // observerElement 被监听的DOM
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting 是否进入可视区
      if (isIntersecting) {
        stop()
        // 调用api函数获取数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    // 配置选项 相交比例
    {
      threshold: 0
    }
  )
  return { result, target }
}
