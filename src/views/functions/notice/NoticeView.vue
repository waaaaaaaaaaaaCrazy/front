<template>
    <div class="function">
        <!-- 左侧竖菜单栏 -->
        <el-menu :default-active="defaultView" class="side-menu" background-color="#545c64" text-color="#fff"
            active-text-color="#00fff7">
            <el-menu-item index="notice_detail" @click="currentView = 'notice_detail'">通知详情</el-menu-item>
            <el-menu-item index="notice_list" @click="currentView = 'notice_list'">通知列表</el-menu-item>
            <el-menu-item index="notice_annouce" @click="currentView = 'notice_annouce'">通知发布</el-menu-item>
            <router-link to="/home">
                <el-menu-item index="back">返回主页</el-menu-item>
            </router-link>
        </el-menu>

        <!-- 右侧内容区域 -->
        <div class="main-content">
            <NoticeDetail v-show="currentView === 'notice_detail'" :noticeId="noticeId" />
            <NoticeList v-show="currentView === 'notice_list'" @goToNoticeDetail="goToNoticeDetail" />
            <NoticeAnnouce v-show="currentView === 'notice_annouce'" />
        </div>
    </div>
</template>
<script>
import NoticeAnnouce from './components/NoticeAnnouce.vue'
import NoticeDetail from './components/NoticeDetail.vue'
import NoticeList from './components/NoticeList.vue'

export default {
    name: 'noticeView',
    components: {
        NoticeAnnouce,
        NoticeDetail,
        NoticeList
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