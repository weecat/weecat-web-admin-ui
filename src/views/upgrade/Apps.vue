<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="fa fa-list-alt"/>
        <span>APP升级管理</span>
      </div>
      <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column label="ID">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应用名称">
          <template slot-scope="scope">
            <span>{{ scope.row.appName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="BundleId">
          <template slot-scope="scope">
            <span>{{ scope.row.bundleId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="BundleName">
          <template slot-scope="scope">
            <span>{{ scope.row.bundleName }}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="应用分类">
          <template slot-scope="scope">
            <span>{{ scope.row.platform }}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="当前版本">
          <template slot-scope="scope">
            <span>{{ scope.row.currentVersion }}</span>
          </template>
        </el-table-column>
        <el-table-column width="180px" align="center" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <router-link v-if="scope.row.platform === 'GATEWAY'" :to="'/upgrade/gateway/details/'+scope.row.id">
              <el-button type="primary" size="small">
                <i class="fa fa-edit"/> 版本管理
              </el-button>
            </router-link>
            <router-link v-else :to="'/upgrade/app/details/'+scope.row.id">
              <el-button type="primary" size="small">
                <i class="fa fa-edit"/> 版本管理
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
    </el-card>
  </div>
</template>

<script>
import AppApi from '@/api/upgrade/AppApi'
import Pagination from '@/components/Pagination'

export default {
  name: 'AppList',
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
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
      AppApi.list(this.listQuery).then(response => {
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
