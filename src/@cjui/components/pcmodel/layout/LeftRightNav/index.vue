<template>
    <div class="CjuiLeftRightNav">
        <div class="left" :class="isCollapse && 'is-isCollapse'">
            <div class="left-header">
                <slot name="leftHeader">
                    <Logo :isCollapse="isCollapse" />
                </slot>
            </div>
            <el-scrollbar class="left-body" wrap-class="CjuiLeftRightNav-scrollbar-wrapper">
                <slot name="leftBody">
                    <NavMenu :isCollapse="isCollapse" />
                </slot>
            </el-scrollbar>
        </div>
        <div class="right">
            <div class="right-header">
                <div class="right-header-left" @click="changeCollapse">
                    <i v-show="isCollapse" class="el-icon-s-unfold"></i>
                    <i v-show="!isCollapse" class="el-icon-s-fold"></i>
                </div>
                <div class="right-header-right">
                    <search v-if="searchShow" id="header-search" class="is-item" />
                    <screenfull v-if="screenfullShow" id="screenfull" class="is-item hover-effect" />
                </div>
                <slot name="rightHeader">
                    <Navbar />
                </slot>
            </div>
            <div class="right-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import Search from "./HeaderSearch.vue";
import Screenfull from "./screenfull.vue";
import Logo from "./Logo.vue";
import NavMenu from "./NavMenu.vue";
import Navbar from "./Navbar.vue";
import { reactive, ref, toRefs } from 'vue';

export default {
    name: 'CjuiLeftRightNav',
    components: {
        Logo,
        NavMenu,
        Search,
        Screenfull,
        Navbar
    },
    props: {
        showLogo: {
            type: Boolean,
            default: true,
        },
        isCollapse: {
            type: Boolean,
            default: false,
        },
        searchShow: {
            type: Boolean,
            default: true,
        },
        screenfullShow: {
            type: Boolean,
            default: true,
        }
    },
    setup(props, context) {
        const { isCollapse } = toRefs(props);
        function changeCollapse() {
            context.emit('update:isCollapse', !isCollapse.value);
        }

        return {
            changeCollapse
        }
    }
}
</script>

<style lang="scss">
.CjuiLeftRightNav {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
    display: flex;
    
    .left {
        width: 220px;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: all 0.3s ease-in;
  	    background: #2b2f3a;
    }
    .left.is-isCollapse {
        width: 64px;
    }
    .left-body {
        flex: 1;
    }
    .right {
        flex: 1;
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;
    }
    .right-header {
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        position: relative;
        display: flex;
        padding: 0 15px;
    }
    .right-header-left {
        font-size: 20px;
        cursor: pointer;
    }
    .right-header-right {
        margin-left: auto;

        .is-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            vertical-align: text-bottom;
        }

        &.hover-effect {
            cursor: pointer;
            transition: background 0.3s;

            &:hover {
                background: rgba(0, 0, 0, 0.025);
            }
        }
    }
    .right-body {
        flex: 1;
        overflow: auto;
        background: #f9f9f9;
    }
}
.CjuiLeftRightNav-scrollbar-wrapper {
    overflow-x: hidden !important;
}
</style>