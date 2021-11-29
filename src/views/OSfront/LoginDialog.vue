<template>
	<os-login-green class="osfront-login"
		:loginLoading="loginLoading"
		@login="login"
		@visitorLogin="visitorLogin"
		@leftTopEvent="closeLoginFace">
	</os-login-green>
</template>

<script>
import OsLoginGreen from '@/@cjui/components/pcmodel/pages/Login/LoginGreen.vue';
import { useStore } from "vuex";
import { ref } from 'vue';

export default {
	name: "OSLogin",
	components: {
		OsLoginGreen
	},
	setup(props, context) {
		const store = useStore();
		function closeLoginFace() {
			context.emit('close')
		}

		const loginLoading = ref(false);
		async function login(formLogin) {
			if (loginLoading.value) return;
			loginLoading.value = true;
			let { code, data } = await store.dispatch("storeLogin", formLogin);
			if (code === 200) {
				$("form").fadeOut(500);
				$(".wrapper").addClass("form-success");
                setTimeout(() => {
					closeLoginFace();
                }, 1000);
			}
			loginLoading.value = false;
		}
		async function visitorLogin() {
			if (loginLoading.value) return;
			loginLoading.value = true;
			let { code, data } = await store.dispatch("storeVisitorLogin");
			if (code === 200) {
				$("form").fadeOut(500);
				$(".wrapper").addClass("form-success");
                setTimeout(() => {
					closeLoginFace();
                }, 1000);
			}
			loginLoading.value = false;
		}

		return {
			closeLoginFace,
			loginLoading, login, visitorLogin
		}
	}
};
</script>

<style lang="scss" scoped>
.osfront-login {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
}
</style>
