<template>
  <div class="video-wrapper">
    <el-dialog
      :visible.sync="dialogVisible"
      title="播放视频"
      class="wrapper"
      width="500px">
      <video id="video" ref="video" :src="src" controls preload autoplay="true"/>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    videoPlay: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      videoSrc: ''
    }
  },
  watch: {
    videoPlay() {
      if (!this.videoPlay) return false
      this.dialogVisible = this.videoPlay
      new Promise((resolve, reject) => {
        this.dialogVisible = this.videoPlay
        resolve()
      }).then(() => {
        this.$refs.video.currentTime = 0
        this.$refs.video.play()
      })
    },
    dialogVisible() {
      if (!this.dialogVisible) {
        this.$refs.video.pause()
        this.$emit('playStatus')
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
  .video-wrapper {
    .wrapper {
      .el-dialog__header {
        background: #F8F8F8!important;
      }
      .el-dialog__body {
        padding: 0
      }
      #video {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    }
  }
</style>

