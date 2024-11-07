<template>
    <div class="profile-info" style="margin:12vh 25vh 0 30vh">
        <!-- 头像上传 -->
        <div class="avatar-upload">
            <el-avatar fit="fill" :size="100" :src="userAvatar" style="margin-left: calc(50% - 50px)"
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
                <el-icon style="margin-left: 37%" @click="handleFavorite">
                    <el-tooltip class="box-item" effect="dark" content="收藏" placement="top-end">
                        <Star />
                    </el-tooltip>
                </el-icon>
            </router-link>
            <router-link to="/notebook">
                <el-icon style="margin-left: 20%" @click="handleNotebook">
                    <el-tooltip class="box-item" effect="dark" content="笔记" placement="top-start">
                        <Notebook />
                    </el-tooltip>
                </el-icon>
            </router-link>
        </div>
        <!-- 个人信息展示 -->
        <div class="profile-details" style="font-size:20px;margin-left: 15%">
            <p><strong>姓名:</strong> {{ name }}</p>
            <p><strong>性别:</strong> {{ sex }}</p>
            <p><strong>身份:</strong> {{ identity }}</p>
            <p><strong>学号:</strong> {{ id }}</p>
            <p><strong>学院:</strong> {{ college }}</p>
            <p><strong>班级:</strong> {{ clas }}</p>
            <p><strong>邮箱:</strong> {{ email }}</p>
            <p><strong>电话:</strong> {{ phone }}</p>
        </div>
    </div>
</template>

<script>
import { Star, Notebook } from '@element-plus/icons-vue'
import defaultAvatarImg from '@/assets/avatar.jpg';

export default {
    components: {
        Star,
        Notebook,
    },
    data() {
        return {
            name: '',
            identity: '',
            college: '',
            email: sessionStorage.getItem('userInfo'),
            phone: '',

            avatarDialogVisible: false,

            currentWeb: '课程列表',
            userAvatar: defaultAvatarImg, // 用户头像URL
        }
    },
    mounted() {
        this.fetchInfo()
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
        handleFavorite() {
            console.log('收藏被点击')
        },
        handleNotebook() {
            console.log('笔记被点击')
        },
    }
}
</script>

<style scoped>
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
</style>