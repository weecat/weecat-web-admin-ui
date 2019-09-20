<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="fa fa-list-alt"/>
        <span>短信发送历史记录</span>
      </div>
      <div>
        <div class="filter-container">
          <el-form :inline="true" :model="listQuery" size="small">
            <el-form-item label="手机号码">
              <el-input v-model="listQuery.mobile" placeholder="手机号码"/>
            </el-form-item>
            <el-form-item label="发送时间">
              <el-date-picker
                v-model="dateRange"
                :picker-options="pickerOptions"
                :clearable="false"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="timestamp"
                align="left"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getList">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
          <el-table-column label="短信Id" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column width="120px" label="接收人手机号">
            <template slot-scope="scope">
              <span>{{ scope.row.mobile }}</span>
            </template>
          </el-table-column>

          <el-table-column label="短信内容">
            <template slot-scope="scope">
              <span>{{ scope.row.content }}</span>
            </template>
          </el-table-column>

          <el-table-column width="100px" align="center" label="短信类型">
            <template slot-scope="scope">
              <span>{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="发送状态" width="110">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 'SUCCESS'" type="success">{{ scope.row.statusName }}</el-tag>
              <el-tag v-if="scope.row.status === 'FAILED'" type="danger">{{ scope.row.statusName }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column width="180px" align="center" label="发送时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.pageSize"
          @pagination="getList"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
import SmsHistoryApi from '@/api/system/SmsHistoryApi'
import Pagination from '@/components/Pagination'

export default {
  name: 'SmsHistoryList',
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        mobile: '',
        dateRangeStart: '',
        dateRangeEnd: '',
        status: 'OTHER',
        type: 'OTHER',
        page: 1,
        pageSize: 10
      },
      dateRange: [
        moment().startOf('day').valueOf(),
        moment().add(1, 'days').valueOf()
      ],
      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick(picker) {
            picker.$emit('pick', [moment().startOf('day').valueOf(),
              moment().startOf('day').add(1, 'days').valueOf()])
          }
        }, {
          text: '昨日',
          onClick(picker) {
            picker.$emit('pick', [moment().startOf('day').subtract(1, 'days').valueOf(),
              moment().startOf('day').valueOf()])
          }
        }, {
          text: '最近7日',
          onClick(picker) {
            picker.$emit('pick', [moment().startOf('day').subtract(6, 'days').valueOf(),
              moment().startOf('day').valueOf()])
          }
        }, {
          text: '最近30日',
          onClick(picker) {
            picker.$emit('pick', [moment().startOf('day').subtract(29, 'days').valueOf(),
              moment().valueOf()])
          }
        }, {
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', [moment().startOf('month').valueOf(),
              moment().endOf('month').valueOf()])
          }
        }, {
          text: '上个月',
          onClick(picker) {
            picker.$emit('pick', [moment().subtract(1, 'month').startOf('month').valueOf(),
              moment().subtract(1, 'month').endOf('month').valueOf()])
          }
        }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      // 设置时间戳
      this.listQuery.dateRangeStart = this.dateRange[0]
      this.listQuery.dateRangeEnd = this.dateRange[1]
      SmsHistoryApi.list(this.listQuery).then(response => {
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
