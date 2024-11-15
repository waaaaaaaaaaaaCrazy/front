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
        <el-table ref="tableRef" row-key="index" :data="filteredTableData" style="width: 100%; margin-left: 10px;"
            highlight-current-row>
            <el-table-column fixed type="index" width="50px" />
            <!-- 预计做成日期选择器的形式，但ai老出问题 -->
            <el-table-column prop="cnTime" label="日期" sortable width="300px">
                <template v-slot="click">
                    <div @click="handleNoticeClick(click.row)">
                        {{ click.row.cnTime }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="cnTitle" label="标题">
                <!-- 这里不知道为什么一加就报错，标题变成日期，而且无法更新，报错
                 ResizeObserver loop completed with undelivered notifications -->
                <!-- <template v-slot="click">
                    <div @click="handleNoticeClick(click.row)">
                        {{ click.row.cnTime }}
                    </div>
                </template> -->
            </el-table-column>
            <el-table-column fixed="right" prop="isRead" label="状态" width="250px" :filters="[
                { text: '已读', value: '已读' },
                { text: '未读', value: '未读' },
            ]" :filter-method="filterTag" filter-placement="bottom-end">
                <template #default="scope">
                    <el-tag :type="scope.row.isRead === '已读' ? 'primary' : 'warning'" disable-transitions>{{ scope.row.isRead
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
            userID: 1/*sessionStorage.getItem('userID')*/,
            isTeacher: 1/*sessionStorage.getItem('isTeacher')*/,
            searchTitle: '',
            filteredTableData: [],
            tableRef: null,
            tableData: [
                {
                    cnID: 1,
                    cnTime: '2016-05-03',
                    cnTitle: '通知1',
                    isRead: '已读',
                },
                {
                    cnID: 2,
                    cnTime: '2016-05-02',
                    cnTitle: '重要通知2',
                    isRead: '未读',
                },
                {
                    cnID: 3,
                    cnTime: '2016-05-04',
                    cnTitle: '紧急通知3',
                    isRead: '已读',
                },
                {
                    cnID: 4,
                    cnTime: '2016-05-01',
                    cnTitle: '日常通知4',
                    isRead: '未读',
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
                    item.cnTitle.toLowerCase().includes(this.searchTitle.toLowerCase())
                )
            }
        },
        fetchNoticeList() {//https://apifoxmock.com/m1/5315127-4985126-default/api/get_notice_list
            console.log(sessionStorage.getItem('userID'))
            this.axios.get(`/api/notice/getAll/${this.userID}`,
                { params: { sID: this.userID } }
            ).then(response => {
                const notices = response.data.map(notice => ({
                    ...notice,
                    cnTime: notice.cnTime.replace(/T/g, ' ').replace(/.[\d]{3}Z/, ' '),
                    isRead: notice.isRead === '1' ? '已读' : '未读'
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
            this.tableRef.clearFilter(['cnTime'])
        },
        clearFilter() {
            this.tableRef.clearFilter()
        },
        filterTag(value, row) {
            return row.isRead === value
        },
        filterHandler(value, row, column) {
            const property = column.property
            return row[property] === value
        },
        handleNoticeClick(row) {
            console.log('通知被点击:', row.cnTime, row.cnTitle)
            this.axios.put(`/api/studentNotice/update/${row.snID}`,
                        { params: { snID: row.snID } })
                        .then(res => {
                            console.log('updateMsg:',res.data)
                        })
            this.$router.push({
                name: 'NoticeDetail',
                params: { noticeId: row.cnID },
                query: {
                    noticeTime: row.cnTime,
                    noticeTitle: row.cnTitle
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