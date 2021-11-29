<template>
    <!-- Loading 载入动画 -->
    <cjui-loading-progress 
        :loading="loading" 
        :theme="theme" 
        :modal="modal" 
        :status="status" 
        :speed="speed" 
        :fontshow="fontshow"
        :action="action"
        :message="message"
        @closeEvent="closeEvent"
        >
        <slot></slot>

        <template v-slot:message>
            <slot name="message"></slot>
        </template>
    </cjui-loading-progress>
</template>

<script>
import CjuiLoadingProgress from '@/@cjui/components/packages/LoadingProgress/index.vue';

export default {
    name: 'BSLoadingProgress',
    components: {
        CjuiLoadingProgress
    },
    props: {
        loading: {
            type: Boolean,
            default: true,
        },
        theme: {
            type: String,
            default: 'ring-rotate_0'
        },
        modal: { // full fullscreen center
            type: String,
            default: ''
        },
        status: {
            type: Number,
            default: 0,
        },
        speed: {
            type: Number,
            default: 30,
        },
        fontshow: {
            type: Boolean,
            default: false,
        },
        action: {
            type: Boolean,
            default: false,
        },
        message:  {
            type: String,
            default: '',
        },
    },
    setup(props, context) {
        function closeEvent(evt) {
            context.emit('closeEvent', evt);
        }

        return {
            closeEvent
        }
    }
}
</script>

<style lang="scss" scoped>
@keyframes cjui-ring-rotate {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(180deg); }
    100% { transform: rotate(360deg); } 
}
:deep(.cjui-loading-theme--ring-rotate_0) {
    background-color: var(--cjuiLoadingColor);
    border: 3px solid var(--cjuiLoadingColor);
    border-left: 0;
    border-radius: 100%;
    animation-fill-mode: both;
    border-bottom-color: transparent;
    background: transparent !important;
    animation: cjui-ring-rotate 0.75s 0s linear infinite; 
}
</style>