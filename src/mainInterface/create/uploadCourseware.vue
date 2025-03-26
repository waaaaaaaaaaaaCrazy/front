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
              <el-menu-item index="/uc" style="align-content: center;justify-content: center"  @click="goTouc">上传资源</el-menu-item>

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
            <el-breadcrumb-item :to="{path:'/ch'}" style="font-size: larger;font-weight: bold">创建</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/ch'}" style="font-size: larger;font-weight: bold">上传资源</el-breadcrumb-item>

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
            <el-form ref="assignHomeworkForm" :model="assignHomework" label-width="120px">
              <el-form-item label="资源主题">
                <el-input v-model="assignHomework.ahTitle"></el-input>
              </el-form-item>
              <el-form-item label="课堂号">
                {{courseNumber}}
              </el-form-item>
              <el-form-item label="资源上传时间">
                <el-date-picker v-model="assignHomework.startTime" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="类别">
                <el-select v-model="assignHomework.ahCategory" placeholder="请选择">
                  <el-option label="课件" value="课件">课件</el-option>
                  <el-option label="试卷库" value="试卷库">试卷库</el-option>
                  <el-option label="教材" value="教材">教材</el-option>
                  <!-- 根据实际情况添加更多类别 -->
                </el-select>
              </el-form-item>
              <el-form-item label="资源描述">
                <el-input type="textarea" v-model="assignHomework.requirement"></el-input>
              </el-form-item>
              <el-form-item label="作业附件">
                <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :on-success="handleSuccess"
                    :before-upload="beforeUpload"
                    :file-list="fileList"
                    :on-remove="handleRemove"
                    name="file"
                    :headers="headers"
                    :with-credentials="true"
                    v-model:file-list="fileList"
                    :data="{ uploadID: userID }"
                >
                  <el-button size="small" type="primary" @click="uploadAttachment">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">支持多种文件格式</div>
                </el-upload>
                <div v-if="assignHomework.attachment">
                  已上传文件：{{ assignHomework.attachment.aName }}
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">发布</el-button>
              </el-form-item>
            </el-form>
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
      isTeacher: 1,
      uploadUrl: 'http://localhost:8080/attachment/upload', // 上传文件接口的 URL
      fileList:  [],
      userID: this.$route.query.IDnumber,
      aID:null,
      assignHomework: {
        ctID: '',
        ahCategory: '',
        startTime: '',
        endTime: '2024-11-01T16:00:00',
        ahTitle: '',
        requirement: '',
        attachment: '' ,
      }
    };
  },
  methods: {
    handleSuccess(response, file, fileList) {
      // 上传成功的处理
      console.log('上传成功，服务器响应：', response);
      // 这里可以处理服务器返回的数据，例如将返回的 aID 保存到文件对象中
      this.assignHomework.attachment = response;
      console.log('上传成功，服务器响应：', this.assignHomework.attachment);
    },
    beforeUpload(file) {
      // 允许所有文件类型上传，不进行任何校验
      return true;
    },
    uploadAttachment() {
      const formData = new FormData();
      const file = this.fileList[0].raw; // 获取选择的文件
      if (!file) {
        this.$message.error('请选择文件');
        return;
      }
      formData.append('file', file); // 添加文件
      formData.append('uploadID', this.uploadID); // 添加 uploadID 参数

      // 发送请求
      axios.post(this.uploadUrl, formData)
          .then(response => {
            this.handleSuccess(response.data, file, this.fileList);
          })
          .catch(error => {
            console.error('上传失败：', error);
            this.$message.error('文件上传失败');
          });
    },

    handleRemove(file, fileList) {
      // 文件移除的处理
      this.assignHomework.attachment = null;
    },
    handlePreview(file) {
      // 预览文件
      axios.get('/api/get/' + file.aID).then(response => {
        // 处理文件预览
      });
    },
    logout() {
      // 退出登录的逻辑
      this.$router.push('/login');
    },
    goToHomework() {
      this.$router.push({path: '/homework', query: {cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID }});
    },
    goToExam() {
      this.$router.push({path: '/exam', query: {cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID }});
    },
    goToCourseEvaluation() {
      this.$router.push({path: '/courseEvaluation', query: {cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID }});
    },
    goToReplay() {
      this.$router.push({path: '/replay', query: {cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID }});
    },
    goToCourseware() {
      this.$router.push({path: '/courseware', query: {cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID}});
    },
    goToepl() {
      this.$router.push({path: '/epl', query: {cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID}});
    },
    goTotm() {
      this.$router.push({path: '/tm', query: {cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID}});
    },
    goToCreateExam() {
      this.$router.push({path: '/ce', query: {cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID}});
    },
    goToCreateHomework() {
      this.$router.push({path: '/ch', query: {cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID}});
    },
    goTouc() {
      this.$router.push({path: '/uc', query: {cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID}});
    },
    goToue() {
      this.$router.push({path: '/ue', query: {cname: this.courseName, cnumber: this.courseNumber,
          IDnumber:this.userID}});
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
    submitForm() {
      // 处理响应

      this.assignHomework.ctID=this.courseNumber;

      axios.post('http://localhost:8080/assignHomework/create', this.assignHomework)
          .then(response => {
            // 处理响应
          })
          .catch(error => {
            // 处理错误
          });

    }
  },
  created() {
    this.saveCourseInfo(); // 在created钩子中调用saveCourseInfo方法
  },
};
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

.el-header {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 35);
  display: flex;
  align-items: center;
}

.menu-title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
}
</style>