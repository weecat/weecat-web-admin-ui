<template>
  <div v-if="errorLogs.length>0">
    <el-badge :is-dot="true" style="line-height: 30px;" @click.native="dialogTableVisible=true">
      <el-button size="small" type="danger" class="bug-btn">
        <i class="fa fa-bug"/>
      </el-button>
    </el-badge>

    <el-dialog :visible.sync="dialogTableVisible" title="Error Log" width="80%">
      <el-table :data="errorLogs" border>
        <el-table-column label="Message">
          <template slot-scope="scope">
            <div>
              <span class="message-title">Msg:</span>
              <el-tag type="danger">{{ scope.row.err.message }}</el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 10px;">Info: </span>
              <el-tag type="warning">{{ scope.row.vm.$vnode.tag }} error in {{ scope.row.info }}</el-tag>
            </div>
            <br>
            <div>
              <span class="message-title" style="padding-right: 16px;">Url: </span>
              <el-tag type="success">{{ scope.row.url }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Stack">
          <template slot-scope="scope">
            {{ scope.row.err.stack }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'ErrorLog',
  data() {
    return {
      dialogTableVisible: false
    }
  },
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs
    }
  }
}
</script>

<style scoped>
.bug-btn.el-button--small {
  padding: 9px 10px;
}
.bug-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
