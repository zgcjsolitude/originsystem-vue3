<template>
	<NavView :topNavList="topNavList" :leftNavList="leftNavList" :rightNavList="rightNavList">
    	
	</NavView>
</template>

<script>
import { watch } from 'vue';
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router'
import NavView from "./NavView.vue";
import { CjuiStyleRouter } from '@/router/WebDevelopGuide/CjuiStyleRouter';
import { CjuiCompRouter } from '@/router/WebDevelopGuide/CjuiCompRouter';
import { navListOpt } from './js/navList';
import { cjuiStyleList } from './pages/CjuiStyle/js/CjuiStyleData';

export default {
  	name: 'WebDevelopGuideIndex',
	components:{
		NavView,
	},
    setup() {
        const topNavList = navListOpt;

		const route = useRoute();
		let leftNavList = ref([]);
		let rightNavList = ref([]);
		watch(() => route.path, (newVal) => {
			if (newVal.includes('/CjuiComponent/')) {
				leftNavList.value = CjuiCompRouter;
				rightNavList.value = [];

			} else if (newVal.includes('/CjuiStyle/')) {
				leftNavList.value = CjuiStyleRouter;

				let result = cjuiStyleList.find(el => newVal.includes(el.routerPath));
				if (result?.list) {
					rightNavList.value = result.list;
				} else {
					rightNavList.value = [];
				}
			}
		}, { immediate: true });

        return {
            topNavList,
			leftNavList,
			rightNavList
        }
    },
}
</script>

<style lang="scss" scoped>
@import './css/element-ui/index.scss';

@include ElbuttonDazzleLight;
</style>