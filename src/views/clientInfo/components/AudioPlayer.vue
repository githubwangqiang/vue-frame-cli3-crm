<template>
  <div class="audio-wrapper">
    <audio id="audio" ref="audio" :src="src" controls @ended="audioEnd()">
      <source src="src">
    </audio>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
    audioPlay: {
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
    audioPlay() {
      console.log(this.audioPlay)
      if (!this.audioPlay) {
        new Promise((resolve, reject) => {
          resolve()
        }).then(() => {
          this.$refs.audio.pause()
        })
      } else {
        new Promise((resolve, reject) => {
          resolve()
        }).then(() => {
          this.$refs.audio.currentTime = 0
          this.$refs.audio.play()
        })
      }
    }
  },
  methods: {
    audioEnd() {
      this.$emit('end')
    }
  }
}
</script>

<style lang="scss">
  .audio-wrapper {
    width: 0;
    height: 0;
    visibility: hidden;
  }
</style>

