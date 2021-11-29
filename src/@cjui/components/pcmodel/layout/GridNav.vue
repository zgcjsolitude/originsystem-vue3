<template>
    <!-- 宫格菜单 -->
    <div class="gridnav-container">
        <div v-if="!navshow" class="gridnav-switch" @click="open">
            <slot name="explore">+ explore</slot>
        </div>
        
        <div class="gridnav-box" :class="navshowClass">
            <div v-if="navshow" class="gridnav-width-1 gridnav-height-1"></div>
            <div v-if="navshow" class="gridnav-width-2 gridnav-height-1">
                <slot name="close">
                    <span @click="close">- close</span>
                </slot>
            </div>
            <div v-if="navshow" class="gridnav-width-4 gridnav-height-2">
		  		<transition enter-active-class="animate__animated animate__fadeInUpBig" @before-enter="beforeEnter">
                    <div v-if="navshowfont" class="gridnav-item gridnav-posY2">
                        <slot name="posY2">
		  		          	<div style="font-size: 20px;" @click="$router.push('/');close()">Home</div>
                        </slot>
                    </div>
		  		</transition>
            </div>
            <div v-if="navshow" class="gridnav-width-8 gridnav-height-4">
		  		<transition enter-active-class="animate__animated animate__fadeInUpBig" @before-enter="beforeEnter">
                    <div v-if="navshowfont" class="gridnav-item gridnav-posY3" animate-delay="0.4s" animate-duration="1s">
                        <slot name="posY3">
		  		          	<div v-if="showExample">
                                <div style="font-size:26px;">菜单栏 Y3</div>
                                <div style="font-size:16px;">Menu Three Y</div>
                            </div>
                        </slot>
                    </div>
		  		</transition>
            </div>
            <div v-if="navshow" class="gridnav-width-16 gridnav-height-8">
		  		<transition enter-active-class="animate__animated animate__fadeInUpBig" @before-enter="beforeEnter">
                    <div v-if="navshowfont" class="gridnav-item gridnav-posY4" animate-delay="0.6s" animate-duration="1.2s">
                        <slot name="posY4">
		  		          	<div v-if="showExample">
                                <div style="font-size:32px;">菜单栏 Y4</div>
                                <div style="font-size:22px;">Menu Four Y</div>
                            </div>
                        </slot>
                    </div>
		  		</transition>
            </div>

            <div v-if="navshow" class="gridnav-width-1 gridnav-height-1"></div>
            <div v-if="navshow" class="gridnav-width-2 gridnav-height-2"></div>
            <div v-if="navshow" class="gridnav-width-4 gridnav-height-4">
		  		<transition enter-active-class="animate__animated animate__fadeInUpBig" @before-enter="beforeEnter">
                    <div v-if="navshowfont" class="gridnav-item gridnav-posX3" animate-delay="0.5s" animate-duration="1s">
                        <slot name="posX3">
		  		          	<div v-if="showExample">
                                <div style="font-size:22px;">菜单栏 X3</div>
                                <div style="font-size:12px;">Menu Three X</div>
                            </div>
                        </slot>
                    </div>
		  		</transition>
            </div>
            <div v-if="navshow" class="gridnav-width-8 gridnav-height-8">
		  		<transition enter-active-class="animate__animated animate__fadeInUpBig" @before-enter="beforeEnter">
                    <div v-if="navshowfont" class="gridnav-item gridnav-posX4" animate-delay="0.7s" animate-duration="1s">
                        <slot name="posX4">
		  		          	<div v-if="showExample">
                                <div style="font-size:28px;">菜单栏 X4</div>
                                <div style="font-size:18px;">Menu Four X</div>
                            </div>
                        </slot>
                    </div>
		  		</transition>
            </div>
            <div v-if="navshow" class="gridnav-width-16 gridnav-height-16">
		  		<transition enter-active-class="animate__animated animate__fadeInUpBig" @before-enter="beforeEnter">
                    <div v-if="navshowfont" class="gridnav-item gridnav-posX5" animate-delay="1s" animate-duration="1.2s">
                        <slot name="posX5">
		  		          	<div v-if="showExample">
                                <div style="font-size:36px;">菜单栏 X5</div>
                                <div style="font-size:24px;">Menu Five X</div>
                            </div>
                        </slot>
                    </div>
		  		</transition>
            </div>
		</div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'CjuiGridNav',
    props: {
        showExample: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const navshow = ref(false);
        const navshowClass = ref('gridnav-nav-start');
        const navshowfont = ref(false);
        function open() {
            if (navshow.value) {
                return
            }
            navshow.value = true;
            navshowClass.value = 'gridnav-nav-start';
            setTimeout(() => {
                navshowClass.value = 'gridnav-nav-start gridnav-nav-end';
                navshowfont.value = true;
                setTimeout(() => {
                    navshowClass.value = 'gridnav-nav-start gridnav-nav-end gridnav-nav-zindex';
                }, 1600);
            }, 100);
        }
        function close() {
            if (!navshow.value) {
                return
            }
            navshowClass.value = 'gridnav-nav-start gridnav-nav-leave';
            setTimeout(() => {
                navshow.value = false;
                navshowfont.value = false;
            }, 1600);
        }
        function beforeEnter(el) {
            const delay = el.getAttribute("animate-delay");
            const duration = el.getAttribute("animate-duration");
            const cssObj = {
                "animation-delay": delay,
                "-webkit-animation-delay": delay,
                "animation-duration": duration,
                "-webkit-animation-duration": duration,
                visibility: "visible"
            };
            el.style.cssText = getCssText(cssObj);
        }
        function getCssText(obj) {
            let text = [];
            for (let o in obj) {
                text.push(o + ":" + obj[o]);
            }
            return text.join(";");
        }

        return {
            navshow,
            navshowClass,
            navshowfont,
            open,
            close,
            beforeEnter,
        }
    }
}
</script>

