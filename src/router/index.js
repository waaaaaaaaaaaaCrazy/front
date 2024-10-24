import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'
import Favorite from '@/views/functions/Favorite.vue'
import Notebook from '@/views/functions/Notebook.vue'
import CourseDetail from '@/views/functions/CourseDetail.vue'
import NoticeView from '@/views/functions/notice/NoticeView.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: { title: '正在重定向...' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录' }
  },
  {
    path: '/home',
    name: 'Home',
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
    meta: { title: '笔记集' }
  },
  {
    path: '/course/:courseId',
    name: 'CourseDetail',
    component: CourseDetail,
    meta: { title: '课程主页' }
  },
  {
    path: '/notice',
    name: 'NoticeView',
    component: NoticeView,
    meta: { title: '通知' },
  },
  {
    path: '/notice/:noticeId',
    name: 'NoticeDetail',
    component: NoticeView,
    meta: { title: '通知' },
    props: true // 使组件能够接收路由参数作为 props
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
