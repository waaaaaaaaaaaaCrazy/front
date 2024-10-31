<template>
  <div id="home">
    <!-- 最上方菜单栏 -->
    <el-menu class="custom-menu" mode="horizontal" default-active="1" text-color="aliceblue"
      active-text-color="#409EFF">
      <!-- 左侧Logo -->
      <div class="header-left" style="margin-right: 10%;">
        <img src="@/assets/logo.png" alt="智慧课程平台Logo" />
      </div>
      <!-- 菜单项 -->
      <el-menu-item index="1" @click="currentWeb = '课程列表'">课程列表</el-menu-item>
      <el-menu-item index="2" @click="currentWeb = '课程表'">课程表</el-menu-item>
      <!-- 右侧头像 -->
      <div class="header-right" style="margin-left: 50%;">
        <el-avatar :src="userAvatar" @click="handleAvatarClick" />
        <el-button class="exit" type="text" @click="logout">退出</el-button>
      </div>
    </el-menu>
    <div v-show="currentWeb === '课程列表'">
      <!-- 网页主要内容 -->
      <div class="container1">
        <!-- 左侧个人信息和消息总览卡片 -->
        <el-card class="card_info_message" shadow="never"
          style="width: 25vw; height: 80vh;display: flex; flex-direction: column;">
          <!-- 个人信息卡片 -->
          <el-card class="card-info" shadow="always" style="width: 100%;height: 40vh; margin-bottom: 3vh;">
            <div class="span-title">
              <span class="span-decoration">|</span>
              个人信息
            </div>
            <div class="profile-info">
              <!-- 头像上传 -->
              <div class="avatar-upload">
                <img :src="userAvatar" alt="Avatar" style="margin-left: calc(50% - 25px)"
                  @click="avatarDialogVisible = !avatarDialogVisible" />
                <el-dialog v-model="avatarDialogVisible" title="OvO" width="500">
                  <span>是否选择上传新头像？</span>
                  <template #footer>
                    <div class="button-group">
                      <el-button @click="avatarDialogVisible = false">取消</el-button>
                      <el-upload class="avatar-uploader"
                        action="https://apifoxmock.com/m1/4767131-4420546-default/api/avatar_upload"
                        accept=".jpg, .jpeg, .png" :show-file-list="false" :on-success="handleAvatarUploadSuccess"
                        :on-error="handleAvatarUploadError" :before-upload="beforeAvatarUpload">
                        <el-button type="primary" @click="avatarDialogVisible = false">
                          确认
                        </el-button>
                      </el-upload>
                    </div>
                  </template>
                </el-dialog>
              </div>
              <div>
                <router-link to="/favorite">
                  <el-icon style="margin-left: 33%" @click="handleFavorite">
                    <el-tooltip class="box-item" effect="light" content="收藏" placement="top-end">
                      <Star />
                    </el-tooltip>
                  </el-icon>
                </router-link>
                <router-link to="/notebook">
                  <el-icon style="margin-left: 20%" @click="handleNotebook">
                    <el-tooltip class="box-item" effect="light" content="笔记" placement="top-start">
                      <Notebook />
                    </el-tooltip>
                  </el-icon>
                </router-link>
              </div>
              <!-- 个人信息展示 -->
              <div class="profile-details" style="font-size:12px;margin-left: 15%">
                <p><strong>姓名:</strong> {{ name }}</p>
                <p><strong>身份:</strong> {{ identity }}</p>
                <p><strong>学院:</strong> {{ college }}</p>
                <p><strong>邮箱:</strong> {{ email }}</p>
                <p><strong>电话:</strong> {{ phone }}</p>
              </div>
            </div>
          </el-card>

          <!-- 消息总览卡片 -->
          <el-card class="card-message" shadow="always" style="width: 100%;height: 30vh;">
            <div class="span-title">
              <span class="span-decoration">|</span>
              消息总览
            </div>
            <div style="font-size: 14px;margin-top: 20px;">
              <p><strong>未读通知:</strong> {{ unreadNotifications }}</p>
              <p @click="messageDialogVisible = !messageDialogVisible"><strong>未读课程消息:</strong> {{ unreadMessages }}</p>
            </div>
            <el-dialog v-model="messageDialogVisible" title="未读课程消息" width="500">
              <div>
                <el-table :data="courseMessage">
                  <el-table-column property="name" label="课程名" />
                  <el-table-column property="num" label="未读消息数" width="100" align="center" />
                </el-table>
              </div>
            </el-dialog>
          </el-card>
        </el-card>

        <!-- 中间课程列表卡片 -->
        <el-card class="card-course" shadow="always"
          style="width: calc(50% - 20px); height: 80vh; display: inline-block; margin: 0 10px; overflow-y: auto;">
          <div class="span-title">
            <span class="span-decoration">|</span>
            课程列表
          </div>
          <el-row :gutter="20" style="margin-top: 10px;">
            <el-col v-for="(course, index) in courses" :key="index" :span="6" style="margin-bottom: 10px;">
              <el-card shadow="hover" @click="handleCourseClick(course)"
                style="font-size: 12px; height: 100%; background-color: rgba(174, 205, 255, 0.6);">
                <img :src="course.image" class="course-image" alt="课程图片" />
                <div class="course-info">
                  <p><strong>{{ course.name }}</strong></p>
                  <p>课程号: {{ course.courseNumber }}</p>
                  <p>课序号: {{ course.classNumber }}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>

        <!-- 右侧通知栏和日期卡片 -->
        <el-card class="card_notice_date" shadow="never"
          style="width: 25vw;height: 80vh; display: flex; flex-direction: column;">
          <el-card class="card-notice" shadow="always" style="width: 100%;height: 40vh;margin-bottom: 10px;">
            <div class="span-title">
              <span class="span-decoration">|</span>
              通知公告
            </div>
            <el-table max-height="30vh" :data="notice" :show-header="false" stripe="true" show-overflow-tooltip="true">
              <el-table-column property="time" label="时间" width="120">
                <template v-slot="scope">
                  <div @click="handleNoticeClick(scope.row)">
                    {{ scope.row.time }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column property="title" label="标题">
                <template v-slot="scope">
                  <div @click="handleNoticeClick(scope.row)">
                    {{ scope.row.title }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div v-show="notice.length === 0" style="text-align: center; margin-top: 100px;">
              无
            </div>
          </el-card>
          <el-card class="card-date" shadow="always" style="width: 100%;height: 40vh;"
            :body-style="{ padding: '0px !important' }">
            <el-calendar style="width: 100%;height:100;"></el-calendar>
          </el-card>
        </el-card>
      </div>
    </div>
    <div v-show="currentWeb === '课程表'">
      <el-card class="container2" :body-style="{ padding: '0px !important' }">
        <el-table :data="classSchedule" style="width: 100%; height:100%; font-size: 15px" stripe>
          <el-table-column label="时间段" width="140px">
            <template v-slot="scope">
              {{ scope.row.time }}
            </template>
          </el-table-column>
          <el-table-column v-for="(day, index) in days" :key="index" :label="day" width="130px">
            <template v-slot="scope">
              {{ scope.row[day] || '' }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { Star, Notebook } from '@element-plus/icons-vue'
import defaultAvatarImg from '@/assets/avatar.jpg';
import defaultCourseImg from '@/assets/course.jpg';

export default {
  components: {
    Star,
    Notebook,
  },
  name: 'HomeView',
  props: {
    course: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      name: '',
      identity: '',
      college: '',
      email: sessionStorage.getItem('userInfo'),
      phone: '',

      avatarDialogVisible: false,
      messageDialogVisible: false,

      currentWeb: '课程列表',
      userAvatar: defaultAvatarImg, // 用户头像URL
      unreadMessages: 0, // 用户名
      unreadNotifications: 0, // 未读通知数
      courseImg: defaultCourseImg,// 课程图片URL

      courseMessage: [
        { name: '专业课程综合实训III', num: 0 },
        { name: '用户界面设计与评价', num: 0 }
      ],
      courses: [ // 课程列表数据
        { image: defaultCourseImg, name: '专业课程综合实训III', courseNumber: 'P310002B', classNumber: '02' },
        { image: defaultCourseImg, name: '用户界面设计与评价', courseNumber: 'M410023B', classNumber: '01' },
      ],
      notice: [
        { id: '1', time: '2023-10-01', title: '通知1' },
        { id: '2', time: '2023-10-02', title: '通知2' }
      ],

      days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      classSchedule: [
        { time: '08:00-09:50', '周一': '自习', '周二': '自习', '周三': '自习', '周四': '自习', '周五': '自习', '周六': '', '周日': '' },
        { time: '10:10-12:00', '周一': '自习', '周二': '自习', '周三': '自习', '周四': '自习', '周五': '自习', '周六': '', '周日': '' },
        { time: '14:10-16:00', '周一': '自习', '周二': '自习', '周三': '自习', '周四': '自习', '周五': '自习', '周六': '', '周日': '' },
        { time: '16:20-18:10', '周一': '自习', '周二': '自习', '周三': '自习', '周四': '自习', '周五': '自习', '周六': '', '周日': '' },
        { time: '19:00-20:50', '周一': '自习', '周二': '自习', '周三': '自习', '周四': '自习', '周五': '自习', '周六': '', '周日': '' },
        { time: '21:10-21:50', '周一': '自习', '周二': '自习', '周三': '自习', '周四': '自习', '周五': '自习', '周六': '', '周日': '' },
      ]
    }
  },
  mounted() {
    this.fetchInfo()
    this.fetchUnreadNum()
    this.fetchCourseMessage()
    this.fetchCourse()
    this.fetchNotice()
  },
  methods: {
    async convertUrlToBase64(url) {
      const response = await fetch(url)
      const blob = await response.blob()
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    },

    async fetchInfo() {
      console.log(this.email)
      this.axios.get('https://apifoxmock.com/m1/5315127-4985126-default/api/get_profile_info', { params: { email: this.email } })
        .then(async (response) => {
          this.name = response.data.name
          this.identity = response.data.identity
          this.college = response.data.college
          this.email = response.data.email
          this.phone = response.data.phone
          if (response.data.avatarUrl) {
            this.avatarUrl = response.data.avatarUrl // 如果后端返回了新的头像URL，则更新原始的URL  
            // 调用convertUrlToBase64函数将URL转换为Base64  
            // this.avatarBase64 = await this.convertUrlToBase64(this.avatarUrl);
            // this.avatarUrl = this.avatarBase64;
          }
        }).catch((error) => {
          console.error('Error fetching profile info:', error)
        })
    },
    handleAvatarUploadSuccess(response, file) {
      // 假设服务器返回的数据中包含新的头像URL  
      if (response.userAvatar) {
        console.log(response.userAvatar)
        this.userAvatar = response.userAvatar
        // 调用convertUrlToBase64函数将URL转换为Base64  
        // this.avatarBase64 = this.convertUrlToBase64(this.avatarUrl)
        // this.avatarUrl = this.avatarBase64
        this.$message.success(`${file.name} 上传成功`)
      }
      /* convertUrlToBase64('https://example.com/path/to/image.jpg')  
      .then(base64 => {  
        console.log(base64); // 输出Base64编码的图片数据  
        // 你可以将这个Base64编码赋值给img标签的src属性，或者发送到后端  
      })  
      .catch(error => {  
        console.error('Error converting URL to Base64:', error);  
      });*/
      else this.userAvatar = defaultAvatarImg
    },
    handleAvatarUploadError(err, file) {
      this.$message.error(`${file.name} 上传失败`)
    },
    beforeAvatarUpload(file) {
      // 可以在这里添加文件类型和大小的验证逻辑  
      let sizeByMb = file.size / 1024 / 1024;
      if (sizeByMb > 2) {
        this.$message.warning("上传文件不能超过2M")
        return false
      }
      if (file.type != 'image/jpeg' && file.type != 'image/png') {
        this.$message.warning("只能上传图片")
        return false
      }
      return true
    },

    fetchUnreadNum() {
      console.log(this.email)
      this.axios.get('https://apifoxmock.com/m1/5315127-4985126-default/api/get_unread_num',
        { params: { email: this.email } })
        .then(response => {
          this.unreadNotifications = response.data.unreadaNoticeNum,
            this.unreadMessages = response.data.unreadaMessageNum
        })
    },
    fetchCourseMessage() {
      console.log(this.email)
      this.axios.get('https://apifoxmock.com/m1/5315127-4985126-default/api/get_course_message',
        { params: { email: this.email } })
        .then(response => {
          this.courseMessage = response.data.courseMsg
        })
    },
    fetchCourse() {
      console.log(this.email)
      this.axios.get('https://apifoxmock.com/m1/5315127-4985126-default/api/get_course_list',
        { params: { email: this.email } })
        .then(response => {
          this.courses = response.data.course
        })
    },
    fetchNotice() {
      this.axios.get('https://apifoxmock.com/m1/5315127-4985126-default/api/get_notice_list')
        .then(response => {
          this.notice = response.data.notice
        })
    },
    handleAvatarClick() {
      console.log('个人信息被点击')
      this.$router.push('/perinfo');
    },
    logout() {
      console.log('退出被点击')
      sessionStorage.clear();
      this.$router.push('/login');
    },
    handleFavorite() {
      console.log('收藏被点击')
    },
    handleNotebook() {
      console.log('笔记被点击')
    },
    handleCourseClick(course) {
      console.log('课程被点击:', course)
      this.$router.push({
        name: 'CourseDetail',
        params: { courseId: course.name },
        query: {
          courseNumber: course.courseNumber,
          classNumber: course.classNumber
        }
      })
    },
    handleNoticeClick(row) {
      console.log('通知被点击:', row.time, row.title)
      this.$router.push({
        name: 'NoticeDetail',
        params: { noticeId: row.id },
        query: {
          noticeTime: row.time,
          noticeTitle: row.title
        }
      })
    }
  },
}

</script>

<style scoped>
#home {
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  background-image: url("@/assets/background.jpg");
  background-size: cover;
}

.custom-menu {
  display: flex;
  align-items: center;
  /* 垂直居中对齐 */
  height: 10vh;
  /* 自定义菜单栏高度 */
  background: rgba(5, 44, 102, 0.9);
  padding: 0 20px;
  /* 左右内边距，用于内容与边缘的间距 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  /* 添加底部阴影 */
}

:deep(.el-menu-item.is-active) {
  background-color: rgba(0, 34, 87, 0.8)
}

:deep(.el-menu-item) {
  --el-menu-hover-text-color: #409EFF
}

.header-left,
.header-right {
  /* 控制logo和头像的大小和样式 */
  display: flex;
  align-items: center;
}

.header-left img,
.header-right .el-avatar {
  width: 40px;
  /* 根据需要调整logo和头像的宽度 */
  height: 40px;
  margin: 0 10px;
  /* 控制logo和头像之间的间距 */
}

.exit {
  color: aliceblue;
}

.exit:hover {
  color: #409EFF;
}

.container1 {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-left: 12%;
  margin-top: 10px;
}

.span-decoration {
  color: rgba(255, 255, 255, 0);
  background-color: rgba(16, 163, 255, 0.829);
  margin-right: 2px;
  position: relative;
}

.span-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.card_info_message,
.card_notice_date,
.card-date {
  border: 0;
  background: rgba(255, 255, 255, 0);
}

.card-info,
.card-message,
.card-course,
.card-notice {
  background: rgba(255, 255, 255, 0.95);
}

.avatar-upload img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  /* 按钮靠右对齐 */
  gap: 10px;
}

