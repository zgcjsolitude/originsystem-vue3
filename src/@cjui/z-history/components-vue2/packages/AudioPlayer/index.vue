<template>
  <div class="cjui-audio-player">
    <audio
      :ref="refName"
      @pause="onPause"
      @play="onPlay"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      :src="url"
      controls="controls"
    ></audio>
    <div class="cjui-audio-player--box">
      <div class="cjui-audio-player--header">
        <cjui-icon theme="music-playing_3" />
      </div>
      <div class="cjui-audio-player--body">
        <p>
          <a :href="url" target="_blank" download>
            <i class="el-icon-download"></i>
          </a>
          <i class="cjui-icon-s-fold" @click="menuShow = !menuShow"></i>
        </p>
        <p>
          <cjui-icon-svg theme="music-switch" />
          <el-slider
            :show-tooltip="false"
            :disabled="volumeDisable"
            v-model="volumeValue"
            @change="changeVolumeValue"
          ></el-slider>
          <i class="el-icon-d-arrow-left" @click="prevClick"></i>
          <i v-show="!playing" class="el-icon-video-play" @click="onPlay"></i>
          <i v-show="playing" class="el-icon-video-pause" @click="onPause"></i>
          <i class="el-icon-d-arrow-right" @click="nextClick"></i>
          <i class="el-icon-refresh" @click="refresh"></i>
        </p>
        <p>
          <span>{{ currentTime | formatSecond }}</span>
          <span>{{ maxTime | formatSecond }}</span>
        </p>
      </div>
    </div>
    <div class="cjui-audio-player--progress">
      <el-slider
        :show-tooltip="false"
        v-model="timeProgress"
        @change="changeCurrentTime"
      ></el-slider>
    </div>
    <div class="cjui-audio-player--menu" :class="[menuShow ? 'menu-show' : '']">
      <ul>
        <li v-for="(item, i) in audioList" :key="i">
          {{ item.name }}
          <i class="el-icon-close"></i>
        </li>
      </ul>
      <i class="el-icon-delete" @click="clearList"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "CjuiAudioPlayer",
  props: {
    url: String, // 播放对象地址
    fixed: {
      // 开启位置固定
      type: Boolean,
      default: false,
    },
    direction: {
      // 固定位置方位
      type: String,
      default: "left",
    },
    audioList: {
      // 播放列表
      type: Array,
      default: () => [],
    },
    refName: {
      type: String,
      default: "cjuiAudioPlayer",
    },
  },
  data() {
    return {
      playing: false, // 当前播放状态
      currentTime: 0, // 当前播放时长
      maxTime: 0, // 最大播放时长
      volumeValue: 100, // 音量值
      volumeDisable: false, // 音量状态
      timeProgress: 0, // 进度
      menuShow: false, // 列表显示
    };
  },
  methods: {
    // 更新音频播放流的当前时间
    onTimeupdate(res) {
      this.currentTime = parseInt(res.target.currentTime);
      this.timeProgress = parseInt((this.currentTime / this.maxTime) * 100);
    },
    // 获取音频播放最大时间
    onLoadedmetadata(res) {
      this.maxTime = Math.round(res.target.duration);
    },
    // 拖动进度条改变当前时间
    changeCurrentTime(index) {
      this.$refs[this.refName].currentTime = parseInt(
        (index * this.maxTime) / 100
      );
    },
    // 拖动进度条改变当前音量值
    changeVolumeValue(index) {
      this.$refs[this.refName].volume = index / 100;
    },
    // 触发事件
    clearList() {
      // 清空列表
      this.$emit("closeList");
    },
    prevClick() {
      // 播放下一首
      this.$emit("prevClick");
    },
    nextClick() {
      // 播放下一首
      this.$emit("nextClick");
    },
    // 公开方法
    onPlay() {
      // 播放
      this.playing = true;
      this.$refs[this.refName].play();
    },
    onPause() {
      // 暂停
      this.playing = false;
      this.$refs[this.refName].pause();
    },
    openVolume(value) {
      // 打开声音
      this.volumeDisable = false;
      this.$refs[this.refName].volume = this.volumeValue / 100;
    },
    closeVolume(value) {
      // 关闭声音
      this.volumeDisable = true;
      this.$refs[this.refName].volume = 0;
    },
    refresh() {
      // 刷新播放
      this.volumeDisable = false;
      this.$refs[this.refName].currentTime = 0;
      this.timeProgress = 0;
      this.onPlay();
    },
  },
  filters: {
    formatSecond(time = 0) {
      // 格式匹配 ========
      const opt = {
        "H+": Math.floor(time / 3600).toString(), // 时
        "m+": Math.floor((time % 3600) / 60).toString(), // 分
        "s+": ((time % 3600) % 60).toString(), // 秒
      };
      // ================

      let ret,
        format = "m:ss";
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(format);
        if (ret) {
          format = format.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return format;
    },
  },
};
</script>

<style lang="scss">
.cjui-audio-player {
  audio {
    width: 0;
    height: 0;
    visibility: hidden;
  }
}
.cjui-audio-player--box {
  width: 480px;
  height: 100px;
  background: rgba(19, 5, 25, 0.87);
  display: flex;
}
.cjui-audio-player--header {
  width: 100px;
  height: 100%;
}
.cjui-audio-player--body {
  height: 100%;
  flex: 1;
  color: #00d4b8;

  p {
    margin-bottom: 0;
  }
  i {
    cursor: pointer;
  }
  i:hover {
    color: #1ff3d7;
  }
  p:first-child {
    text-align: right;
    margin: 0.4em 1em 0;

    a {
      color: #00d4b8;
      margin-right: 0.5em;
    }
    a:hover {
      color: #1ff3d7;
    }
  }
  p:nth-child(2) {
    padding: 0 1em;

    i {
      font-size: 24px;
      vertical-align: middle;
      margin: 0 0.5em;
    }
  }
  p:last-child {
    display: flex;
    justify-content: space-between;
    padding: 0 1em;
  }
  .el-slider {
    width: 100px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 1em 5px;
  }
}
.cjui-audio-player--progress {
  width: 480px;

  .el-slider {
    margin-top: -1em;
  }
}
.cjui-audio-player--menu {
  width: 480px;
  height: 0px;
  overflow: auto;
  background: #17091c;
  margin-top: -1em;
  transition: all 0.3s ease-out;

  ul {
    padding: 0.5em 1em;
    margin-bottom: 0;
  }
  li {
    color: #00d4b8;
    padding: 0.4em 1em;
    background: #333;
    margin-bottom: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & > i {
    color: #00d4b8;
    float: right;
    margin-bottom: 1em;
    margin-right: 1em;
    cursor: pointer;
  }
}
.cjui-audio-player--menu.menu-show {
  height: 150px;
}

.cjui-audio-player .cjui-icon--music-playing_3 {
  width: 80%;
  height: 80%;
  margin: 10%;
}
.cjui-audio-player .cjui-icon-svg-container {
  display: inline;
  vertical-align: middle;
}

.cjui-audio-player .cjui-icon-svg--music-switch {
  margin-bottom: 0;
}
.cjui-audio-player .cjui-icon-svg--music-switch svg {
  display: inline-block;
  width: 24px;
  height: 24px;
}

.cjui-audio-player .el-slider__runway {
  background-color: #464646;
}
.cjui-audio-player .el-slider__bar {
  background-color: #00d4b8;
}
.cjui-audio-player .el-slider__button {
  border-color: #00d4b8;
}
</style>