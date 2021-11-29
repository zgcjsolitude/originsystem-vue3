<template>
    <div class="cjui-loading-progress">
        <slot></slot>

        <div v-show="loading" class="cjui-loading-progress--modal"
            :class="[
                modal ? 'is-modal-'+ modal : ''
            ]">
            <div class="modal-container">
                <div class="modal-box">
                    <LoadingTheme class="cjui-loading-progress-theme" v-if="theme" :theme="theme" />

                    <div class="modal-font" v-if="fontshow">
                        <p class="is-number">{{ statusNumber }} %</p>
                        <slot name="message">
                            <p v-if="message" class="is-message">{{ message }}</p>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoadingTheme from '../LoadingTheme/index.vue';
import { computed, onUnmounted, ref, toRefs, watch } from 'vue';

export default {
    name: "CjuiLoadingProgress",
    components: {
        LoadingTheme
    },
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        theme: {
            type: String,
            default: ''
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
        const { loading, status, action, speed } = toRefs(props);

        const statusNumber = ref(0);
        const timer = ref(null);
        watch(() => status.value, (newVal, oldVal) => {
            statusNumber.value = status.value;
        });
        watch(() => loading.value, (newVal, oldVal) => {
            if (newVal) {
                statusNumber.value = status.value;
                if (action.value) {
                    timer.value = setInterval(() => {
                        if (statusNumber.value <= 99) {
                            statusNumber.value += 1;
                        } else {
                            clearInterval(timer.value);
                            closeEvent();
                        }
                    }, speed.value);
                }

            }
        });
        function closeEvent() {
            context.emit('update:loading', false);
            context.emit("closeEvent");
        }

        onUnmounted(() => {
            clearInterval(timer);
        });

        return {
            statusNumber,
            closeEvent
        }
    }
};
</script>

<style lang="scss">
// loading-progress style
// -------------------------
.cjui-loading-progress,
.cjui-loading-progress-theme.cjui-loading-theme {
    --cjuiLoadingWidth: 100px;
    --cjuiLoadingHeight: 100px;
    --cjuiLoadingColor: #12f3d5;
    --cjuiLoadingModalColor: rgba(0, 0, 0, 0.8);
}
// -------------------------
.cjui-loading-progress {
    position: relative;

    .modal-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-font {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: var(--cjuiLoadingColor);
        text-align: center;
        font-size: 12px;    
        white-space: nowrap;

        p {
            margin-bottom: 0;
        }   

        .is-number {
            font-size: 14px;
            padding-left: 0.5em;
        }
        .is-message {
            padding-left: 0.2em;
        } 
    }
}
.cjui-loading-progress--modal.is-modal-full {
    background: var(--cjuiLoadingModalColor);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
}
.cjui-loading-progress--modal.is-modal-fullscreen {
    background: var(--cjuiLoadingModalColor);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3000;
}
.cjui-loading-progress--modal.is-modal-center {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3000;

    .modal-box {
        position: relative;
        background: var(--cjuiLoadingModalColor);
        padding: 15px;
        border-radius: 4px;
    }
}
</style>
