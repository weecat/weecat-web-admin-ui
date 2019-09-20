<template>
  <div class="app-container">
    <el-card class="form-container">
      <div slot="header">
        <i class="fa fa-user"/>
        <span>用户实名认证</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" size="small">
          <el-form-item v-if="user.valid === 'PENDING'">
            <el-button class="filter-item" type="success" @click="openApproveDialog">
              <i class="fa fa-legal"/> 实名认证审核
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
            <el-col :span="8">
              <el-form :model="user" label-width="120px">
                <el-form-item label="手机号">
                  <span>{{ user.username }}</span>
                </el-form-item>
                <el-form-item label="姓名">
                  <span>{{ user.name }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span v-if="user.gender === 'FEMALE'" type="success">女</span>
                  <span v-if="user.gender === 'MALE'" type="info">男</span>
                </el-form-item>
                <el-form-item label="民族">
                  <span>{{ user.nation }}</span>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form :model="user" label-width="120px">
                <el-form-item label="身份证号">
                  <span>{{ user.idCard }}</span>
                </el-form-item>
                <el-form-item label="所在地">
                  <span>{{ user.province }} {{ user.city }} {{ user.county }}</span>
                </el-form-item>
                <el-form-item label="出生日期">
                  <span>{{ user.birthday }}</span>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form :model="user" label-width="120px">
                <el-form-item label="实名认证">
                  <el-tag v-if="user.valid === 'UN_VALID'" type="waring">未认证</el-tag>
                  <el-tag v-if="user.valid === 'PENDING'" type="info">认证中</el-tag>
                  <el-tag v-if="user.valid === 'VALID'" type="success">已认证</el-tag>
                  <el-tag v-if="user.valid === 'REJECT'" type="danger">认证失败,需要重新提交认证</el-tag>
                </el-form-item>
                <el-form-item label="注册时间">
                  {{ user.createTime }}
                </el-form-item>
                <el-form-item label="最后登录时间">
                  {{ user.loginTime }}
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="fa fa-exchange"/> 实名认证资料
          </span>
          <el-row v-viewer :gutter="2" class="images">
            <el-col :xs="8" :sm="6" :md="4" style="margin-bottom: 10px;">
              <el-card class="box-card-component">
                <div slot="header" class="box-card-header">
                  <img src="/static/images/m0.jpg">
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="fa fa-exchange"/> 身份实地场景
          </span>
          <el-row v-viewer :gutter="2" class="images">
            <el-col :xs="8" :sm="6" :md="4" style="margin-bottom: 10px;">
              <el-card class="box-card-component">
                <div slot="header" class="box-card-header">
                  <img src="/static/images/m0.jpg">
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      width="400px"
      title="实名认证审核">
      <el-form ref="auditForm" :model="userValid" :rules="auditRules" label-width="80px">
        <el-form-item label="审核结果" prop="state">
          <el-select v-model="userValid.state">
            <el-option label="审核通过" value="APPROVED"/>
            <el-option label="审核驳回" value="REJECT"/>
          </el-select>
        </el-form-item>
        <el-form-item label="审核备注" prop="auditRemark">
          <el-input v-model="userValid.auditRemark" type="textarea" rows="5"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="approve">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import UserValidApi from '@/api/users/UserValidApi'
import Pagination from '@/components/Pagination'
import 'viewerjs/dist/viewer.css'
import Vue from 'vue'
import Viewer from 'v-viewer'
Vue.use(Viewer)
export default {
  name: 'CardDetails',
  components: { Pagination },
  data() {
    return {
      id: '',
      avatar: '/static/images/m0.jpg',
      user: {
        avatar: '/static/images/m0.jpg'
      },
      dialogVisible: false,
      userValid: {
        state: '',
        auditName: ''
      },
      auditRules: {
        state: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        auditRemark: [
          { required: true, message: '备注为空', trigger: 'blur' },
          { max: 120, message: '最长120个字符', trigger: 'blur' },
          { pattern: /^\S+$/, message: '不能有空格', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDetails()
  },
  methods: {
    getDetails() {
      UserValidApi.details(this.id).then(response => {
        this.user = response.data.data
      })
    },
    openApproveDialog() {
      this.dialogVisible = true
    },
    approve() {
      this.$refs['auditForm'].validate((valid) => {
        if (valid) {
          UserValidApi.approve(this.id, this.userValid).then(response => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getDetails()
            this.dialogVisible = false
          })
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
  .box-card-component{
    .el-card__header {
      padding: 0px!important;
    }
  }
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

