<template>
  <div class="app-container">
    <el-card class="form-container">
      <div slot="header">
        <i class="icon icon-wrench"/>
        <span>APP升级详情</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" size="small">
          <el-form-item>
            <el-upload
              ref="upload"
              :on-remove="handleRemove"
              :on-error="handleUploadError"
              :show-file-list="false"
              :auto-upload="true"
              :http-request="handleUpload"
              :limit="1"
              :multiple="false"
              name="file"
              action="">
              <el-button slot="trigger" size="small" type="success">上传安装包</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <el-progress :percentage="progress" :text-inside="true" :stroke-width="18" status="success"/>
      </div>
      <el-tabs type="border-card" style="margin-bottom: 20px;">
        <el-tab-pane>
          <div slot="label">
            <i class="fa fa-info-circle"/> 基本信息
          </div>
          <el-row>
            <el-col :span="8">
              <el-form :model="app" label-width="120px">
                <el-form-item label="应用名称">
                  {{ app.appName }}
                </el-form-item>
                <el-form-item label="bundleName">
                  <span>{{ app.bundleName }}(ios才有该项)</span>
                </el-form-item>
                <el-form-item label="目标平台">
                  <span>{{ app.platform }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  {{ app.createTime }}
                </el-form-item>
                <el-form-item label="更新时间">
                  {{ app.updateTime }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form :model="app" label-width="120px">
                <el-form-item label="BundleId">
                  {{ app.bundleId }}
                </el-form-item>
                <el-form-item label="版本号">
                  v{{ app.currentVersion }}
                </el-form-item>
                <el-form-item label="发布版代码">
                  {{ app.releaseVersionCode }}
                </el-form-item>
                <el-form-item label="发布版ID">
                  {{ app.releaseVersionId }}
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form :model="app" label-width="120px">
                <el-form-item label="升级日志">
                  {{ app.description }}
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="fa fa-exchange"/> 版本管理
          </span>
          <el-alert
            :closable="false"
            type="info"
            show-icon
            title="注意事项说明"
            style="margin-bottom: 10px"
            description="app版本只有在未发布的版本并且是刚上传的才能发布"/>
          <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column width="50px" label="ID">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column width="220px" label="BundleId">
              <template slot-scope="scope">
                <span>{{ scope.row.bundleId }}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="当前版本">
              <template slot-scope="scope">
                <span>{{ scope.row.versionName }}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="安装包大小">
              <template slot-scope="scope">
                <span>{{ scope.row.size }}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="下载地址">
              <template slot-scope="scope">
                <a :href="scope.row.downloadUrl">下载安装包</a>
              </template>
            </el-table-column>
            <el-table-column width="80px" align="center" label="版本代码">
              <template slot-scope="scope">
                <span>{{ scope.row.versionCode }}</span>
              </template>
            </el-table-column>
            <el-table-column width="350px" label="更新日志">
              <template slot-scope="scope">
                <pre>{{ scope.row.changeLog }}</pre>
              </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="状态信息">
              <template slot-scope="scope">
                <span>{{ scope.row.state }}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px" align="center" label="创建时间">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.active === false && scope.row.state == 'ACTIVE'"
                  type="primary"
                  size="small"
                  @click="openReleaseDialog(scope.row.id)">
                  <i class="fa fa-edit"/> 发布
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.pageSize"
            @pagination="getVersions"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      width="400px"
      title="发布新app版本">
      <el-form ref="releaseForm" :model="appRelease" label-width="80px">
        <el-form-item label="升级模式">
          <el-select v-model="appRelease.updateMode">
            <el-option label="静默升级" value="SILENT"/>
            <el-option label="常规升级" value="NORMAL"/>
            <el-option label="强制升级" value="FORCE"/>
          </el-select>
        </el-form-item>
        <el-form-item label="升级日志">
          <el-input v-model="appRelease.changeLog" type="textarea" rows="5"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="release">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import AppApi from '@/api/upgrade/AppApi'
import Pagination from '@/components/Pagination'
import OssClient from 'ali-oss'
import AppInfoParser from 'app-info-parser'

export default {
  name: 'UpgradeDetails',
  components: { Pagination },
  data() {
    return {
      id: '',
      app: {},
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 10
      },
      progress: 0,
      appVersion: {
        bundleId: '',
        icon: '',
        versionName: '',
        versionCode: '',
        appSize: 0,
        downloadUrl: ''
      },
      dialogVisible: false,
      appRelease: {
        appVersionId: '',
        updateMode: 'NORMAL',
        changeLog: ''
      }
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDetails()
    this.getVersions()
  },
  methods: {
    getDetails() {
      AppApi.details(this.id).then(response => {
        this.app = response.data.data
      })
    },
    getVersions() {
      this.listLoading = true
      AppApi.getVersions(this.id, this.listQuery).then(response => {
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      })
    },
    handleBeforeUpload(file) {
      console.log('handleBeforeUpload')
    },
    handleUpload(file) {
      const that = this
      // 先获取sts 然后调用阿里云oss sdk
      AppApi.getOssConfig().then(response => {
        const ossClient = new OssClient({
          endpoint: response.data.data.endpoint,
          accessKeyId: response.data.data.accessKeyId,
          accessKeySecret: response.data.data.accessKeySecret,
          stsToken: response.data.data.securityToken,
          bucket: response.data.data.bucket
        })
        const timestamp = (new Date()).valueOf()
        const fileName = response.data.data.directory + '/nexless_' + timestamp + '_' + file.file.name
        ossClient.multipartUpload(fileName, file.file, {
          progress: function(progress) {
            that.progress = parseInt(progress * 100)
          }
        }).then(result => {
          var appFile = file.file
          const parser = new AppInfoParser(appFile)
          parser.parse().then(appInfo => {
            console.log('appInfo ----> ', appInfo)
            // 判断是否apk还是ipa
            const splits = appFile.name.split('.')
            const fileType = splits[splits.length - 1]
            switch (fileType) {
              case 'ipa':
                that.appVersion.bundleId = appInfo.CFBundleIdentifier
                that.appVersion.icon = appInfo.icon
                that.appVersion.versionName = appInfo.CFBundleShortVersionString
                that.appVersion.versionCode = appInfo.CFBundleShortVersionString
                break
              case 'apk':
                that.appVersion.bundleId = appInfo.package
                that.appVersion.icon = appInfo.icon
                that.appVersion.versionName = appInfo.versionName
                that.appVersion.versionCode = appInfo.versionCode
                break
            }
            that.appVersion.appSize = appFile.size
            that.appVersion.downloadUrl = result.name
            console.log('appInfo ----> ', that.appVersion)
            AppApi.publish(that.id, that.appVersion).then(response => {
              that.$alert('文件上传成功', '系统提示', {
                confirmButtonText: '确定',
                callback: action => {
                  that.$refs['upload'].clearFiles()
                  that.progress = 0
                  that.getVersions()
                }
              })
            })
          }).catch(err => {
            console.log('err ----> ', err)
          })
        }).catch(err => {
          console.log('err:', err)
        })
      })
    },
    handleUploadError() {
      this.$message.error('上传失败，请重新上传')
    },
    cancelUpload() {
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    openReleaseDialog(appVersionId) {
      this.appRelease.appVersionId = appVersionId
      this.dialogVisible = true
    },
    release() {
      AppApi.release(this.id, this.appRelease).then(response => {
        this.$alert('发布成功', '系统提示', {}).then(() => {
          this.getDetails()
          this.getVersions()
          this.appRelease.changeLog = ''
          this.dialogVisible = false
        })
      })
    }
  }
}
</script>
<style>
  .el-form-item .el-form-item__label {
    font-size: 14px;
    color: #1f2d3d;
  }

  pre{
    font-size: 12px;
    white-space:pre-wrap; /* css3.0 */
    white-space:-moz-pre-wrap; /* Firefox */
    white-space:-o-pre-wrap; /* Opera 7 */
    word-wrap:break-word; /* Internet Explorer 5.5+ */
  }
</style>
