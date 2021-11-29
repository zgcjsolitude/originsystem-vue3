<template>
  <button
    class="cjui-button"
    @click="handleClick"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
        type ? 'cjui-button--' + type : '',
        theme ? 'cjui-button--' + theme : '',
        buttonSize ? 'cjui-button--' + buttonSize : '',
        {
          'is-disabled': buttonDisabled,
          'is-loading': loading,
          'is-plain': plain,
          'is-round': round,
          'is-circle': circle,
          'is-long': long,
          'is-dashed': dashed,
          'is-ghost': ghost,

        }
      ]"
  >
    <div v-for="i in themeNumber" :key="i"></div>
    <i class="cjui-loading-icon" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
    <span class="cjui-model-span" v-if="loading || disabled"></span>
  </button>
</template>

<script>
export default {
  name: "CjuiButton",
  props: {
    size: String,  // 按钮尺寸
    type: String,  // 按钮类型
    theme: String,  // 按钮主题
    plain: Boolean,  // 边框按钮
    round: Boolean,  // 圆角按钮
    circle: Boolean,  // 圆形按钮
    long: Boolean,  // 100%宽度按钮
    dashed: Boolean,  // 虚线边框按钮
    ghost: Boolean,  // 幽灵按钮
    disabled: Boolean,  // 按钮禁用状态
    loading: Boolean,  // 按钮加载状态
    autofocus: Boolean,  // 自动聚焦
    delayed: {  // 事件延时触发
      type: Number,
      default: 0
    },
    icon: {  // 图标
      type: String,
      default: ""
    },
    nativeType: {
      type: String,
      default: "button"
    }
  },
  data() {
    return {
      timer: true
    };
  },
  computed: {
    buttonSize() {
      return this.size;
    },
    buttonDisabled() {
      return this.disabled;
    },
    themeNumber() {
      if (this.theme) {
        let arr = this.theme.split("_");
        return Number(arr[arr.length - 1]);
      } else {
        return 0;
      }
    }
  },
  methods: {
    handleClick(evt) {
      if (this.delayed > 0) {
        if (this.timer) {
          this.timer = false;
          this.$emit("click", evt);
          setTimeout(() => {
            this.timer = true;
          }, this.delayed);
        }
      } else {
        this.$emit("click", evt);
      }
    }
  }
};
</script>