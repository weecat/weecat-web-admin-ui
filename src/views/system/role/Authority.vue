<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="fa fa-list-alt"/>
        <span>权限管理</span>
      </div>
      <div>
        <el-tree
          ref="authorityTree"
          :check-strictly="true"
          :data="authorityTreeData"
          :props="defaultProps"
          show-checkbox
          node-key="authority">
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ node.label }}({{ data.authority }})</span>
          </span>
        </el-tree>
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
      authorityTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogVisible: false,
      props: {
        label: 'name',
        value: 'id'
      },
      categoryList: [{
        value: 'MENU',
        label: '菜单'
      }, {
        value: 'SUB_MENU',
        label: '子菜单'
      }, {
        value: 'BIZ',
        label: '业务功能'
      }],
      parentIds: [],
      authority: {
        parentId: '',
        category: 'MENU'
      },
      message: '超级管理员和普通管理员都是机构权限.超级管里员可以创建分支机构和创建普通管理员的权限'
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
    }
  }
}
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
