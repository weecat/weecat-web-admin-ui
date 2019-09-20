<template>
  <div class="app-container">
    <el-card class="form-container" shadow="never">
      <div slot="header" class="clearfix">
        <i class="fa fa-edit"/>
        <span>编辑用户信息</span>
      </div>
      <el-form ref="editForm" :model="userInfo" :rules="rules" label-width="120px">
        <el-form-item label="姓名">
          <el-col :span="5">
            <el-input v-model="userInfo.name"/>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号" prop="cardId">
          <el-col :span="5">
            <el-input v-model="userInfo.cardId"/>
          </el-col>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="userInfo.birthday"
            type="date"
            format="yyyy-MM-dd"
            value-format="timestamp"/>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="userInfo.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio-group v-model="userInfo.state">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-col :span="10">
            <el-input v-model="userInfo.remark" rows="3" type="textarea"/>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update">
            <i class="fa fa-save"/> 保存信息
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import UsersApi from '@/api/users/UsersApi'
export default {
  name: 'UserEdit',
  data() {
    return {
      id: '',
      userInfo: {},
      rules: {
        cardId: [
          { pattern: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号不正确', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: this.$t('rules.required'), trigger: 'blur' }
        ],
        state: [
          { required: true, message: this.$t('rules.required'), trigger: 'blur' }
        ],
        remark: [
          { min: 0, max: 255, message: '长度在 0 到 255 个字符', trigger: 'blur' }
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
      UsersApi.details(this.id).then(response => {
        this.userInfo = response.data.data.userInfo
      })
    },
    update() {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          UsersApi.update(this.id, this.userInfo).then(response => {
            this.$alert('操作成功', '提示', { type: 'success' }).then(() => {
            })
          })
        }
      })
    }
  }
}
</script>
