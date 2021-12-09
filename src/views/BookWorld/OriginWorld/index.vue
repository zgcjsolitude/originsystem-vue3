<template>
	<PmdmodelHeader class="OriginWorldIndex" :title="title" :rightIconShow="false" @leftEvent="$router.go(-1)">
        <router-view></router-view>
	</PmdmodelHeader>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted, computed, provide } from 'vue';

import PmdmodelHeader from '@/@cjui/components/pmdmodel/layout/layout-header.vue';

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
    components: {
        PmdmodelHeader,
    },
    setup() {
        const { userName, userEmail, userPassword, userAuthority, storeProfilesgetter } = storeUserProvide();
        provide('userName', userName);
        provide('userEmail', userEmail);
        provide('userPassword', userPassword);
        provide('userAuthority', userAuthority);
        provide('storeProfilesgetter', storeProfilesgetter);

        const router = useRouter();
        const title = computed(() => {
            if (router.currentRoute.value.path.includes('/OriginPower')) {
                return '源权体系表'
            } else if (router.currentRoute.value.path.includes('/TimeLine')) {
                return '源星世界线'
            } else {
                return '根源世界'
            }
        });

        return {
            title
        }
    },
}
</script>

<style lang="scss" scoped>
.CjuiPMDlayoutHeader {
	--header-color: #999;
	--header-background: linear-gradient(45deg, #121317, #323B42);
	--header-transition-color: #ccc;
	--header-transition-background: rgba(255, 255, 255, 0.3);
}

.OriginWorldIndex {
    @import './css/element-ui/_el-layout.scss';
    @import './css/element-ui/_el-theme.scss';
} 

.OriginWorldIndex {
    height: 100%;
    background: linear-gradient(33deg, #121317, #323b42);
    overflow: auto;
}
</style>