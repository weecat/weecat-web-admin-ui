<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="fa fa-list-alt"/>
        <span>管理员详细信息</span>
      </div>
      <div>
        <i class="fa fa-info-circle"/>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">ID</el-col>
          <el-col :span="4" class="table-cell-title">用户名</el-col>
          <el-col :span="4" class="table-cell-title">邮箱</el-col>
          <el-col :span="4" class="table-cell-title">姓名</el-col>
          <el-col :span="4" class="table-cell-title">部门</el-col>
          <el-col :span="4" class="table-cell-title">启用</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ admin.id }}</el-col>
          <el-col :span="4" class="table-cell">{{ admin.username }}</el-col>
          <el-col :span="4" class="table-cell">{{ admin.email }}</el-col>
          <el-col :span="4" class="table-cell">{{ admin.name }}</el-col>
          <el-col :span="4" class="table-cell">{{ admin.department }}</el-col>
          <el-col :span="4" class="table-cell">
            <span v-if="admin.enabled === true" type="success">启用</span>
            <span v-if="admin.enabled === false" type="danger">禁用</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">是否锁定</el-col>
          <el-col :span="4" class="table-cell-title">注册时间</el-col>
          <el-col :span="4" class="table-cell-title">登录时间</el-col>
          <el-col :span="4" class="table-cell-title">登录IP</el-col>
          <el-col :span="4" class="table-cell-title">锁定时间</el-col>
          <el-col :span="4" class="table-cell-title">登录错误次数</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">
            <span v-if="admin.locked === true" type="danger">是</span>
            <span v-if="admin.locked === false" type="success">否</span>
          </el-col>
          <el-col :span="4" class="table-cell">{{ admin.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-col>
          <el-col :span="4" class="table-cell">{{ admin.loginDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-col>
          <el-col :span="4" class="table-cell">{{ admin.loginIp }}</el-col>
          <el-col :span="4" class="table-cell">{{ admin.lockedDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-col>
          <el-col :span="4" class="table-cell">{{ admin.loginFailCount }}</el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import AdminApi from '@/api/system/AdminApi'
import Pagination from '@/components/Pagination'

export default {
  name: 'AdminDetails',
  components: { Pagination },
  data() {
    return {
      id: '',
      admin: {}
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.id = id
    this.getDetails()
  },
  methods: {
    getDetails() {
      AdminApi.details(this.id).then(response => {
        this.admin = response.data.data.admin
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
<style scoped>
  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }

  .table-cell {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
</style>
