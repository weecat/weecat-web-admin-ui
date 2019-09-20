<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="fa fa-list-alt"/>
        <span>角色列表</span>
      </div>
      <div>
        <div class="filter-container">
          <el-form :inline="true" size="small">
            <el-form-item>
              <router-link :to="'/system/role/add'">
                <el-button type="success"><i class="fa fa-plus"/> 创建角色</el-button>
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
          <el-table-column width="120px" label="角色名">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色描述信息">
            <template slot-scope="scope">
              <span>{{ scope.row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100" align="center" label="系统内置">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.system === true" type="success">是</el-tag>
              <el-tag v-if="scope.row.system === false" type="danger">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="150px" align="center" label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <router-link :to="'/system/role/edit/'+scope.row.id">
                <el-button type="primary" size="small">
                  <i class="fa fa-edit"/> 修改
                </el-button>
              </router-link>
              <el-button
                type="danger"
                size="small"
                @click="deleteDialog(scope.row.id)">
                <i class="fa fa-trash-o"/> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import RoleApi from '@/api/system/RoleApi'

export default {
  name: 'RoleList',
  data() {
    return {
      list: [],
      listLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      RoleApi.list(this.listQuery).then(response => {
        this.list = response.data.data
        this.listLoading = false
      })
    },
    deleteDialog(id) {
      this.$confirm('该角色关联的用户权限也会被删除, 确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        RoleApi.delete(id).then(response => {
          this.getList()
        })
      })
    }
  }
}
</script>
