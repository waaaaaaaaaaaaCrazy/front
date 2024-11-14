<template>
    <div>
        <!-- 搜索栏 -->
        <div style="display: flex; margin-top: 20px; margin-bottom: 20px; margin-left: 10px">
            <el-input v-model="searchTitle" placeholder="请输入草稿标题搜索" clearable></el-input>
            <el-button type="success" style="margin-left: 10px; margin-right: 10px" @click="searchDraft" circle>
                <el-icon>
                    <Search />
                </el-icon>
            </el-button>
        </div>
        <!-- 草稿列表 -->
        <el-table ref="tableRef" row-key="index" :data="filteredTableData" style="width: 100%; margin-left: 10px;"
            highlight-current-row>
            <el-table-column fixed type="index" width="50px" />
            <el-table-column prop="cnTime" label="日期" sortable width="300px" column-key="cnTime">
            </el-table-column>
            <el-table-column prop="cnTitle" label="标题">
            </el-table-column>
            <el-table-column label="操作" width="250px">
                <template v-slot="scope">
                    <el-button type="warning" size="small" @click="handleModify(scope.row)" text>修改</el-button>
                    <el-button type="warning" size="small" @click="handleDelete(scope.row)" text>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { Search } from '@element-plus/icons-vue'

export default {
    components: {
        Search,
    },
    data() {
        return {
            userID: sessionStorage.getItem('userID'),

            searchTitle: '',
            filteredTableData: [],
            tableRef: null,
            tableData: [],
        }
    },
    mounted() {
        this.fetchDraftList()
    },
    methods: {
        searchDraft() {
            if (this.searchTitle.trim() === '') {
                this.filteredTableData = this.tableData
            } else {
                this.filteredTableData = this.tableData.filter(item =>
                    item.cnTitle.toLowerCase().includes(this.searchTitle.toLowerCase())
                )
            }
        },
        fetchDraftList() {
            console.log(sessionStorage.getItem('userID'))
            this.axios.get('/api/notice/getAll', {
                params: { userID: sessionStorage.getItem('userID') }
            })
                .then(response => {
                    // 将布尔值转换为字符串
                    const notices = response.data.map(notice => ({
                        ...notice,
                        tag: notice.tag ? '已读' : '未读'
                    }))
                    this.tableData = notices
                    this.filteredTableData = notices // 更新 filteredTableData
                    console.log('Fetched data:', this.tableData)
                })
                .catch(error => {
                    console.error('Error fetching notice list:', error)
                })
        },
        handleModify(row) {
            console.log('草稿修改被点击:', row.cnID, row.cnTime, row.cnTitle)
            this.$emit('goToNoticeAnnouce', row.cnID) // 触发父组件的 goToNoticeAnnouce 方法
        },
        handleDelete(row) {
            // 处理删除操作
            console.log('草稿删除被点击:', row.cnID, row.cnTime, row.cnTitle)
            this.axios.delete(`/api/notice/delete/${row.cnID}`, { cnID: row.cnID })
                .then(response => {
                    if (response.status === 200) {
                        this.$message({
                            message: '删除成功！',
                            type: "success",
                        })
                    }
                    else {
                        this.$message({
                            message: '删除失败！',
                            type: "warning",
                        })
                    }
                })
                .catch(error => {
                    console.error('删除请求出错:', error);
                    this.$message({
                        message: '删除请求出错！',
                        type: "error",
                    });
                })
            this.$router.go(0)
        },
    },
    watch: {
        searchTitle: {
            handler(newVal) {
                if (newVal.trim() === '') {
                    this.filteredTableData = this.tableData
                } else {
                    this.searchDraft()
                }
            },
            immediate: true
        }
    }
}
</script>

<style></style>