<template>
    <div>
        <!-- 搜索栏 -->
        <div style="display: flex; margin-top: 20px; margin-bottom: 20px; margin-left: 10px">
            <el-input v-model="searchTitle" placeholder="请输入通知标题搜索" clearable></el-input>
            <el-button type="primary" style="margin-left: 10px; margin-right: 10px" @click="searchNotice" circle>
                <el-icon>
                    <Search />
                </el-icon>
            </el-button>
        </div>
        <!-- 通知列表 -->
        <el-table ref="tableRef" row-key="time" :data="filteredTableData" style="width: 100%; margin-left: 10px;"
            highlight-current-row>
            <el-table-column fixed type="index" width="50px" />
            <!-- 预计做成日期选择器的形式，但ai老出问题 -->
            <el-table-column prop="time" label="日期" sortable width="300px" column-key="time" :filters="[
                { text: '2016-05-01', value: '2016-05-01' },
                { text: '2016-05-02', value: '2016-05-02' },
                { text: '2016-05-03', value: '2016-05-03' },
                { text: '2016-05-04', value: '2016-05-04' },
            ]" :filter-method="filterHandler">
                <template v-slot="click">
                    <div @click="handleNoticeClick(click.row)">
                        {{ click.row.time }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题">
                <!-- 这里不知道为什么一加就报错，标题变成日期，而且无法更新，报错
                 ResizeObserver loop completed with undelivered notifications -->
                <!-- <template v-slot="click">
                    <div @click="handleNoticeClick(click.row)">
                        {{ click.row.time }}
                    </div>
                </template> -->
            </el-table-column>
            <el-table-column fixed="right" prop="tag" label="状态" width="250px" :filters="[
                { text: '已读', value: '已读' },
                { text: '未读', value: '未读' },
            ]" :filter-method="filterTag" filter-placement="bottom-end">
                <template #default="scope">
                    <el-tag :type="scope.row.tag === '已读' ? 'primary' : 'warning'" disable-transitions>{{ scope.row.tag
                        }}</el-tag>
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
            searchTitle: '',
            filteredTableData: [],
            tableRef: null,
            tableData: [
                {
                    time: '2016-05-03',
                    title: '通知1',
                    tag: '已读',
                },
                {
                    time: '2016-05-02',
                    title: '重要通知2',
                    tag: '未读',
                },
                {
                    time: '2016-05-04',
                    title: '紧急通知3',
                    tag: '已读',
                },
                {
                    time: '2016-05-01',
                    title: '日常通知4',
                    tag: '未读',
                },
            ],
        }
    },
    mounted() {
        this.fetchNoticeList()
    },
    methods: {
        searchNotice() {
            if (this.searchTitle.trim() === '') {
                this.filteredTableData = this.tableData
            } else {
                this.filteredTableData = this.tableData.filter(item =>
                    item.title.toLowerCase().includes(this.searchTitle.toLowerCase())
                )
            }
        },
        fetchNoticeList() {
            console.log(sessionStorage.getItem('userID'))
            this.axios.get('https://apifoxmock.com/m1/5315127-4985126-default/api/get_notice_list', {
                params: { userID: sessionStorage.getItem('userID') }
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
        resetDateFilter() {
            this.tableRef.clearFilter(['time'])
        },
        clearFilter() {
            this.tableRef.clearFilter()
        },
        filterTag(value, row) {
            return row.tag === value
        },
        filterHandler(value, row, column) {
            const property = column.property
            return row[property] === value
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
            this.$emit('goToNoticeDetail') // 触发父组件的 goToNoticeDetail 方法
        }
    },
    watch: {
        searchTitle: {
            handler(newVal) {
                if (newVal.trim() === '') {
                    this.filteredTableData = this.tableData
                } else {
                    this.searchNotice()
                }
            },
            immediate: true
        }
    }
}
</script>

<style>
/* 你可以在这里添加样式 */
</style>