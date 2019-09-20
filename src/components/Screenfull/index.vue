<template>
  <div>
    <span @click="click">
      <i class="fa fa-arrows-alt screenfull-svg"/>
    </span>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  props: {
    width: {
      type: Number,
      default: 22
    },
    height: {
      type: Number,
      default: 22
    },
    fill: {
      type: String,
      default: '#48576a'
    }
  },
  data() {
    return {
      isFullscreen: false
    }
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  font-size: 20px;
  vertical-align: 10px;
}
</style>
