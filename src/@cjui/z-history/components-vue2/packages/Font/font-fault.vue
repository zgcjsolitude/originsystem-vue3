<template>
  <!-- 故障文字组件，getData传入值，class选择内置主题样式，外部自行设置 宽，高，行高，字体大小等 -->
  <div class="box box-item-default">
    <div class="word glitch">
      <div class="flash is-off">
        <span class="text">{{ faultFont }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CjuiFontFault",
  props: {
    data: String,
  },
  data() {
    return {
      faultFont: this.data
    };
  },
  watch: {
    data(newVal) {
      this.faultFont = newVal;
    }
  },
};
</script>

<style lang='scss' scoped>
$bgFont: "";

// 颜色主题样式
.box-item-default {
  // 默认主题
  & {
    text-shadow: -5px 2px 6px #2451fa;
    color: #ffffff;
    background: black;
  }
  .glitch .flash span:before,
  .glitch .flash span:after {
    color: #ffffff;
    background: black;
  }
  .glitch .flash span:before {
    text-shadow: 2px 0 #00f;
  }
  .glitch .flash span:after {
    text-shadow: -2px 0 #f00;
  }
}
.box-item-white {
  // 白色发光无底主题
  & {
    text-shadow: -5px 2px 6px #c6c6c6;
    background: transparent;
  }
  .glitch .flash span:before,
  .glitch .flash span:after {
    background: transparent;
  }
}

// 基础样式
.box {
  position: relative;
}
.word {
  width: 100%;
  height: 100%;
  text-align: center;
  transition: 0.4s ease;
  animation: scalesmall 0.3s 1s ease-out both;
}
.flash {
  position: absolute;
  z-index: 9;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  cursor: default;
  will-change: transform;
}
.flash span {
  display: block;
  position: relative;
  font-weight: bold;
}
.flash.is-off {
  animation: is-off 2s linear infinite !important;
}
.glitch .flash {
  transform: skewX(0deg) scaleY(1);
}
.glitch .flash span:before,
.glitch .flash span:after {
  display: block;
  content: $bgFont;
  position: absolute;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  clip: rect(0, 300px, 0, 0);
  will-change: transform;
}
.glitch .flash span:before {
  left: -2px;
  animation: c2 1s infinite linear alternate-reverse;
}
.glitch .flash span:after {
  left: 3px;
  animation: c1 2s infinite linear alternate-reverse;
}

