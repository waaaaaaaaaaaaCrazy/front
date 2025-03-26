<template>
    <div>
        <el-card style="height:100vh">
            <div class="span-title">
                <span class="span-decoration">|</span>
                {{ notice.title }}
            </div>
            <p style="margin: 20px 50px 10px 15px"><strong>发布日期:</strong> {{ notice.time }}</p>
            <p style="margin: 0 50px 10px 15px"><strong>通知正文:</strong> {{ notice.content }}</p>
            <p v-if="showAttachment" style="margin: 0 50px 0 15px"><strong>附件: </strong>
                <a :href="getAttachmentUrl()" @click.prevent="downloadAttachment">{{ notice.attachment.name }}</a>
            </p>
            <el-collapse v-if="isTeacher" style="margin: 50px 50px 0 15px; font: bold;">
                <el-collapse-item :title="unreadMsg" @click="handleUnreadClick" disabled="isCollapse">
                    <el-table :data="unreadStudent.sID" highlight-current-row>
                        <el-table-column fixed type="index" width="50px" />
                        <el-table-column label="学号" sortable />
                    </el-table>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'NoticeDetail',
    props: {
        noticeId: {
            type: String,
            default: null
        }
    },
    data() {
        return {
          isTeacher: localStorage.getItem('Isteacher')/*sessionStorage.getItem('isTeacher')*/,
            notice: { attachment: {} },
            showAttachment: false,
            attachmentUrl: null,  // 用于存储生成的 Blob URL
            isCollapse: false,
            unreadMsg: '未读学生数：',
            unreadStudent: [{}]
        }
    },
    mounted() {
        // 根据 ID 获取通知详情
        this.fetchNoticeDetails(this.noticeId);
    },
    watch: {
        // 监听 route.params 的变化
        '$route.params.noticeId'(newId, oldId) {
            if (newId !== oldId) {
                // 根据新的 ID 重新加载通知详情
                this.notice.attachment = {}
                this.fetchNoticeDetails(newId)
                this.$router.go(0)
            }
        }
    },
    methods: {
        fetchNoticeDetails(noticeId) {
            console.log(noticeId)//'https://apifoxmock.com/m1/5315127-4985126-default/api/get_notice_detail'
            this.axios.get(`/api/notice/get/${this.noticeId}`,
                { params: { cnID: this.noticeId } })
                .then(response => {
                    this.notice.time = response.data.cnTime.replace(/T/g, ' ').replace(/.[\d]{3}Z/, ' ')
                    this.notice.title = response.data.cnTitle
                    this.notice.content = response.data.cnContent
                    if (response.data.attachment) {
                        this.showAttachment = true
                        this.notice.attachment.aID = response.data.attachment
                        this.axios.get(`/api/attachment/get/${this.notice.attachment.aID}`,
                            { params: { aID: this.notice.attachment.aID } })
                            .then(res => {
                                this.notice.attachment.name = res.data.aname
                            })
                        this.axios.get(`/api/attachment/download/${this.notice.attachment.aID}`,
                            { params: { aID: this.notice.attachment.aID }, responseType: 'blob' })
                            .then(res => {
                                this.generateAttachmentUrl(res.data)
                            })
                    }
                    else
                        this.showAttachment = false
                })
            if (this.isTeacher)
                this.axios.get(`/api/studentNotice/number/${this.noticeId}`,
                    { params: { cnID: this.noticeId } })
                    .then(response => {
                        console.log(response.data)
                        this.unreadMsg = this.unreadMsg + response.data
                        if(response.data === '0')
                            this.isCollapse = true
                    })
        },
        generateAttachmentUrl(data) {
            const blob = new Blob([data], { type: 'application/octet-stream' })
            this.attachmentUrl = URL.createObjectURL(blob)
        },
        getAttachmentUrl() {
            return this.attachmentUrl
        },
        downloadAttachment() {
            // 触发下载，如果需要可以添加额外的逻辑
            const link = document.createElement('a')
            link.href = this.attachmentUrl
            link.download = this.notice.attachment.name
            link.click()
        },
        beforeDestroy() {
            if (this.attachmentUrl) {
                URL.revokeObjectURL(this.attachmentUrl)
            }
        },
        handleUnreadClick() {
            this.axios.get(`/api/studentNotice/unread/${this.noticeId}`,
                { params: { cnID: this.noticeId } })
                .then(response => {
                    this.unreadStudent = response.data
                })
            console.log('unreadStudent:',this.unreadStudent)
        }
    }
}
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
    margin: 20px 10px;
}
</style>