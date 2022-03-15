// 提供复用逻辑的函数(钩子)
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
// target 监听的目标 dom对象
/**
 * 数据懒加载函数
 * @param {Element} target DOM对象
 * @param {Function} apiFn api函数
 */
export const useLazyData = apiFn => {
  const result = ref([])
  const target = ref(null)
  // stop 停止观察
  const { stop } = useIntersectionObserver(
    // 监听的目标
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting 是否进入可视区
      if (isIntersecting) {
        stop()
        // 调用api函数获取数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    }
  )
  return { result, target }
}