.course-image {
  width: 100%;
  max-height: 50%;
}

.course-info {
  text-align: center;
}

:deep(.el-calendar) {
  font-size: 10px;
}

:deep(.el-calendar .next) {
  border: none;
}

:deep(.el-calendar td) {
  border: none;
}

:deep(.el-calendar .el-calendar-table thead th) {
  height: 10px;
}

:deep(.el-calendar .el-calendar-day) {
  height: 30px !important;
  text-align: center;
  border: none;
}

:deep(.el-calendar .el-calendar__header) {
  justify-content: space-between;
  color: aliceblue;
  background-color: rgba(65, 129, 232, 0.6);
}

:deep(.el-calendar .el-calendar__header .el-calendar__title) {
  width: 20%;
}

:deep(.el-calendar .el-calendar__header button) {
  font-size: 10px;
  color: aliceblue;
  background-color: rgba(49, 108, 204, 0.7);
}

:deep(.el-calendar .el-button-group) {
  width: 300px;
  margin-left: 5px;
}

:deep(.el-calendar .el-calendar__body) {
  background-color: rgba(255, 255, 255, 0.95);
}

:deep(.el-calendar .is-selected) {
  background-color: #1d68d8d8;
  color: #fff;
}

.container2 {
  display: flex;
  justify-content: space-between;
  width: 70%;
  min-height: 80vh;
  margin-left: 17%;
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.95);
}
</style>