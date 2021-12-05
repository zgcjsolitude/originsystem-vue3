<template>
	<PmdmodelHeader class="OriginWorldIndex" title="根源世界" :rightIconShow="false" @leftEvent="$router.go(-1)">
        <router-view></router-view>
	</PmdmodelHeader>
</template>

<script>
import { useStore } from "vuex";
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
    },
}
</script>

<style lang="scss" scoped>
.OriginWorldIndex {
    height: 100%;
    background: linear-gradient(33deg, #121317, #323b42);
    overflow: auto;
}
</style>