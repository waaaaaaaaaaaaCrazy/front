<template>
  <div id="home">
      <!-- 最上方菜单栏 -->
     <el-menu class="custom-menu" mode="horizontal" default-active="1" text-color="aliceblue" active-text-color="#409EFF">
    <!-- 左侧Logo -->
    <div class="header-left" style="margin-right: 10vw;">
        <img src="@/assets/logo.png" alt="智慧课程平台Logo" />
    </div>
    <!-- 菜单项 -->
    <el-menu-item index="1" @click="currentWeb='课程列表'">课程列表</el-menu-item>
    <el-menu-item index="2" @click="currentWeb='课程表'">课程表</el-menu-item>
    <!-- 右侧头像 -->
    <div class="header-right" style="margin-left: 50vw;">
          <el-avatar :src="userAvatar" />
          <el-button type="text" @click="logout" style="color:aliceblue">退出</el-button>
    </div>
    </el-menu>
    <div v-if="currentWeb === '课程列表'">
      <!-- 网页主要内容 -->
      <div class="container">
    <!-- 左侧个人信息卡片 -->
    <el-card class="card-info" shadow="always" style="width: 25vw; display: inline-block;">
      <div slot="header" class="clearfix">
        <div class="decoration"></div>
        <span>个人信息</span>
      </div>
      <div class="user-info">
        <p>用户名: {{userName}}</p>
        <p>未读通知: {{unreadNotifications}}</p>
      </div>
    </el-card>

    <!-- 中间课程列表卡片 -->
    <el-card class="card-list" shadow="always" style="width: calc(50% - 20px); display: inline-block; margin: 0 10px;">
      <div slot="header">
        <div class="decoration"></div>
        <span>课程列表</span>
      </div>
      <el-row :gutter="20">
        <el-col v-for="(course, index) in courses" :key="index" :span="6">
          <el-card shadow="hover" @click="handleCourseClick(course)">
            <img :src="course.image" class="course-image" alt="课程图片" />
            <div class="course-info">
              <p>{{course.name}}</p>
              <p>课程号: {{course.courseNumber}}</p>
              <p>课序号: {{course.classNumber}}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <!-- 右侧通知栏卡片 -->
    <el-card class="card-course" shadow="always" style="width: 25vw; display: inline-block;">
      <div slot="header">
        <div class="decoration"></div>
        <span>通知公告</span>
      </div>
      <el-table :data="notice" @row-click="handleNoticeClick">
        <el-table-column property="time" label="" width="120" />
        <el-table-column property="title" label="" />
      </el-table>
      <div v-if="notice.length === 0" style="text-align: center; margin-top: 100px;">
        无
      </div>
    </el-card>
    </div>
    </div>
   </div>
  </template>
  
  <script>  
import avatarImg from '@/assets/avatar.jpg';
import courseImg from '@/assets/course.jpg';

  export default {
    data() {
        return {
            currentWeb:'课程列表',
            userAvatar:avatarImg, // 用户头像URL
            userName:'张三', // 用户名
            unreadNotifications:0, // 未读通知数
            courses:[ // 课程列表数据
                { image: courseImg, name: '计算机科学导论', courseNumber: 'CS101', classNumber: '001' },
                { image: courseImg, name: '计算机科学导论', courseNumber: 'CS101', classNumber: '001' },
                ],
            notice:[{time:'2024-02-23',title:'智慧课程平台操作手册'}],
        }
    },
    mounted(){
        this.fetchCourse();
        this.fetchNotice();
    },
    methods: {
        fetchCourse(){

        },
        fetchNotice(){

        },
        logout(){
            console.log('退出被点击');

        },
        handleCourseClick(course) {
            console.log('课程被点击:', course);

        },
        handleNoticeClick(row, event, column){
            console.log('通知被点击:', row, event, column);

        }
    },
  }

  </script>
  
  <style scoped>
  #home {
  display: fixed;
  min-height:100vh;
  background-image:url("@/assets/background.jpg");
  background-size:cover;

  }
  .custom-menu {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  height: 10vh; /* 自定义菜单栏高度 */
  background: rgba(5, 44, 102, 0.9);
  padding: 0 20px; /* 左右内边距，用于内容与边缘的间距 */
}

  .header-left, .header-right {
    /* 控制logo和头像的大小和样式 */
    display: flex;
    align-items: center;
  }

  .header-left img, .header-right .el-avatar {
    width: 40px; /* 根据需要调整logo和头像的宽度 */
    height: 40px;
    margin: 0 10px; /* 控制logo和头像之间的间距 */
  }


.container {
  display: flex;
  justify-content: space-between;
  width:80%;
  margin-left:10%;
  margin-top: 10px;
}

.decoration {
    width: 20px; /* 矩形宽度 */
    height: 100%; /* 与容器等高 */
    background-color: #4CAF50; /* 矩形颜色，可自定义 */
    margin-right: 10px; /* 与文字间距 */
    position: relative;
    clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%);
    /* 上述clip-path创建了一个尖角在底部的矩形，模仿书签形状 */
  }

.card-info, .card-list, .card-course {
    height:80vh;
    background: rgba(255, 255, 255, 0.95);
}

.user-info {
  text-align: center;
}

.course-image {
  width: 100%;
  height: auto;
}

.course-info {
  text-align: center;
}
  </style>