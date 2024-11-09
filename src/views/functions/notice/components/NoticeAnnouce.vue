<template>
    <div>
        <el-card class="box-card">
            <div class="span-title">
                <span class="span-decoration">|</span>
                编写通知
            </div>
            <el-form :model="noticeForm" :rules="rules" ref="noticeForm" label-width="120px">
                <el-form-item label="通知标题：" prop="title">
                    <el-input v-model="noticeForm.title" clearable></el-input>
                </el-form-item>
                <el-form-item label="接收群组：" prop="group">
                    <el-select v-model="noticeForm.group" placeholder="请选择接收群组">
                        <el-option v-for="group in groups" :key="group" :label="group" :value="group"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发布日期：" prop="time">
                    <el-date-picker v-model="noticeForm.time" type="date" placeholder="选择发布日期"
                        :disabled-date="DatePickerOptions"></el-date-picker>
                </el-form-item>
                <el-form-item label="通知正文：" prop="content">
                    <el-input v-model="noticeForm.content" type="textarea"
                        :autosize="{ minRows: 8, maxRows: 12 }"></el-input>
                </el-form-item>
                <el-form-item label="通知附件：">
                    <el-upload ref="upload" action="https://apifoxmock.com/m1/5315127-4985126-default/api/upload_attachment"
                        list-type="text" :on-success="handleUploadSuccess" :on-error="handleUploadError">
                        <el-button type="primary">上传附件</el-button>
                        <div class="el-upload__tip" style="margin-left: 5px;">上传通知附件，单个文件最大2MB</div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('submit')">提交</el-button>
                    <el-button type="success" @click="submitForm('draft')">保存为草稿</el-button>
                    <el-button type="success" style="margin-left: 50vw;" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userID:sessionStorage.getItem('userID'),
            noticeForm: {
                title: '',
                group: '',
                time: '',
                content: '',
                attachments: [],
            },
            groups: [], // Array to hold group data
            rules: {
                title: [{ required: true, message: '请输入通知标题', trigger: 'blur' }],
                group: [{ required: true, message: '请选择接收群组', trigger: 'change' }],
                time: [
                    { required: true, message: '请选择发布时间', validator: this.validateTime, trigger: 'change' }
                ],
                content: [{ required: true, message: '请输入通知内容', trigger: 'blur' }],
            },
            hasInfo: false,
            initTime: ''
        }
    },
    methods: {
        DatePickerOptions(time) {
            if (!this.hasInfo) {
                return time.getTime() < Date.now() - 86400000
            } else {
                return true
            }
        },
        handleUploadSuccess(response, file) {
            this.noticeForm.attachments.push(response.url)
            console.log(response.url)
            this.$message.success(`${file.name} 上传成功`)
        },
        handleUploadError(err, file) {
            this.$message.error(`${file.name} 上传失败`)
        },
        submitForm(status) {
            this.$refs.noticeForm.validate(valid => {
                if (valid) {
                    this.axios({
                        url: "https://apifoxmock.com/m1/5315127-4985126-default/api/submit_notice",               // 请求地址
                        method: "post",                       // 请求方法
                        headers: {                            // 请求头
                            "Content-Type": "application/json",
                        },
                        params: {                             // 请求参数
                            userID:sessionStorage.getItem('userID'),
                            title: this.noticeForm.title,
                            group: this.noticeForm.group,
                            time: this.noticeForm.time,
                            content: this.noticeForm.content,
                            status: status
                        },
                    })
                        .then((response) => {
                            if (status === 'submit' && response.status === 200) {
                                this.$message.success('通知提交成功')
                            } else if (status === 'draft' && response.status === 200) {
                                this.$message.success('草稿保存成功')
                            }
                            this.hasInfo = false
                            this.resetForm()
                        })
                        .catch(error => {
                            console.error('Error creating report:', error)
                            this.$message.error('通知起草失败')
                        })
                } else {
                    this.$message.error('请完善表单信息')
                }
            })
        },
        resetForm() {
            this.$refs.noticeForm.resetFields()
            this.$refs.upload.clearFiles()
            this.noticeForm.attachments = []
            if (this.hasInfo) {
                this.noticeForm.time = this.initTime
            }
        },
        validateTime(rule, value, callback) {
            if (!this.hasInfo && value && new Date(value).getTime() < Date.now() - 86400000) {
                callback(new Error('发布日期不能早于今天'))
            } else {
                callback();
            }
        },
        fetchGroups() {
            this.axios.get('https://apifoxmock.com/m1/5315127-4985126-default/api/get_groups',
                { params: { userID: sessionStorage.getItem('userID') } })
                .then(response => {
                    this.groups = response.data.group
                })
                .catch(error => {
                    console.error('Error fetching groups:', error)
                    this.$message.error('获取群组列表失败')
                })
        },
        initializeForm(info) {
            console.log(info)
            this.axios.get(`https://apifoxmock.com/m1/5315127-4985126-default/api/get_notice_draft`,///${info}
                { params: { noticeId: info } })
                .then(response => {
                    // 将返回的数据填充到表单中
                    this.noticeForm.title = response.data.title
                    this.noticeForm.group = response.data.group
                    this.noticeForm.time = response.data.time
                    this.noticeForm.content = response.data.content

                    this.initTime = response.data.time
                })
                .catch(error => {
                    console.error('Failed to fetch data:', error)
                    // 处理请求失败的情况
                })
        },
    },
    created() {
        this.fetchGroups()
    },
    
};
</script>

<style scoped>
.span-decoration {
    color: rgba(255, 255, 255, 0);
    background-color: rgba(16, 163, 255, 0.829);
    margin-right: 2px;
    position: relative;
}

.span-title {
    font-weight: bold;
    font-size: 30px;
    margin: 20px 20px;
}

.box-card {
    height: 100vh;
}

.el-form-item {
    margin-bottom: 20px;
}
</style>
