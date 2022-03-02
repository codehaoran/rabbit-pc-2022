import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/LayoutView')
const Home = () => import('@/views/home/indexView')
const TopCategory = () => import('@/views/category/indexView')
const SubCategory = () => import('@/views/category/subView')
const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/category/:id',
        component: TopCategory
      },
      {
        path: '/category/sub/:id',
        component: SubCategory
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