@keyframes is-off {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56% {
    opacity: 0;
  }
  57% {
    opacity: 0;
  }
  58% {
    opacity: 1;
  }
  71% {
    transform: scaleY(1) skewX(0deg);
  }
  72% {
    transform: scaleY(3) skewX(-60deg);
  }
  73% {
    transform: scaleY(1) skewX(0deg);
  }
  80% {
    opacity: 1;
  }
  81% {
    opacity: 0;
  }
  84% {
    opacity: 0;
  }
  85% {
    opacity: 1;
  }
  91% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
    color: #fff;
  }
  92% {
    transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
    color: #008000;
  }
  93% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
    color: #fff;
  }
}
@keyframes c1 {
  0% {
    clip: rect(95px, 8888px, 66px, 0);
  }
  5% {
    clip: rect(86px, 8888px, 18px, 0);
  }
  10% {
    clip: rect(78px, 8888px, 89px, 0);
  }
  15% {
    clip: rect(90px, 8888px, 70px, 0);
  }
  20% {
    clip: rect(6px, 8888px, 65px, 0);
  }
  25% {
    clip: rect(57px, 8888px, 30px, 0);
  }
  30% {
    clip: rect(93px, 8888px, 56px, 0);
  }
  35% {
    clip: rect(38px, 8888px, 18px, 0);
  }
  40% {
    clip: rect(84px, 8888px, 69px, 0);
  }
  45% {
    clip: rect(35px, 8888px, 30px, 0);
  }
  50% {
    clip: rect(17px, 8888px, 34px, 0);
  }
  55% {
    clip: rect(51px, 8888px, 90px, 0);
  }
  60% {
    clip: rect(98px, 8888px, 47px, 0);
  }
  65% {
    clip: rect(66px, 8888px, 65px, 0);
  }
  70% {
    clip: rect(67px, 8888px, 54px, 0);
  }
  75% {
    clip: rect(35px, 8888px, 64px, 0);
  }
  80% {
    clip: rect(100px, 8888px, 32px, 0);
  }
  85% {
    clip: rect(96px, 8888px, 86px, 0);
  }
  90% {
    clip: rect(73px, 8888px, 12px, 0);
  }
  95% {
    clip: rect(42px, 8888px, 29px, 0);
  }
  100% {
    clip: rect(80px, 8888px, 27px, 0);
  }
}
@keyframes c2 {
  0% {
    clip: rect(96px, 8888px, 36px, 0);
  }
  5% {
    clip: rect(77px, 8888px, 6px, 0);
  }
  10% {
    clip: rect(9px, 8888px, 35px, 0);
  }
  15% {
    clip: rect(47px, 8888px, 64px, 0);
  }
  20% {
    clip: rect(86px, 8888px, 78px, 0);
  }
  25% {
    clip: rect(96px, 8888px, 50px, 0);
  }
  30% {
    clip: rect(42px, 8888px, 43px, 0);
  }
  35% {
    clip: rect(27px, 8888px, 59px, 0);
  }
  40% {
    clip: rect(65px, 8888px, 84px, 0);
  }
  45% {
    clip: rect(92px, 8888px, 6px, 0);
  }
  50% {
    clip: rect(70px, 8888px, 82px, 0);
  }
  55% {
    clip: rect(90px, 8888px, 86px, 0);
  }
  60% {
    clip: rect(41px, 8888px, 66px, 0);
  }
  65% {
    clip: rect(61px, 8888px, 77px, 0);
  }
  70% {
    clip: rect(77px, 8888px, 98px, 0);
  }
  75% {
    clip: rect(92px, 8888px, 30px, 0);
  }
  80% {
    clip: rect(80px, 8888px, 20px, 0);
  }
  85% {
    clip: rect(2px, 8888px, 15px, 0);
  }
  90% {
    clip: rect(76px, 8888px, 65px, 0);
  }
  95% {
    clip: rect(25px, 8888px, 61px, 0);
  }
  100% {
    clip: rect(28px, 8888px, 78px, 0);
  }
  23% {
    transform: scaleX(0.8);
  }
}
@keyframes clock-bag {
  0% {
    transform: translate(3px, 2px);
  }
  2% {
    transform: translate(1px, 2px);
  }
  4% {
    transform: translate(1px, 5px);
  }
  6% {
    transform: translate(5px, 5px);
  }
  8% {
    transform: translate(1px, 1px);
  }
  10% {
    transform: translate(3px, 4px);
  }
  12% {
    transform: translate(3px, 5px);
  }
  14% {
    transform: translate(4px, 4px);
  }
  16% {
    transform: translate(1px, 2px);
  }
  18% {
    transform: translate(5px, 2px);
  }
  20% {
    transform: translate(5px, 5px);
  }
  22% {
    transform: translate(3px, 2px);
  }
  24% {
    transform: translate(4px, 2px);
  }
  26% {
    transform: translate(5px, 5px);
  }
  28% {
    transform: translate(4px, 5px);
  }
  30% {
    transform: translate(2px, 3px);
  }
  32% {
    transform: translate(3px, 3px);
  }
  34% {
    transform: translate(2px, 5px);
  }
  36% {
    transform: translate(1px, 1px);
  }
  38% {
    transform: translate(5px, 3px);
  }
  40% {
    transform: translate(4px, 5px);
  }
  42% {
    transform: translate(4px, 1px);
  }
  44% {
    transform: translate(1px, 5px);
  }
  46% {
    transform: translate(4px, 2px);
  }
  48% {
    transform: translate(3px, 5px);
  }
  50% {
    transform: translate(3px, 3px);
  }
  52% {
    transform: translate(1px, 3px);
  }
  54% {
    transform: translate(5px, 1px);
  }
  56% {
    transform: translate(2px, 1px);
  }
  58% {
    transform: translate(4px, 2px);
  }
  60% {
    transform: translate(4px, 5px);
  }
  62% {
    transform: translate(5px, 3px);
  }
  64% {
    transform: translate(4px, 4px);
  }
  66% {
    transform: translate(2px, 1px);
  }
  68% {
    transform: translate(1px, 4px);
  }
  70% {
    transform: translate(1px, 3px);
  }
  72% {
    transform: translate(1px, 4px);
  }
  74% {
    transform: translate(1px, 5px);
  }
  76% {
    transform: translate(5px, 5px);
  }
  78% {
    transform: translate(5px, 5px);
  }
  80% {
    transform: translate(2px, 1px);
  }
  82% {
    transform: translate(1px, 3px);
  }
  84% {
    transform: translate(1px, 4px);
  }
  86% {
    transform: translate(5px, 5px);
  }
  88% {
    transform: translate(3px, 1px);
  }
  90% {
    transform: translate(5px, 5px);
  }
  92% {
    transform: translate(4px, 5px);
  }
  94% {
    transform: translate(2px, 2px);
  }
  96% {
    transform: translate(1px, 2px);
  }
  98% {
    transform: translate(2px, 1px);
  }
  100% {
    transform: translate(2px, 1px);
  }
  1% {
    transform: scaleY(1) skewX(0deg);
  }
  1.5% {
    transform: scaleY(3) skewX(-60deg);
  }
  2% {
    transform: scaleY(1) skewX(0deg);
  }
  51% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
  }
  52% {
    transform: scaleX(1.5) scaleY(0.2) skewX(80deg);
  }
  53% {
    transform: scaleX(1) scaleY(1) skewX(0deg);
  }
}
</style>
