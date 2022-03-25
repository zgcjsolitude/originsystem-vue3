<template>
	<PmdmodelHeader class="TextCollection" title="文集编辑器" @leftEvent="$router.go(-1)" @rightEvent="rightEvent">
		<router-view v-slot="{ Component }">
			<transition enter-active-class="animate__animated animate__fadeIn">
			    <keep-alive :include="keepList" :exclude="noKeepList" :max="10">
		  		  	<component :is="Component" />
			    </keep-alive>
			</transition>
		</router-view>
	</PmdmodelHeader>
</template>

<script setup>
import { ref, onMounted, computed, provide } from 'vue';
import { useStore } from "vuex";

import PmdmodelHeader from '@/@cjui/components/pmdmodel/layout/layout-header.vue';

const store = useStore();

const userId = computed(() => store.state.userId);
const userName = computed(() => store.state.userName);
const userPassword = computed(() => store.state.userPassword);
const userAuthority = computed(() => store.state.userAuthority);
const storeProfilesgetter = computed(() => store.getters['OsAdmin/storeProfilesgetter']);
const module = ref('user');

provide('userId', userId);
provide('userName', userName);
provide('userPassword', userPassword);
provide('userAuthority', userAuthority);
provide('storeProfilesgetter', storeProfilesgetter);
provide('module', module);

const keepList = ref(['TextCollectionIndex']);
const noKeepList = ref([]);

function rightEvent() {
    
}
</script>

<style lang="scss" scoped>
.CjuiPMDlayoutHeader {
	--header-color: #999;
	--header-background: linear-gradient(45deg, #121317, #323B42);
	--header-transition-color: #ccc;
	--header-transition-background: rgba(255, 255, 255, 0.3);
}

.TextCollection {
    @import './css/pmd-style/element-ui/_el-layout.scss';
    @import './css/pmd-style/element-ui/_el-theme.scss';
} 

.TextCollection {
    height: 100%;
    background: linear-gradient(33deg, #121317, #323b42);
    overflow: auto;
}
</style>