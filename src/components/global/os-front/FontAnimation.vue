<template>
    <!-- 文字动画效果 -->
    <cjui-font-animation 
        :dataText="dataText" 
        :theme="theme" 
        :type="type" 
        :disabled="disabled" 
        :direction="direction" 
        @click="handleClick"
        >
        <slot></slot>
    </cjui-font-animation>
</template>

<script>
import CjuiFontAnimation from '@/@cjui/components/packages/FontAnimation/index.vue';

export default {
    name: 'OSFontAnimation',
    components: {
        CjuiFontAnimation  
    },
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
        function handleClick(evt) {
            context.emit('click', evt)
        }

        return {
            handleClick
        }
    }
}
</script>

<style lang="scss">
// fade-on
@keyframes cjuiFontAnimationReveal {
    80% { letter-spacing: 0.5em; }
    100% { background-size: 300% 300%; }
}
@keyframes cjuiFontAnimationGlow {
    40% { text-shadow: 0 0 8px #fff; }
}
.cjui-font-animation {
    background: transparent;
}
.cjui-font-animation--fade-on {
    background: 50% 100%/50% 50% no-repeat radial-gradient(ellipse at bottom, #fff, transparent, transparent);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-size: 16px;
    animation: cjuiFontAnimationReveal 3000ms ease-in-out forwards 200ms, cjuiFontAnimationGlow 2500ms linear infinite 2000ms;
}
</style>