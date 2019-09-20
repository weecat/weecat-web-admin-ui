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
            <el-form-item label="用户名">
              <el-input v-model="listQuery.username"/>
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
          <el-table-column width="120px" label="登录手机号">
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

          <el-table-column width="100px" align="center" label="性别">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.gender === 'FEMALE'" type="success">女</el-tag>
              <el-tag v-if="scope.row.gender === 'MALE'" type="info">男</el-tag>
            </template>
          </el-table-column>

          <el-table-column width="100px" align="center" label="民族">
            <template slot-scope="scope">
              <span>{{ scope.row.nation }}</span>
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
              <router-link v-permission="['user_edit'] " :to="'/users/valid/approve/'+scope.row.id">
                <el-button type="primary" size="small">
                  <i class="fa fa-edit"/> 认证
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
import UserValidApi from '@/api/users/UserValidApi'
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
      UserValidApi.list(this.listQuery).then(response => {
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .box-card-component {
    .box-card-header {
      position: relative;
      height: 150px;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;
        &:hover {
          transform: scale(1.1, 1.1);
          // filter: contrast(130%);
        }
      }
    }
  }
  .text-ellipsis{
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .text-sm{
    font-size: 14px;
  }
</style>
