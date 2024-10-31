<template>
    <div>
        <!-- 搜索栏 -->
        <div style="display: flex; margin-top: 20px; margin-bottom: 20px; margin-left: 10px">
            <el-input v-model="searchTitle" placeholder="请输入通知标题搜索" clearable></el-input>
            <el-button type="success" style="margin-left: 10px; margin-right: 10px" @click="searchDraft" circle>
                <el-icon>
                    <Search />
                </el-icon>
            </el-button>
        </div>
        <!-- 草稿列表 -->
        <el-table ref="tableRef" row-key="time" :data="filteredTableData" style="width: 100%; margin-left: 10px;"
            highlight-current-row>
            <el-table-column fixed type="index" width="50px" />
            <el-table-column prop="time" label="日期" sortable width="300px" column-key="time">
                <template v-slot="click">
                    <div @click="handleDraftClick(click.row)">
                        {{ click.row.time }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题">
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
                    item.title.toLowerCase().includes(this.searchTitle.toLowerCase())
                )
            }
        },
        fetchDraftList() {
            console.log(sessionStorage.getItem('userInfo'))
            this.axios.get('https://apifoxmock.com/m1/5315127-4985126-default/api/get_notice_list', {
                params: { user: sessionStorage.getItem('userInfo') }
            })
                .then(response => {
                    // 将布尔值转换为字符串
                    const notices = response.data.notice.map(notice => ({
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
        handleDraftClick(row) {
            console.log('通知被点击:', row.id, row.time, row.title)
            this.$emit('goToNoticeAnnouce', row.id) // 触发父组件的 goToNoticeAnnouce 方法
        }
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