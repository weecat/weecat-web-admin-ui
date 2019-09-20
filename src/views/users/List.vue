<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-date"/>
        <span>用户列表</span>
      </div>
      <div>
        <div class="filter-container">
          <el-form :inline="true" :model="listQuery" size="small">
            <el-form-item label="手机号">
              <el-input v-model="listQuery.username"/>
            </el-form-item>
            <el-form-item label="用户ID">
              <el-input v-model="listQuery.userId"/>
            </el-form-item>
            <el-form-item label="查询创建时间">
              <el-date-picker
                :picker-options="datePickerOptions"
                v-model="dateRange"
                :clearable="false"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"/>
            </el-form-item>
            <el-form-item label="所在地区">
              <el-cascader
                :options="areaOptions"
                v-model="listQuery.areaList"
                :props="props"
                :filterable="true"
                :clearable="true"
                :change-on-select="true"/>
            </el-form-item>
            <el-form-item>
              <el-button class="filter-item" type="primary" @click="getList">
                <i class="fa fa-search"/> 搜索
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
          <el-table-column label="序号" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="手机号">
            <template slot-scope="scope">
              <router-link :to="'/users/details/'+scope.row.id" class="link-type">
                <span>{{ scope.row.username }}</span>
              </router-link>
            </template>
          </el-table-column>

          <el-table-column width="150px" align="center" label="姓名">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="民族">
            <template slot-scope="scope">
              <span>{{ scope.row.nation }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="性别">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.gender === 'FEMALE'" type="success">女</el-tag>
              <el-tag v-if="scope.row.gender === 'MALE'" type="info">男</el-tag>
            </template>
          </el-table-column>

          <el-table-column width="150px" align="center" label="所在地区">
            <template slot-scope="scope">
              <span>{{ scope.row.province }} {{ scope.row.city }} {{ scope.row.county }}</span>
            </template>
          </el-table-column>

          <el-table-column class-name="status-col" label="是否实名认证" width="110">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.valid === 'UN_VALID'" type="waring">未认证</el-tag>
              <el-tag v-if="scope.row.valid === 'PENDING'" type="info">认证中</el-tag>
              <el-tag v-if="scope.row.valid === 'VALID'" type="success">已认证</el-tag>
              <el-tag v-if="scope.row.valid === 'REJECT'" type="danger">认证失败,需要重新提交认证</el-tag>
            </template>
          </el-table-column>

          <el-table-column width="180px" align="center" label="注册时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>

          <el-table-column width="180px" align="center" label="最后登录时间">
            <template slot-scope="scope">
              <span>{{ scope.row.loginTime }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <router-link :to="'/users/details/'+scope.row.id">
                <el-button type="primary" size="small">
                  <i class="fa fa-search-minus"/> 详情
                </el-button>
              </router-link>
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
import UsersApi from '@/api/users/UsersApi'
import AreaApi from '@/api/AreaApi'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'
export default {
  name: 'UserList',
  components: { Pagination },
  directives: { permission },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        username: '',
        userId: '',
        dateRangeStart: '',
        dateRangeEnd: '',
        areaList: [],
        page: 1,
        pageSize: 10
      },
      areaOptions: [],
      props: {
        label: 'name',
        value: 'name',
        children: 'children'
      },
      dateRange: [
        moment().subtract(1, 'years').valueOf(),
        moment().add(1, 'days').valueOf()
      ],
      datePickerOptions: {
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
              moment().startOf('day').add(1, 'days').valueOf()])
          }
        }, {
          text: '最近30日',
          onClick(picker) {
            picker.$emit('pick', [moment().startOf('day').subtract(29, 'days').valueOf(),
              moment().startOf('day').add(1, 'days').valueOf()])
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
    this.getAreaList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listQuery.dateRangeStart = this.dateRange[0]
      this.listQuery.dateRangeEnd = this.dateRange[1]
      UsersApi.list(this.listQuery).then(response => {
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      })
    },

    getAreaList() {
      AreaApi.list().then(response => {
        console.log(response.data)
        this.areaOptions = response.data.data
      })
    }
  }
}
</script>
