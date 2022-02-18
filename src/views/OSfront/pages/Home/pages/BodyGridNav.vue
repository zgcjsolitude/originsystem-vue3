<template>
    <GridNav>
        <template #posY3>
            <div @click="openWordExtractUrl">
                <div style="font-size:26px;">文字摘录</div>
                <div style="font-size:16px;">WordExtract</div>
            </div>
        </template>
        
        <template #posY4>
            <div @click="$router.push('/CjuiComponent/updateLog')">
                <div style="font-size:32px;">CJUI前端指南</div>
                <div style="font-size:22px;">CJUI WEB GUIDE</div>
            </div>
        </template>
        
        <template #posX4>
            <div @click="$router.push('/BookWorld/index')">
                <div style="font-size:32px;">书籍世界</div>
                <div style="font-size:22px;">BOOK WORLD</div>
            </div>
        </template>
        
        <template #posX5>
            <div @click="$router.push('/BlogSpace/index')">
                <div style="font-size:32px;">博客空间</div>
                <div style="font-size:22px;">BLOG SPACE</div>
            </div>
        </template>
    </GridNav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from "vuex";

import GridNav from '@/@cjui/components/pcmodel/layout/GridNav.vue';
import { OsBaseUrl } from '@/assets/js/data-dictionary';

export default {
    components: {
        GridNav
    },
    setup() {
		const store = useStore();
		const userName = computed(() => store.state.userName);

        function openWordExtractUrl() {
            const params = {
				userName: '逝心海',
				sign: '',
				num: 10
            }
			let url = `${OsBaseUrl}/view/pages/literary-display/` + '?';
			Object.keys(params).forEach(key => {
				url += `${key}=${params[key]}&`
			});
            window.open(url);
        }

        return {
            openWordExtractUrl
        }
    },
}
</script>