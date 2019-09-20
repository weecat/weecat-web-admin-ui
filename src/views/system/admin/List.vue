<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="fa fa-list-alt"/>
        <span>管理员列表</span>
      </div>
      <div>
        <div class="filter-container">
          <el-form :inline="true" :model="listQuery" size="small">
            <el-form-item label="用户名">
              <el-input v-model="listQuery.mobile" placeholder="用户名"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getList">查询</el-button>
            </el-form-item>
            <el-form-item>
              <router-link :to="'/system/admin/add'">
                <el-button type="success"><i class="fa fa-plus"/> 创建管理员</el-button>
              </router-link>
            </el-form-item>
          </el-form>
        </div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
          <el-table-column label="ID" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column width="120px" label="用户名">
            <template slot-scope="scope">
              <span>{{ scope.row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column width="180px" label="邮箱">
            <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="姓名">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100px" align="center" label="部门">
            <template slot-scope="scope">
              <span>{{ scope.row.department }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100" align="center" label="启用">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.enabled === true" type="success">启用</el-tag>
              <el-tag v-if="scope.row.enabled === false" type="danger">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="100" align="center" label="是否锁定">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.locked === true" type="danger">是</el-tag>
              <el-tag v-if="scope.row.locked === false" type="success">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="180px" align="center" label="注册时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <router-link :to="'/system/admin/edit/'+scope.row.id">
                <el-button type="primary" size="small">
                  <i class="fa fa-edit"/> 修改
                </el-button>
              </router-link>
              <el-button type="danger" size="small" @click="deleteDialog">
                <i class="fa fa-trash-o"/> 删除
              </el-button>
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
import AdminApi from '@/api/system/AdminApi'
import Pagination from '@/components/Pagination'

export default {
  name: 'AdminList',
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        mobile: '',
        page: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      AdminApi.list(this.listQuery).then(response => {
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      })
    },
    deleteDialog() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
