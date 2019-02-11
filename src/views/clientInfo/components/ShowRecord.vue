<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      class="dialog-wrapper"
      width="400px">
      <div id="outHeader">
        <div id="header">
          <img
            :src="imgUrl"
            width="50"
            height="50"
            display="flex"
            class="clientImage"
            alt="">
          <div display="flex">abc</div>
        </div>
      </div>
      <div id="contactBody">
        <div class="clientMessage">
          <div class="clientDiag">
            <img
              :src="imgUrl"
              width="40"
              height="40"
              display="flex"
              class="clientPortrait"
              alt="">
            <div display="flex" class="content">
              <div class="time">
                <span class="name">王小仙</span>
                <span class="date">2018-10-11 11.07:00</span>
              </div>
              <div class="saying">
                <div class="block"/>
                <div class="para">
                  <div class="audioModel" @click="audioPlayer">
                    <i v-if="audioPlay" class="iconfont icon-suspend_icon audioIcon"/>
                    <i v-else class="iconfont icon-bofang audioIcon"/>
                    <div>音频消息</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clientMessage">
          <div class="clientDiag">
            <img
              :src="imgUrl"
              width="40"
              height="40"
              display="flex"
              class="clientPortrait"
              alt="">
            <div display="flex" class="content">
              <div class="time">
                <span class="name">王小仙</span>
                <span class="date">2018-10-11 11.07:00</span>
              </div>
              <div class="saying">
                <div class="block"/>
                <div class="para">你没发错吧</div>
              </div>
            </div>
          </div>
        </div>
        <div class="clientMessage">
          <div class="clientDiag">
            <img
              :src="imgUrl"
              width="40"
              height="40"
              display="flex"
              class="clientPortrait"
              alt="">
            <div display="flex" class="content">
              <div class="time">
                <span class="name">王小仙</span>
                <span class="date">2018-10-11 11.07:00</span>
              </div>
              <div class="saying">
                <div class="block"/>
                <div class="para">
                  <div class="videoModel" @click="videoPlayer">
                    <i class="iconfont icon-bofang videoIcon"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="myMessage">
          <div class="myDiag">
            <div display="flex" class="content">
              <div class="time">
                <span class="name">王小仙</span>
                <span class="date">2018-10-11 11.07:00</span>
              </div>
              <div class="saying">
                <div class="block"/>
                <div class="para">你没发错吧shgdfhjsgfhjsghfghjfgjh和角色官方活动是个很高很高</div>
              </div>
            </div>
            <img
              :src="myImgUrl"
              width="40"
              height="40"
              display="flex"
              class="myPortrait"
              alt="">
          </div>
        </div>
      </div>
    </el-dialog>
    <video-player :video-play="videoPlay" :src="videoSrc" @playStatus="playStatus"/>
    <audio-player :audio-play="audioPlay" :src="audioSrc" @end="end"/>
  </div>
</template>
<script>
import videoPlayer from './VideoPlayer'
import audioPlayer from './AudioPlayer'
export default {
  name: 'ShowRecord',
  components: {
    videoPlayer,
    audioPlayer
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      videoPlay: false,
      audioPlay: false,
      dialogVisible: false,
      // audioSrc: 'http://111.202.98.147/amobile.music.tc.qq.com/C400000pfHiQ1TFe3e.m4a?guid=4702556639&vkey=725E283CD11D3EE4ACDEEA6229987B6B7DB90971C24C409B47A6D5F9C195C6858EE8589FA69C288205F5A01315D07B51069AB5EF56A3C9BD&uin=0&fromtag=66',
      audioSrc: 'http://111.202.98.143/amobile.music.tc.qq.com/C400000X41LW079jRG.m4a?guid=4702556639&vkey=9300EE07E69FC79E70A6C37FF333E307187CC8968D4F63ADF5B9B4431E58D0A751F153BA63EA409201825684F5A67891C3ACAC61637DEDED&uin=0&fromtag=66',
      videoSrc: 'http://123.57.220.217:81/wsyk/upload/20170427/20170427190405_760.mp4',
      imgUrl: require('../../../assets/images/portrait1.jpg'),
      myImgUrl: require('../../../assets/images/timg.jpeg')
    }
  },
  watch: {
    show() {
      this.dialogVisible = this.show
    },
    dialogVisible() {
      if (!this.dialogVisible) this.$emit('changeShow')
    }
  },
  methods: {
    changeShow() {
      this.showVideo = false
    },
    videoPlayer() {
      this.videoPlay = true
    },
    playStatus() {
      this.videoPlay = false
    },
    audioPlayer() {
      this.audioPlay = !this.audioPlay
    },
    end() {
      this.audioPlay = false
    },
    handleClose() {
      this.dialogVisible = false
      if (!this.audioPlay.paused) {
        this.audioPlay = false
      }
    }
  }
}
</script>

<style lang="scss">
  .dialog-wrapper {
    .el-dialog__header {
      background: #F8F8F8!important;
      height: 80px!important;
    }
    #header {
      width: 80%;
      display: flex;
      align-items: center;
      margin-top: -90px;
    }
    .clientImage, .clientPortrait {
      border-radius: 100%;
      margin-right: 15px;
    }
    .clientDiag {
      display: flex;
    }
    .myDiag {
      display: flex;
      justify-content: flex-end;
    }
    #contactBody {
      margin-top: 30px;
      .content {
        width: 305px;
      }
      .time{
        font-size: 12px;
        margin-bottom: 8px;
      }
      .videoModel {
        width: 120px;
        height: 80px;
        background: #333;
        line-height: 80px;
        text-align: center;
        .videoIcon {
          font-size: 36px;
          color: #fff;
          cursor: pointer;
        }
      }
      .audioModel {
        width: 56px;
        height: 50px;
        margin-top: 4px;
        // background: #333;
        // line-height: 80px;
        text-align: center;
        .audioIcon {
          font-size: 24px;
          color: #333;
          cursor: pointer;
        }
      }
      // .video {
      //   width: 100%;
      //   height: 100%;
      //   object-fit: fill;
      // }
      .clientMessage {
        margin-bottom: 10px;
        .para {
          width: fit-content;
          padding: 8px 15px;
          background: #e2e2e2;
          line-height: 22px;
          border-radius: 3px;
          word-break: break-all;
          color: #333;
          position: relative;
        }
        .para:after{
          content: '';
          position: absolute;
          left: -10px;
          top: 13px;
          width: 0;
          height: 0;
          border-style: solid dashed dashed;
          border-color: #e2e2e2 transparent transparent;
          overflow: hidden;
          border-width: 10px;
        }
      }
      .myMessage {
        margin-bottom: 10px;
        .content {
          text-align: right;
          .para {
            text-align: left;
          }
        }
        .para {
          width: fit-content;
          padding: 8px 15px;
          background: #5FB878;
          line-height: 22px;
          border-radius: 3px;
          word-break: break-all;
          color: #fff;
          position: relative;
        }
        .para:after{
          content: '';
          position: absolute;
          left: auto;
          right: -10px;
          top: 13px;
          border-top-color: #5FB878;
          width: 0;
          height: 0;
          border-style: solid dashed dashed;
          border-color: #5FB878 transparent transparent;
          overflow: hidden;
          border-width: 10px;
        }
        .myPortrait {
          border-radius: 100%;
          margin-left: 15px;
        }
      }
    }
  }
</style>