<style lang="scss" scoped>
.gridnav-container {
    font-family: -webkit-pictograph;
}
.gridnav-switch {
    position: absolute;
    left: 2%;
    bottom: 40px;
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    z-index: 99;
}
.gridnav-box {
    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        opacity: 0;
        transition-duration: 0.16s;
        transition-property: all;
        transition-timing-function: ease-out;
    }

    .gridnav-item {
        color: #fcfdff;
        text-align: center; 
        font-family: "Times New Roman", Times, serif;
        cursor: pointer;
    }
    .gridnav-posX3 {
        color: #666;
    }
}

.gridnav-width-1 {
    width: 3.125%;
}
.gridnav-width-2 {
    width: 6.25%;
}
.gridnav-width-4 {
    width: 12.5%;
}
.gridnav-width-8 {
    width: 25%;
}
.gridnav-width-16 {
    width: 50%;
}
.gridnav-height-1 {
    height: 6.25%;
}
.gridnav-height-2 {
    height: 12.5%;
}
.gridnav-height-4 {
    height: 25%;
}
.gridnav-height-8 {
    height: 50%;
}
.gridnav-height-16 {
    height: 100%;
}

.gridnav-nav-start {
    @for $i from 1 to 6 {
        & > div:nth-of-type(#{$i}) {
            z-index: 112 - $i * 2;
            left: 0;
            bottom: 0;
            transition-delay: #{($i * 2 - 2) * 0.16}s;
        }
    }
    @for $i from 6 to 11 {
        & > div:nth-of-type(#{$i}) {
            z-index: 111 - ($i - 5) * 2;
            left: 0;
            bottom: 0;
            transition-delay: #{(($i - 5) * 2-1) * 0.16}s;
        }
    }
    & > div:nth-of-type(1) {
        background-color: #f1d3b9;
    }
    & > div:nth-of-type(2) {
        font-size: 12px;
        color: #333;
        background-color: #fcfdff;
        cursor: pointer;
    }
    & > div:nth-of-type(3) {
        background: linear-gradient(33deg, #121317, #323b42);
    }
    & > div:nth-of-type(4) {
        background: linear-gradient(33deg, #abc7ff, #c1e3ff);
    }
    & > div:nth-of-type(5) {
        background: linear-gradient(33deg, #a16bfe, #deb0df);
    }
    & > div:nth-of-type(6) {
        background-color: #df9e98;
    }
    & > div:nth-of-type(6) {
        background-color: #df9e98;
    }
    & > div:nth-of-type(7) {
        background-color: #9ed4d4;
    }
    & > div:nth-of-type(8) {
        background-color: #fcfdff;
    }
    & > div:nth-of-type(9) {
        background: linear-gradient(33deg, #6cacff, #8debff);
    }
    & > div:nth-of-type(10) {
        background: linear-gradient(33deg, #d279ee, #f8c390);
    }
}
.gridnav-nav-end {
    & > div {
        opacity: 1;
    }
    & > div:nth-of-type(1) {
        bottom: 0;
    }
    & > div:nth-of-type(2) {
        bottom: 6.25%;
    }
    & > div:nth-of-type(3) {
        bottom: 12.5%;
    }
    & > div:nth-of-type(4) {
        bottom: 25%;
    }
    & > div:nth-of-type(5) {
        bottom: 50%;
    }
    & > div:nth-of-type(6) {
        left: 0;
    }
    & > div:nth-of-type(6) {
        left: 3.125%;
    }
    & > div:nth-of-type(7) {
        left: 6.25%;
    }
    & > div:nth-of-type(8) {
        left: 12.5%;
    }
    & > div:nth-of-type(9) {
        left: 25%;
    }
    & > div:nth-of-type(10) {
        left: 50%;
    }
}
.gridnav-nav-leave {
    & > div {
        opacity: 0;
    }
    & > div:nth-of-type(1) {
        bottom: 6.25%;
    }
    & > div:nth-of-type(2) {
        bottom: 12.5%;
    }
    & > div:nth-of-type(3) {
        bottom: 25%;
    }
    & > div:nth-of-type(4) {
        bottom: 50%;
    }
    & > div:nth-of-type(5) {
        bottom: 100%;
    }
    & > div:nth-of-type(6) {
        left: 3.125%;
    }
    & > div:nth-of-type(6) {
        left: 6.25%;
    }
    & > div:nth-of-type(7) {
        left: 12.5%;
    }
    & > div:nth-of-type(8) {
        left: 25%;
    }
    & > div:nth-of-type(9) {
        left: 50%;
    }
    & > div:nth-of-type(10) {
        left: 100%;
    }
}
.gridnav-nav-zindex {
    @for $i from 1 to 6 {
        & > div:nth-of-type(#{$i}) {
            z-index: $i * 2 - 1 + 100;
        }
    }
    @for $i from 6 to 11 {
        & > div:nth-of-type(#{$i}) {
            z-index: ($i - 5) * 2 + 100;
        }
    }
}
</style>