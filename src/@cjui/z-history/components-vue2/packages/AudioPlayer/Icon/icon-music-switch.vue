<template>
  <div class="cjui-icon-music-switch">
    <label
      :class="[
        isChecked
          ? `cjui-icon-music-switch--checked`
          : `cjui-icon-music-switch--unchecked`,
      ]"
    >
      <input type="checkbox" v-model="isChecked" />
      <svg viewBox="0 0 108 96" class="cjui-icon-music-switch--svg">
        <path
          d="M7,28 L35,28 L35,28 L59,8 L59,88 L35,68 L7,68 C4.790861,68 3,66.209139 3,64 L3,32 C3,29.790861 4.790861,28 7,28 Z"
        />
        <path
          d="M79,62 C83,57.3333333 85,52.6666667 85,48 C85,43.3333333 83,38.6666667 79,34 L49,3"
        />
        <path
          d="M95,69 C101.666667,61.6666667 105,54.3333333 105,47 C105,39.6666667 101.666667,32.3333333 95,25 L75.5,6 L49,33"
        />
      </svg>
    </label>
  </div>
</template>

<script>
export default {
  name: "CjuiIconMusicSwitch",
  data() {
    return {
      isChecked: {
        type: Boolean,
        default: true,
      },
    };
  },
};
</script>

<style lang="scss">
// music-switch style
// -------------------------
.cjui-icon-music-switch {
  display: inline-block;

  input {
    display: none;
  }
}
.cjui-icon-music-switch {
  label {
    position: relative;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
}
.cjui-icon-music-switch--checked {
  --pathone: cjuiIconMusicswitchShape-r;
  --pathtwo: cjuiIconMusicswitchSmall-r;
  --paththree: cjuiIconMusicswitchLarge-r;
}
.cjui-icon-music-switch--unchecked {
  --pathone: cjuiIconMusicswitchShape;
  --pathtwo: cjuiIconMusicswitchSmall;
  --paththree: cjuiIconMusicswitchLarge;
}
.cjui-icon-music-switch--svg {
  & {
    width: 32px;
    height: 32px;
    fill: none;
    stroke: #00d4b8;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 6px;
  }
  path {
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }
  path:nth-child(2) {
    stroke-dashoffset: 1px;
  }
  path:nth-child(3) {
    stroke-dashoffset: 1px;
  }
  path:nth-child(1) {
    animation-name: var(--pathone);
  }
  path:nth-child(2) {
    animation-name: var(--pathtwo);
  }
  path:nth-child(3) {
    animation-name: var(--paththree);
  }
}
@keyframes cjuiIconMusicswitchSmall {
  0%,
  30% {
    stroke-dasharray: 0 0 30px 64px;
  }
  40% {
    stroke-dashoffset: 16px;
  }
  80%,
  100% {
    stroke-dashoffset: 1px;
  }
  70% {
    stroke-dasharray: 0 43px 30px 64px;
  }
  100% {
    stroke-dasharray: 0 39px 30px 64px;
  }
}
@keyframes cjuiIconMusicswitchSmall-r {
  0% {
    stroke-dasharray: 0 39px 30px 64px;
  }
  0%,
  40% {
    stroke-dashoffset: 1px;
  }
  70% {
    stroke-dashoffset: 16px;
  }
  70%,
  100% {
    stroke-dasharray: 0 0 30px 64px;
  }
}
@keyframes cjuiIconMusicswitchLarge {
  0%,
  30% {
    stroke-dasharray: 0 0 50px 84px;
  }
  40% {
    stroke-dashoffset: 16px;
  }
  80%,
  100% {
    stroke-dashoffset: 1px;
  }
  70% {
    stroke-dasharray: 0 82px 32px 84px;
  }
  100% {
    stroke-dasharray: 0 78px 32px 84px;
  }
}
@keyframes cjuiIconMusicswitchLarge-r {
  0% {
    stroke-dasharray: 0 78px 32px 84px;
  }
  0%,
  40% {
    stroke-dashoffset: 1px;
  }
  70% {
    stroke-dashoffset: 16px;
  }
  70%,
  100% {
    stroke-dasharray: 0 0 50px 84px;
  }
}
@keyframes cjuiIconMusicswitchShape {
  0% {
    stroke-dasharray: 60px 0 184px;
    stroke-dashoffset: 0;
  }
  70% {
    stroke-dasharray: 63px 51px 184px;
    stroke-dashoffset: 21px;
  }
  100% {
    stroke-dasharray: 59px 47px 184px;
    stroke-dashoffset: 17px;
  }
}
@keyframes cjuiIconMusicswitchShape-r {
  0% {
    stroke-dasharray: 59px 47px 184px;
    stroke-dashoffset: 17px;
  }
  100% {
    stroke-dasharray: 60px 0 184px;
    stroke-dashoffset: 0;
  }
}
</style>