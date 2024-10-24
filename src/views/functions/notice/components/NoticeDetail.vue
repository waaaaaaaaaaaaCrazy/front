<template>
    <div>
        <div class="span-title">
            <span class="span-decoration">|</span>
            {{ notice.title }}
        </div>
        <p style="margin: 20px 50px 10px 15px"><strong>发布日期:</strong> {{ notice.time }}</p>
        <p style="margin: 0 50px 10px 15px"><strong>通知正文:</strong> {{ notice.content }}</p>
        <p v-show="showAttachment" style="margin: 0 50px 0 15px"><strong>附件:</strong>
            <a :herf=notice.attachment>{{ notice.attachment }}</a>
        </p>
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
            notice: {},
            showAttachment: false
        };
    },
    created() {
        // 根据 ID 获取通知详情
        this.fetchNoticeDetails(this.noticeId);
    },
    methods: {
        fetchNoticeDetails(noticeId) {
            console.log(noticeId)
            this.axios.get('https://apifoxmock.com/m1/5315127-4985126-default/api/get_notice_detail',
                { params: { noticeId: this.noticeId } })
                .then(response => {
                    this.notice.time = response.data.time
                    this.notice.title = response.data.title
                    this.notice.content = response.data.content
                    if (response.data.attachment) {
                        this.showAttachment = true
                        this.notice.attachment = response.data.attachment
                    }
                })
        }
    }
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
    margin: 10px 10px;
}
</style>