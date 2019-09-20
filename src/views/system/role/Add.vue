<template>
  <div class="app-container">
    <el-card class="form-container">
      <div slot="header" class="clearfix">
        <i class="fa fa-plus-circle"/>
        <span>创建角色</span>
      </div>
      <div>
        <el-form ref="addForm" :model="role" :rules="rules" label-width="150px">
          <el-form-item label="角色名" prop="name">
            <el-col :span="5">
              <el-input v-model="role.name"/>
            </el-col>
          </el-form-item>
          <el-form-item label="是否是系统内置" prop="system">
            <el-radio-group v-model="role.system">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="描述信息" prop="description">
            <el-col :span="10">
              <el-input v-model="role.description" rows="5" type="textarea"/>
            </el-col>
          </el-form-item>
          <el-form-item label="自定义权限">
            <el-tree
              ref="authorityTree"
              :check-strictly="true"
              :data="authorityTreeData"
              :props="defaultProps"
              show-checkbox
              node-key="authority"/>
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
export default {
  name: 'RoleAdd',
  data() {
    return {
      authorityTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      role: {
        name: '',
        system: true,
        description: '',
        authorityList: []
      },
      rules: {
        name: [
          { required: true, message: '角色名不能为空', trigger: 'blur' },
          { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '描述信息不能为空', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 0 到 255 个字符', trigger: 'blur' }
        ],
        authorities: [
          { type: 'array', required: true, message: '角色权限没有选择', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getAuthority()
  },
  methods: {
    getAuthority() {
      RoleApi.getAuthority().then(response => {
        this.authorityTreeData = response.data.data
      })
    },
    onSubmit() {
      this.role.authorityList = this.$refs['authorityTree'].getCheckedKeys()
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          RoleApi.create(this.role).then(response => {
            if (response.data.code === '1005000') {
              this.$alert('参数验证错误:' + response.data.msg, '提示', {
                type: 'warning'
              })
            } else {
              this.$alert('创建角色成功', '提示', {
                type: 'success'
              }).then(() => {
                this.role = {}
              })
            }
          })
        }
      }) // valid end
    }
  }
}
</script>
