<template>
  <div
    :data-text="dataText"
    :class="[
      'cjui-font',
      theme ? `cjui-font--${theme}` : '',
      type ? `cjui-font--${type}` : '',
      direction ? `cjui-font--${direction}` : '',
      disabled && 'is-disabled'
    ]"
    @click="handleClick"
  >
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CjuiFont",

  props: {
    type: {
      type: String,
      default: "default",
    },
    theme: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dataText: {
      type: String,
      default: "",
    },
    direction: {
      type: String,
      default: "top",
    },
  },

  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit("click", event);
      }
    },
  },
};
</script>



