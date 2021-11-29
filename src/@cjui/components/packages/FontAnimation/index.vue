<template>
    <!-- 建议：非全局引入，复制部分样式代码全局注册 -->
    <div class="cjui-font-animation" :data-text="dataText"
        :class="[
            theme ? `cjui-font-animation--${theme}` : '',
            type ? `cjui-font-animation--${type}` : '',
            direction ? `cjui-font-animation--${direction}` : '',
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
import { toRefs } from 'vue';

export default {
    name: "CjuiFontAnimation",
    props: {
        dataText: {
            type: String,
            default: "",
        },
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
        direction: {
            type: String,
            default: "top",
        },
    },
    emits: ['click'],
    setup(props, context) {
        const { disabled } = toRefs(props);
        function handleClick(event) {
            if (!disabled.value) {
                context.emit("click", event);
            }
        }

        return {
            handleClick
        }
    }
};
</script>

<style lang="scss">
@import './z_extend.scss';
</style>