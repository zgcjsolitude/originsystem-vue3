<template>
  <div
    class="cjui-icon-node"
    :class="[theme ? 'cjui-icon-node--' + theme : '']"
  >
    <div v-for="i in themeNumber" :key="i"></div>
  </div>
</template>

<script>
export default {
  name: "CjuiIconNode",
  props: {
    theme: String,
    size: String,
    type: String,
  },
  computed: {
    themeNumber() {
      if (this.theme) {
        let arr = this.theme.split("_");
        return Number(arr[arr.length - 1]);
      } else {
        return 0;
      }
    },
  },
};
</script>

<style lang="scss">
  // 音乐播放状态动画
@keyframes cjui-icon-node-1 {
  // 变高 + 变低
  10% {
    height: 30%;
  }
  30% {
    height: 100%;
  }
  60% {
    height: 50%;
  }
  80% {
    height: 75%;
  }
  100% {
    height: 20%;
  }
}
.cjui-icon-node--music-playing_3 {
  & {
    background: #00d4b8;
    width: 32px;
    height: 32px;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 5px;
    box-sizing: border-box;
  }
  div {
    display: inline-block;
    background: white;
    width: 20%;
    height: 100%;
    animation: cjui-icon-node-1 1.3s ease infinite alternate;
  }
  div:nth-child(1) {
    height: 60%;
  }
  div:nth-child(2) {
    height: 30%;
    animation-delay: -2.4s;
  }
  div:nth-child(3) {
    height: 75%;
    animation-delay: -3.7s;
  }
}
</style>

