<template>
  <div class="app-container">
    <el-card class="form-container">
      <div slot="header" class="clearfix">
        <i class="fa fa-edit"/>
        <span>修改角色</span>
      </div>
      <div>
        <el-form ref="form" :model="role" label-width="150px">
          <el-form-item label="ID">
            <el-col :span="5">
              <el-input v-model="id" disabled=""/>
            </el-col>
          </el-form-item>
          <el-form-item label="角色名">
            <el-col :span="5">
              <el-input v-model="role.name"/>
            </el-col>
          </el-form-item>
          <el-form-item label="是否是系统内置">
            <el-radio-group v-model="role.system" disabled>
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="描述信息">
            <el-col :span="10">
              <el-input v-model="role.description" rows="5" type="textarea"/>
            </el-col>
          </el-form-item>
          <el-form-item label="权限设置">
            <el-tree
              ref="authorityTree"
              :check-strictly="true"
              :data="authorityTreeData"
              :props="defaultProps"
              :default-expanded-keys="role.authorityList"
              :default-checked-keys="role.authorityList"
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
  name: 'RoleEdit',
  data() {
    return {
      id: '',
      authorityTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      role: {
        name: '',
        system: '',
        description: '',
        authorityList: []
      }
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDetails()
    this.getAuthority()
  },
  methods: {
    getAuthority() {
      RoleApi.getAuthority().then(response => {
        this.authorityTreeData = response.data.data
      })
    },
    getDetails() {
      RoleApi.details(this.id).then(response => {
        this.role = response.data.data.role
      })
    },
    onSubmit() {
      this.role.authorityList = this.$refs['authorityTree'].getCheckedKeys()
      RoleApi.update(this.id, this.role).then(response => {
        this.$alert('修改角色成功', '提示', {
          type: 'success'
        }).then(() => {
        })
      })
    }
  }
}
</script>
