import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Favorite from '../views/Favorite.vue'
import Notebook from '../views/Notebook.vue'
import CourseDetail from '../views/CourseDetail.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: { title: '正在重定向...' }
  },
  {
    path: '/home',
    name: Home,
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: Favorite,
    meta: { title: '收藏夹' }
  },
  {
    path: '/notebook',
    name: 'Notebook',
    component: Notebook,
    meta: { title: '笔记' }
  },
  {
    path: '/course/:courseId',
    name: 'CourseDetail',
    component: CourseDetail,
    meta: { title: '课程主页' }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '智慧课程平台';
  next();
})

export default router
