<template>
    <div class="function">
        <!-- 左侧竖菜单栏 -->
        <el-menu :default-active="defaultView" class="side-menu" background-color="#545c64" text-color="#fff"
            active-text-color="#00ffbb">
            <el-menu-item index="personal_info" @click="currentView = 'personal_info'">个人信息</el-menu-item>
            <el-menu-item index="psw_reset" @click="currentView = 'psw_reset'">修改密码</el-menu-item>
            <router-link to="/home">
                <el-menu-item index="back">返回主页</el-menu-item>
            </router-link>
        </el-menu>

        <!-- 右侧内容区域 -->
        <div class="main-content">

        </div>
    </div>
</template>
<script>
    export default{
        name:'infoView',
        components:{

        },
        data(){
            return{
                defaultView:'personal_info',
            }
        },
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