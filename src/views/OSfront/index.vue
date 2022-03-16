<template>
  	<osfront-nav-view :menuList="menuList" @login="openLoginDialog">
		<router-view v-slot="{ Component }">
			<keep-alive :include="keepList" :exclude="noKeepList" :max="10">
		  		<transition enter-active-class="animate__animated animate__fadeIn">
		  		  	<component :is="Component" />
		  		</transition>
			</keep-alive>
		</router-view>
		
    	<!-- 全局登录界面 -->
    	<transition enter-active-class="animate__animated animate__fadeInDownBig" leave-active-class="animate__animated animate__fadeOutLeftBig">
    	  	<LoginDialog v-if="LoginDialogShow" @close="closeLoginDialog" />
    	</transition>
	</osfront-nav-view>
</template>

<script>
import OsfrontNavView from './NavView.vue';
import LoginDialog from './LoginDialog.vue';
import { menuListOpt } from './js/menuList';
import { ref, onMounted, reactive } from 'vue';

export default {
  	name: 'OSfrontIndex',
	components: {
		OsfrontNavView,
		LoginDialog
	},
	setup() {
		const keepList = ['OSfrontHomeIndex'];
		const noKeepList = [];

		const menuList = menuListOpt;

		const LoginDialogShow = ref(false);
		function openLoginDialog() {
			LoginDialogShow.value = true;
		}
		function closeLoginDialog() {
			LoginDialogShow.value = false;
		}

		return {
			keepList, noKeepList,
			menuList,
			LoginDialogShow, openLoginDialog, closeLoginDialog
		}
	}
}
</script>
