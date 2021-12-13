<template>
    <button class="cjui-button"
        :class="[
            type ? 'cjui-button--' + type : '',
            theme ? 'cjui-button--' + theme : '',
            size ? 'cjui-button--' + size : '',
            {
                'is-disabled': disabled,
                'is-loading': loading,
                'is-plain': plain,
                'is-round': round,
                'is-circle': circle,
                'is-long': long,
                'is-dashed': dashed,
                'is-ghost': ghost,
            }
        ]"
        :type="nativeType"
        :disabled="disabled || loading"
        :autofocus="autofocus"
        @click="handleClick"
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
import { computed, reactive } from 'vue-demi';
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
    setup(props, { emit }) {
        const { theme, delayed } = toRefs(props);

        const themeNumber = computed(() => {
            if (theme.value) {
                let arr = theme.value.split("_");
                return Number(arr[arr.length - 1]);
            }
            return 0
        });

        const timer = ref(true);
        function handleClick(evt) {
            if (delayed.value > 0) {
                if (timer.value) {
                    timer.value = false;
                    emit("click", evt);
                    setTimeout(() => {
                        timer.value = true;
                    }, delayed.value);
                }
            } else {
                emit("click", evt);
            }
         }

        return {
            themeNumber
        }
    },
}
</script>