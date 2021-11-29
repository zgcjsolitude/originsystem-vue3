<template>
	<div class="CjuiPcPageHeader">
        <header class="header">
            <slot name="leftIcon">
                <i v-if="leftIconShow" :class="leftIcon" @click="leftEvent"></i>
            </slot>
            <slot name="title">
                <span>{{ title }}</span>
            </slot>
            <slot name="rightIcon">
                <i v-if="rightIconShow" :class="rightIcon" @click="rightEvent"></i>
            </slot>
        </header>

        <main class="body">
            <slot></slot>
        </main>

        <div v-if="footerShow" class="footer">
            <slot name="footer">
                {{ footerText }}
            </slot>
        </div>
    </div>
</template> 

<script>
export default {
    name: "CjuiPcmodelPageHeader",
    props: {
        title: {
            type: String,
            default: '标题'
        },
        leftIcon: {
            type: String,
            default: 'el-icon-menu'
        },
        leftIconShow: {
            type: Boolean,
            default: true
        },
        rightIcon: {
            type: String,
            default: 'el-icon-close'
        },
        rightIconShow: {
            type: Boolean,
            default: true
        },
        footerText: {
            type: String,
            default: '底部文字'
        },
        footerShow: {
            type: Boolean,
            default: true
        },
    },
    setup(props, context) {
        function leftEvent() {
            context.emit('leftEvent');
        }

        function rightEvent() {
            context.emit('rightEvent');
        }

        return {
            leftEvent, rightEvent
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/@cjui/components/_variable.scss';

.CjuiPcPageHeader {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
    display: flex;
    flex-direction: column;
}
.header {
    background: $cjuiItemColor;
    font-size: 16px;
    color: #fff;
    padding: 10px 20px;
    position: relative;

    & > i {
        font-size: 24px;
        vertical-align: middle;
    }
    & > img {
        width: 24px;
        height: 24px;
        vertical-align: middle;
    }
    & > span {
        margin-left: 0.5em;
        vertical-align: middle;
    }
    & > i:last-child {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
}
.body {
    width: 100%;
    flex: 1;
    overflow: auto;
    background-color: #f9f9f9;
    position: relative;
}
.footer {
    background: $cjuiItemColor;
    width: 100%;
    color: #fff;
    font-size: 14px;
    padding: 8px 22px;
}
</style>

