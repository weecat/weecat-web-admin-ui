<template>
  <div class="app-container">
    <el-card class="form-container">
      <div slot="header">
        <i class="fa fa-user"/>
        <span>用户详情</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" size="small">
          <el-form-item>
            <el-button
              v-if="userInfo.state ==='LOCKED'"
              class="filter-item"
              type="success"
              @click="unfreeze">
              <i class="fa fa-play"/> 启用
            </el-button>
            <el-button v-else class="filter-item" type="danger" @click="freeze">
              <i class="fa fa-pause"/> 停用
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-tabs type="border-card" style="margin-bottom: 20px;">
        <el-tab-pane>
          <div slot="label">
            <i class="fa fa-info-circle"/> 基本信息
          </div>
          <el-row>
            <el-col :span="4">
              <el-form :model="userInfo">
                <el-form-item prop="avatar">
                  <div class="avatar-uploader">
                    <div tabindex="0" class="el-upload el-upload--text">
                      <img :src="userInfo.fullPathAvatar" class="avatar">
                    </div>
                  </div>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form :model="userInfo" label-width="120px">
                <el-form-item label="手机号">
                  <span>{{ userInfo.username }}</span>
                </el-form-item>
                <el-form-item label="姓名">
                  {{ userInfo.name }}
                </el-form-item>
                <el-form-item label="性别">
                  <span v-if="userInfo.gender === 'FEMALE'">
                    <i class="fa fa-female"/> 女
                  </span>
                  <span v-if="userInfo.gender === 'MALE'">
                    <i class="fa fa-male"/> 男
                  </span>
                </el-form-item>
                <el-form-item label="身份证号">
                  {{ userInfo.idCard }}
                </el-form-item>
                <el-form-item label="出生日期">
                  {{ userInfo.birthday }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form :model="userInfo" label-width="120px">
                <el-form-item label="民族">
                  {{ userInfo.nation }}
                </el-form-item>
                <el-form-item label="账号状态">
                  <el-tag v-if="userInfo.state ==='LOCKED'" type="danger">停用</el-tag>
                  <el-tag v-if="userInfo.state ==='ACTIVE'" type="success">启用</el-tag>
                </el-form-item>
                <el-form-item label="注册时间">
                  {{ userInfo.createTime }}
                </el-form-item>
                <el-form-item label="最后登录时间">
                  {{ userInfo.loginTime }}
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="fa fa-key"/> 登录日志
          </span>
          登录日志
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import UsersApi from '@/api/users/UsersApi'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'
export default {
  name: 'WorkDetails',
  components: { Pagination },
  directives: { permission },
  data() {
    return {
      id: '',
      userInfo: {
        avatar: ''
      },
      usageRecords: {
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          user: '',
          page: 1,
          pageSize: 10
        }
      }
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDetails()
  },
  methods: {
    getDetails() {
      UsersApi.details(this.id).then(response => {
        this.userInfo = response.data.data
      })
    },
    reset() {
      this.$confirm('确定要密码重置为[000000]吗?', '重置密码', { type: 'warning' }).then(() => {
        UsersApi.reset(this.id).then(response => {
          this.getDetails()
          this.$message({ type: 'success', message: '操作成功!' })
        })
      }).catch(() => {})
    },
    freeze() {
      this.$confirm('确定要禁用该账户么?', '禁用账户', { type: 'warning' }).then(() => {
        UsersApi.freeze(this.id).then(response => {
          this.getDetails()
          this.$message({ type: 'success', message: '操作成功!' })
        })
      }).catch(() => {})
    },
    unfreeze() {
      this.$confirm('确定要启用账户么?', '启用账户', { type: 'warning' }).then(() => {
        UsersApi.unfreeze(this.id).then(response => {
          this.getDetails()
          this.$message({ type: 'success', message: '操作成功!' })
        })
      }).catch(() => {})
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .filter-container {
     padding-bottom: 0px;
  }
</style>
