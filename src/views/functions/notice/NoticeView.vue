<template>
    <div class="function">
        <!-- 左侧竖菜单栏 -->
        <el-menu :default-active="defaultView" class="side-menu" background-color="#545c64" text-color="#fff"
            active-text-color="#00fff7">
            <el-menu-item index="notice_detail" @click="currentView = 'notice_detail'">通知详情</el-menu-item>
            <el-menu-item index="notice_list" @click="currentView = 'notice_list'">通知列表</el-menu-item>
            <el-menu-item index="notice_annouce" v-if="identity === 1" @click="currentView = 'notice_annouce'">通知发布</el-menu-item>
            <el-menu-item index="notice_drafts" v-if="identity === 1" @click="currentView = 'notice_drafts'">草稿箱</el-menu-item>
            <router-link to="/home">
                <el-menu-item index="back" @click="clearInfo">返回主页</el-menu-item>
            </router-link>
        </el-menu>

        <!-- 右侧内容区域 -->
        <div class="main-content">
            <NoticeDetail v-show="currentView === 'notice_detail'" :noticeId="noticeId" />
            <NoticeList v-show="currentView === 'notice_list'" @goToNoticeDetail="goToNoticeDetail" />
            <NoticeAnnouce v-show="currentView === 'notice_annouce'" ref="noticeAnnouce" />
            <NoticeDrafts v-show="currentView === 'notice_drafts'" @goToNoticeAnnouce="goToNoticeAnnouce" />
        </div>
    </div>
</template>
<script>
import NoticeDetail from './components/NoticeDetail.vue'
import NoticeList from './components/NoticeList.vue'
import NoticeAnnouce from './components/NoticeAnnouce.vue'
import NoticeDrafts from './components/NoticeDrafts.vue'

export default {
    name: 'noticeView',
    components: {
        NoticeDetail,
        NoticeList,
        NoticeAnnouce,
        NoticeDrafts
    },
    props: {
        noticeId: { // 从路由参数中接收 ID
            String,
            default: null
        }
    },
    data() {
        return {
            defaultView: '',
            currentView: 'notice_detail',
            info: null, // 用于存储传递给 NoticeAnnouce 的 id

            identity:sessionStorage.getItem('identity')
        }
    },
    mounted() {
        this.desideDefaultView()
    },
    methods: {
        desideDefaultView() {
            if (this.noticeId === null) {
                this.defaultView = 'notice_list'
                this.currentView = 'notice_list'
            }

            else {
                console.log(this.noticeId)
                this.defaultView = 'notice_detail'
            }
        },
        goToNoticeDetail() {
            this.currentView = 'notice_detail' // 切换到通知详情组件
        },
        goToNoticeAnnouce(info) {
            // 在这里接收从 NoticeDrafts 组件传递过来的id，并更新 info
            this.info = info;
            console.log('parent.notice:' + this.info)
            this.$refs.noticeAnnouce.hasInfo = true
            this.$refs.noticeAnnouce.initializeForm(info)
            this.currentView = 'notice_annouce' // 切换到通知发布组件
        },
        clearInfo() {
            this.info = null
            console.log('info cleared')
        }
    }
}
</script>
<style scoped>
.side-menu {
    position: fixed;
    /* 固定定位 */
    left: 0;
    /* 距离左侧0 */
    top: 0;
    /* 距离顶部0 */
    height: 100vh;
    width: 15vw;
    background-color: #545c64;
    color: #ffffff;
    border-right: 1px solid #333;
    align-items: center;
    justify-items: center;
}

.main-content {
    position: fixed;
    right: 0;
    top: 0;
    width: 85vw;
    height: 100%;
    background-color: #fff;
}
</style>