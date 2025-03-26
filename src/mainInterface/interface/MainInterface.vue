<template>
  <div style="background:rgba(179,176,176,0.25)">
    <el-container>
      <!--  侧边栏  -->
      <el-aside style="width: 300px;min-height: 100vh">
        <div style="height: 100px;background-color: #5353e8;color: white;display: flex;align-items: center;justify-content: center;font-size: larger;font-weight: bold;">
          智慧课程平台
        </div>

        <el-menu
            style="border: none;padding: 20px;background-color: white!important;"
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            unique-opened
            mode="vertical"
            router="true"
        >
          <!-- 课程考核 -->
          <el-sub-menu index="1" style="background-color: white!important;">
            <template #title>
              <i class="el-icon-location"></i>
              <span class="menu-title">课程考核</span>
            </template>
            <!-- 子菜单内的菜单项 -->
            <el-menu-item-group >
              <el-menu-item index="/homework" style="align-content: center;justify-items: center;justify-content: center" route="/homework"  @click="goToHomework" >任务</el-menu-item>
              <el-menu-item index="/courseEvaluation" style="align-content: center;justify-content: center" @click="goToCourseEvaluation">作业评价</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="1" style="background-color: white!important;">
            <template #title>
              <i class="el-icon-location"></i>
              <span class="menu-title">课程视频</span>
            </template>
            <!-- 子菜单内的菜单项 -->
            <el-menu-item-group >
              <el-menu-item index="/replay" style="align-content: center;justify-items: center;justify-content: center" @click="goToReplay" >课程回放</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="1" style="background-color: white!important;">
            <template #title>
              <i class="el-icon-location"></i>
              <span class="menu-title">课程资源</span>
            </template>
            <!-- 子菜单内的菜单项 -->
            <el-menu-item-group >
              <el-menu-item index="/courseware" style="align-content: center;justify-items: center;justify-content: center" @click="goToCourseware" >课件</el-menu-item>
              <el-menu-item index="/epl" style="align-content: center;justify-items: center;justify-content: center" @click="goToepl" >试卷库</el-menu-item>
              <el-menu-item index="/tm" style="align-content: center;justify-items: center;justify-content: center" @click="goTotm">教材</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="1" style="background-color: white!important;" v-if="isTeacher==1">
            <template #title>
              <i class="el-icon-location"></i>
              <span class="menu-title">创建</span>
            </template>
            <!-- 子菜单内的菜单项 -->
            <el-menu-item-group >
              <el-menu-item index="/ch" style="align-content: center;justify-items: center;justify-content: center" @click="goToCreateHomework" >创建任务</el-menu-item>
              <el-menu-item index="/uc" style="align-content: center;justify-content: center"  @click="goTouc">上传资料</el-menu-item>

            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <!--  头部区域   -->
        <el-header style="height: 100px;background-color: #ffffff !important;">
          <!-- 面包屑导航 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }" style="font-weight: bolder;font-size: larger">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/mainInterface'}" style="font-size: larger;font-weight: bold">{{courseName}}</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/homework'}" style="font-size: larger;font-weight: bold">课程考核</el-breadcrumb-item>
          </el-breadcrumb>

          <div style="flex: 1;width: 0;display: flex;justify-content: flex-end;align-items: center;">
            <el-dropdown>
              <div style="  display: flex;  align-content: center; justify-content: center;cursor: default">
                <img src="../../assets/white.jpg" alt="" style="width: 60px;height:60px;flex: 1">
                <div style="display: flex;align-items: center;justify-content: center;">
                  <span>
                    欢迎你，邢子天
                  </span>
                </div>
              </div>
              <template #dropdown>
                <el-dropdown-menu v-slot="dropdown">
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>

        <!-- 主体区域 -->
        <el-container style="padding: 20px">
          <el-main style="height: 100vh;background-color:white;padding-top: 50px">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="ahTitle" label="作业标题" width="180" />
              <el-table-column prop="startTime" label="作业开始时间" width="180" />
              <el-table-column prop="endTime" label="作业截至" width="180" />
              <el-table-column prop="ctID" label="课堂号" width="100" />
              <el-table-column prop="ahCategory" label="作业类别" width="100" />
              <el-table-column prop="requirement" label="作业要求" width="180" />

              <el-table-column label="操作" align="center">
                <template v-slot="scope">


                  <!-- 根据Isteacher的值决定是否显示发批改作业的按钮 -->
                  <el-button v-if="isTeacher === '1'" @click="handleCreate">批改</el-button>
                  <!-- 当Isteacher等于0时，显示提交作业的按钮 -->
                  <el-button v-if="isTeacher === '0'" @click="handleSubmitHomework">提交</el-button>

                  <el-button @click="handleView(scope.row)">查看</el-button>
                  <!-- 根据Isteacher的值决定是否显示发布作业的按钮 -->

                </template>
              </el-table-column>


            </el-table>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MainInterface',
  data() {
    return {
      courseName: '',
      courseNumber: '',
      tableData: [] ,// 假设后端返回的数据格式是一个数组
      isTeacher: localStorage.getItem('Isteacher'),
      userID: this.$route.query.IDnumber,
    }
  },
  methods: {
    fetchData() {
      axios.get('/api/assignHomework') // 假设后端API的URL是/api/assignHomework
          .then(response => {
            this.tableData = response.data; // 假设后端返回的数据格式是一个数组
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    handleEdit() {
      this.$router.push('/submity');
    },
    handleView() {
      // 可以在这里添加查看作业的逻辑
    },
    logout() {
      // 退出登录的逻辑
      this.$router.push('/login');
    },
    saveCourseInfo() {
      // 假设你从$route中获取了course.name和course.number
      let courseName = this.$route.query.cname;
      let courseNumber = this.$route.query.cnumber;

      // 存储到localStorage
      localStorage.setItem('courseName', courseName);
      localStorage.setItem('courseNumber', courseNumber);

      // 更新data中的值
      this.courseName = courseName;
      this.courseNumber = courseNumber;
    },
    goToHomework() {
      this.$router.push({ path: '/homework', query: { cname: this.courseName, cnumber: this.courseNumber ,
          IDnumber:this.userID} });
    },
    goToExam() {
      this.$router.push({ path: '/exam', query: { cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID } });
    },
    goToCourseEvaluation() {
      this.$router.push({ path: '/courseEvaluation', query: { cname: this.courseName, cnumber: this.courseNumber ,
          IDnumber:this.userID} });
    },
    goToReplay() {
      this.$router.push({ path: '/replay', query: { cname: this.courseName, cnumber: this.courseNumber ,
          IDnumber:this.userID} });
    },
    goToCourseware() {
      this.$router.push({ path: '/courseware', query: { cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID } });
    },
    goToepl() {
      this.$router.push({ path: '/epl', query: { cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID } });
    },
    goTotm() {
      this.$router.push({ path: '/tm', query: { cname: this.courseName, cnumber: this.courseNumber ,
          IDnumber:this.userID} });
    },
    goToCreateExam() {
      this.$router.push({ path: '/ce', query: { cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID } });
    },
    goToCreateHomework() {
      this.$router.push({ path: '/ch', query: { cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID } });
    },
    goTouc() {
      this.$router.push({ path: '/uc', query: { cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID } });
    },
    goToue() {
      this.$router.push({ path: '/ue', query: { cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID } });
    },
  },
  created() {
    this.fetchData();
    this.saveCourseInfo(); // 在created钩子中调用saveCourseInfo方法
  },
}
</script>

<style>
.el-menu--line .el-menu-item {
  background-color: #a5abbb !important;
}
.el-menu-item:hover {
  color: blue !important;
}
.el-menu-item.is-active {
  background-color: whitesmoke !important;
}
.el-header{
  box-shadow: 2px 0 6px rgba(0,21,41,35);
  display: flex;
  align-items: center;
}
.menu-title{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
}
</style>