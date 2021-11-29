<template>
    <el-dialog class="CjuiElDialogBlank-container" :class="[theme, fullscreen && 'is-fullscreen']"
        :title="title"
        :visible.sync="visible"
        :width="width"
        :before-close="beforeClose"
        @close="close"
        @open="open"
    >
        <slot></slot>
        <template slot='footer'>
            <slot name="footer"></slot>
        </template>
    </el-dialog>
</template>

<script>
export default {
    name: 'CjuiElDialogBlank',
    props: {
        title: {
            type: String,
            default: '标题'
        },
        visible: {
            type: Boolean,
            default: false,
        },
        fullscreen: {
            type: Boolean,
            default: false,
        },
        width: {
            type: [Number, String],
            default: ''
        },
    },
    computed: {
        theme() {
            return 'is-default'
        }
    },
    methods: {
        beforeClose() {
            this.$emit('update:visible', false);
            this.$emit('beforeClose');
        },
        close() {
            this.$emit('close');
        },
        open() {
            this.$emit('open');
        }
    }
}
</script>

<style lang="scss">
// layout
.CjuiElDialogBlank-container {
    & {
        overflow: hidden;
    }
    .el-dialog {
        min-width: 320px;
        min-height: 220px;
        max-height: 65%;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
    }
    .el-dialog__header {
        height: 46px;
        padding: 12px 20px 10px;
        border-radius: 4px 4px 0 0;
    }
    .el-dialog__title {
        font-size: 16px;
    }
    .el-dialog__headerbtn {
        top: 8px;
        font-size: 22px;
    }
    .el-dialog__body {
        width: 100%;
        padding: 0;
        overflow: auto;
        flex: 1;
    }
    .el-dialog__footer {
        width: 100%;
        padding: 10px 20px 15px;
        border-radius: 0 0 4px 4px;
    }
}
.CjuiElDialogBlank-container.is-fullscreen {
    .el-dialog {
        width: 100%;
        height: 100%;
        max-height: 100%;
    }
}
</style>