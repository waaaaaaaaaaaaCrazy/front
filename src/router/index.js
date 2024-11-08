import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus';

import Login from '@/views/login/Login.vue'
import Home from '@/views/home/Home.vue'
import InfoView from '@/views/functions/personalInfo/InfoView.vue'
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
    path: '/info',
    name: 'InfoView',
    component: InfoView,
    meta: { title: '个人中心' }
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
  document.title = to.meta.title || '智慧课程平台'
  // let isAuthenticated = !!sessionStorage.getItem('userInfo')

  // // 如果路由要跳转到除了登录和注册的界面的话就判断是否已经登录，如果没有登录就强制跳到登录界面
  // if (to.path !== '/login' && to.path !== '/register' && !isAuthenticated ) {
  //     next({ path: '/login' })
  //     // 这里 Message 提示需要根据你实际的情况调整
  //     ElMessage({
  //         message: '请先登录！',
  //         type: 'warning',
  //         grouping: true,
  //     });
  // } else {
  //     //sessionStorage.clear();
  //     next()
  // }
  next()
})

export default router
