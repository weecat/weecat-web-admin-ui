<template>
  <div class="app-container">
    <el-card class="form-container">
      <div slot="header" class="clearfix">
        <i class="fa fa-plus-circle"/>
        <span>创建管理员</span>
      </div>
      <div>
        <el-form ref="addForm" :model="admin" :rules="rules" label-width="150px">
          <el-form-item label="手机号" prop="username">
            <el-col :span="5">
              <el-input v-model="admin.username"/>
            </el-col>
          </el-form-item>
          <el-form-item label="密码">
            <el-col :span="5">
              <el-input v-model="admin.password"/>
            </el-col>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-col :span="5">
              <el-input v-model="admin.email"/>
            </el-col>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-col :span="5">
              <el-input v-model="admin.name"/>
            </el-col>
          </el-form-item>
          <el-form-item label="所在部门">
            <el-col :span="5">
              <el-input v-model="admin.department"/>
            </el-col>
          </el-form-item>
          <el-form-item label="是否启用" prop="enabled">
            <el-radio-group v-model="admin.enabled">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="角色设置" prop="roleIds">
            <el-checkbox-group v-model="admin.roleIds">
              <template v-for="role in roles">
                <el-checkbox :key="role.id" :label="role.id" >{{ role.name }}</el-checkbox>
              </template>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">
              <i class="fa fa-save"/> 保存
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import RoleApi from '@/api/system/RoleApi'
import AdminApi from '@/api/system/AdminApi'
export default {
  name: 'AdminAdd',
  data() {
    return {
      admin: {
        enabled: true,
        roleIds: []
      },
      roles: [],
      rules: {
        username: [
          { required: true, message: '请输入登录手机号', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '必须选择该项', trigger: 'blur' }
        ],
        roleIds: [
          { required: true, message: '角色不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.queryRoles()
  },
  methods: {
    queryRoles() {
      RoleApi.list(this.listQuery).then(response => {
        this.roles = response.data.data
      })
    },
    onSubmit() {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          AdminApi.create(this.admin).then(response => {
            this.$alert('创建管理员成功', '提示', {
              type: 'success'
            }).then(() => {
              this.admin = {}
            })
          })
        }
      })
    }
  }
}
</script>
