<template>
      <NavView class="OSadminIndex" :class="storeProfilesgetter">
        <router-view v-slot="{ Component }">
            <keep-alive :include="keepList" :exclude="noKeepList" :max="10">
                <transition enter-active-class="animate__animated animate__fadeIn">
                    <component :is="Component" />
                </transition>
            </keep-alive>
        </router-view>
    </NavView>
</template>

<script>
import NavView from './layout/NavView.vue';
import { useStore } from "vuex";
import { onMounted, computed, provide } from 'vue';

const storeUserProvide = () => {
    const store = useStore();

    const userName = computed(() => store.state.userName);
    const userEmail = computed(() => store.state.userEmail);
    const userPassword = computed(() => store.state.userPassword);
    const userAuthority = computed(() => store.state.userAuthority);
    const storeProfilesgetter = computed(() => store.getters['OsAdmin/storeProfilesgetter']);

    return {
        userName, 
        userEmail, 
        userPassword, 
        userAuthority,
        storeProfilesgetter, 
    }
}

export default {
    name: 'OSadminIndex',
    components: {
        NavView
    },
    setup() {
        const keepList = [];
        const noKeepList = [];

        const store = useStore();

        const { userName, userEmail, userPassword, userAuthority, storeProfilesgetter } = storeUserProvide();
        provide('userName', userName);
        provide('userEmail', userEmail);
        provide('userPassword', userPassword);
        provide('userAuthority', userAuthority);
        provide('storeProfilesgetter', storeProfilesgetter);

        return {
            keepList, noKeepList,
            storeProfilesgetter,
        }
    }
}
</script>

<style lang="scss" scoped>
.OSadminIndex {
    @import './css/custom/_layout.scss';
    @import './css/element-ui/_el-layout.scss';
}
.OSadminIndex.osa-day {
    @import './css/custom/_theme-day.scss';
    @import './css/element-ui/_el-theme-day.scss';
}
.OSadminIndex.osa-night {
    @import './css/custom/_theme-night.scss';
    @import './css/element-ui/_el-theme-night.scss';
}
</style> 
