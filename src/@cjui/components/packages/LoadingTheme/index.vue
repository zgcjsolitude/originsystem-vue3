<template>
    <div class="cjui-loading-theme" 
        :class="[
            theme ? 'cjui-loading-theme--' + theme : '',
        ]">
        <span v-for="i in themeNumber" :key="i"></span>
    </div>
</template>

<script>
import { computed, toRefs } from 'vue';

export default {
    name: "CjuiLoadingTheme",
    props: {
        theme: {
            type: String,
            default: "eight-line-clock_8",
        },
    },
    setup(props) {
        const { theme } = toRefs(props);
        const themeNumber = computed(() => {
            if (theme.value) {
                let arr = theme.value.split("_");
                if (Array.isArray(arr) && arr.length > 1) {
                    return Number(arr[arr.length - 1]);
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        });

        return {
            themeNumber
        }
    }
};
</script>

<style lang="scss">
@import './z_extend.scss';
</style>
