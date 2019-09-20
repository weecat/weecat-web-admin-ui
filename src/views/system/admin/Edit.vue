<template>
  <div class="app-container">
    <el-card class="form-container">
      <div slot="header" class="clearfix">
        <i class="fa fa-plus-circle"/>
        <span>编辑管理员</span>
      </div>
      <div>
        <el-form ref="addForm" :model="admin" :rules="rules" label-width="150px">
          <el-form-item label="手机号">
            <el-col :span="5">
              <el-input v-model="admin.username" disabled/>
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
            <el-checkbox-group v-model="roleIds">
              <el-checkbox v-for="role in roles" :key="role.id" :label="role.id">
                {{ role.name }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">
              <i class="fa fa-save"/> 保存
            </el-button>
            <el-button type="danger" @click="dialogVisible = true">重置密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" title="重置密码" width="400px">
      <el-form ref="resetForm" :model="resetForm" :rules="resetRules">
        <el-form-item label="密码" prop="password">
          <el-input v-model="resetForm.password" type="password"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
          <el-input v-model="resetForm.rePassword" type="password"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import RoleApi from '@/api/system/RoleApi'
import AdminApi from '@/api/system/AdminApi'
export default {
  name: 'AdminEdit',
  data() {
    return {
      id: '',
      dialogVisible: false,
      admin: {
      },
      roleIds: [],
      roles: [],
      resetForm: {
        password: '',
        rePassword: ''
      },
      resetRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        rePassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
          { required: true, validator: this.validateRePassword, trigger: 'blur' }
        ]
      },
      rules: {
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
    this.id = this.$route.params.id
    this.queryRoles()
    this.getDetails()
  },
  methods: {
    queryRoles() {
      RoleApi.list(this.listQuery).then(response => {
        this.roles = response.data.data
      })
    },
    getDetails() {
      AdminApi.details(this.id).then(response => {
        this.admin = response.data.data.admin
        this.roleIds = response.data.data.roleIds
      })
    },
    onSubmit() {
      this.admin.roleIds = this.roleIds
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          AdminApi.update(this.id, this.admin).then(response => {
            this.$alert('修改管理员成功', '提示', {
              type: 'success'
            }).then(() => {
              this.role = {}
            })
          })
        }
      })
    },
    validateRePassword(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    resetPassword() {
      this.$refs.resetForm.validate(valid => {
        if (valid) {
          AdminApi.reset(this.id, this.resetForm).then(response => {
            this.$alert('修改管理员密码成功', '提示', {
              type: 'success'
            }).then(() => {
              this.dialogVisible = false
              this.resetForm = {}
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
