<template>
  <div class="app-container">
    <el-card class="form-container">
      <div slot="header" class="clearfix">
        <i class="fa fa-search-minus"/>
        <span>索引服务</span>
      </div>
      <div>
        <el-form ref="addForm" :model="search" label-width="150px">
          <el-form-item label="选择索引类型" prop="system">
            <el-select v-model="search.searchType" placeholder="请选择">
              <el-option key="WORK" label="作品" value="WORK"/>
              <el-option key="NEWS" label="新闻" value="NEWS"/>
              <el-option key="USER" label="用户" value="USER"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="loading" type="primary" @click="save">
              <i :class="!loading?'fa fa-save':'fa fa-spinner fa-spin'"/> 构建索引
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import SearchApi from '@/api/system/SearchApi'
export default {
  name: 'Index',
  data() {
    return {
      loading: false,
      search: {
        searchType: 'WORK'
      }
    }
  },
  methods: {
    save() {
      this.loading = true
      SearchApi.build(this.search).then(response => {
        this.$alert('构建索引成功', '提示', {
          type: 'success'
        }).then(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
