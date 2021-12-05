<template>
	<PmdmodelHeader class="BookWorldIndex" title="书籍世界" :rightIconShow="false" @leftEvent="$router.go(-1)">
        <CardRolling>
            <template #front>
                <cjui-font-animation theme="fade-on" style="font-size:32px;display:block;">根源世界录</cjui-font-animation>
            </template>
            <template #back>
                <cjui-font-animation theme="fade-on" style="font-size:24px;display:block;margin-bottom:15px;">根源世界录</cjui-font-animation>
                <cjui-font-animation theme="border-full" direction="left" @click="$router.push('/BookWorld/OriginWorld/index')">进入世界</cjui-font-animation>
            </template>
        </CardRolling>
	</PmdmodelHeader>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, computed, provide } from 'vue';

import PmdmodelHeader from '@/@cjui/components/pmdmodel/layout/layout-header.vue';
import CardRolling from '@/@cjui/components/packages/Card/card-rolling.vue';

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
        CardRolling
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
.BookWorldIndex {
    height: 100%;
    background: linear-gradient(33deg, #121317, #323b42);
    overflow: auto;

    :deep(.body) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
}
:deep(.cjui-card-rolling) {
    .card-front {
        background: linear-gradient(45deg, #0C7BB3, #F2BAE8);
    }
}
</style>