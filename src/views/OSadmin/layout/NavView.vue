<template>
  	<os-nav-view class="OSadminNavView" :class="storeProfilesgetter" v-model:isCollapse="isCollapse">
		<template v-slot:leftHeader>
			<Logo v-if="showLogo" :isCollapse="isCollapse" />
		</template>

		<template v-slot:leftBody>
			<MenuList :isCollapse="isCollapse" />
		</template>

		<template v-slot:rightHeader>
			<Navbar />
		</template>

		<slot></slot>
	</os-nav-view>
</template>

<script>
import { ref, inject } from 'vue';

import OsNavView from '@/@cjui/components/pcmodel/layout/LeftRightNav/index.vue';
import Logo from "./Logo.vue";
import MenuList from "./MenuList.vue";
import Navbar from "./Navbar.vue";

export default {
  	name: 'OSadminNavView',
	components: {
		OsNavView,
		Logo,
		MenuList,
		Navbar
	},
	setup() {
		const showLogo = ref(true);
		const isCollapse = ref(false);

		const storeProfilesgetter = inject('storeProfilesgetter');

		return {
			showLogo,
			isCollapse,
			storeProfilesgetter
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../css/_variable.scss';

// color
.OSadminNavView {
	:deep(.left) {
  		background-color: $osadminNavLeftBgcolor;
	} 
	:deep(.right) {
  		background-color: $osadminNavRightBgcolor;
	}
	:deep(.right-header) {
		color: $osadminNavRightHcolor;
		background-color: $osadminNavRightHBgcolor;
	}
}
.OSadminNavView.osa-day {
	:deep(.right-header) {
		color: #333;
  		background-color: #fff;
	}
}
.OSadminNavView.osa-night {
	:deep(.right),
	:deep(.right-body) {
        background: #585858;
    }
}
</style>
 