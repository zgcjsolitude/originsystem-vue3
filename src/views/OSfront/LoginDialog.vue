<template>
	<os-login-green class="osfront-login" @leftTopEvent="closeLoginFace" @rightTopEvent="toggleRegister">
		<template #form>
    		<transition mode="out-in" enter-active-class="animate__animated animate__fadeInRightBig" leave-active-class="animate__animated animate__fadeOutLeftBig">
				<div v-if="actionType === 'register'">
        		  	<h1>Register</h1>
        		  	<form class="form" @submit.prevent="noSubmit">
        		  	  	<input type="text" v-model.trim="formModel.name" placeholder="Username" />
        		  	  	<input type="password" v-model.trim="formModel.password" placeholder="Password" />
        		  	  	<input type="password" v-model.trim="formModel.confirmPassword" placeholder="confirmPassword" />
        		  	  	<input type="password" v-model.trim="formModel.license" placeholder="License" />
        		  	  	<button @click="register">Register</button>
        		  	</form>
				</div>

				<div v-else>
        		  	<h1>Welcome</h1>
        		  	<form class="form" @submit.prevent="noSubmit">
        		  	  	<input type="text" v-model.trim="formModel.name" placeholder="Username" />
        		  	  	<input type="password" v-model.trim="formModel.password" placeholder="Password" />
        		  	  	<button @click="login">Login</button>
        		  	  	<div class="login-visitor">
        		  	  	  	<span @click="visitorLogin">Visitor >></span>
        		  	  	</div>
        		  	</form>
				</div>
    		</transition>
		</template>
	</os-login-green>
</template>

<script>
import { ref, reactive } from 'vue';
import { useStore } from "vuex";
import { ElMessage } from 'element-plus';

import OsLoginGreen from '@/@cjui/components/pcmodel/pages/Login/LoginGreen.vue';
import UserApi from '@/api/user-api';

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

		const actionType = ref('login');
		function toggleRegister() {
			actionType.value = actionType.value === 'login' ? 'register' : 'login';
		}

		function noSubmit() {
    	  	return false;
    	}

		const loginLoading = ref(false);
		const formModel = reactive({
			name: '',
			password: '',
			confirmPassword: '',
			license: '',
		});
		function clearFormModel() {
			Object.keys(formModel).forEach(key => {
				formModel[key] = '';
			});
		}
		async function register() {
			if (loginLoading.value) return;
            if (formModel.name == "") return ElMessage.warning("请输入用户名");
            if (formModel.password == "") return ElMessage.warning("请输入密码");
            if (formModel.confirmPassword == "") return ElMessage.warning("请确认密码");
            if (formModel.license == "") return ElMessage.warning("请输入注册许可码");

			loginLoading.value = true;
			const { code, message } = await UserApi.User_register({
				name: formModel.name,
				password: formModel.password,
				confirmPassword: formModel.confirmPassword,
				license: formModel.license
			});
			loginLoading.value = false;
			if (code === 200) {
				actionType.value = 'login';
                ElMessage.success('注册成功');
				clearFormModel();
			}
		}
		async function login() {
			if (loginLoading.value) return;
			loginLoading.value = true;
			const { code, data } = await store.dispatch("storeLogin", formModel);
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
			const { code, data } = await store.dispatch("storeVisitorLogin");
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
			actionType,
			register,
			toggleRegister,
			loginLoading, 
			formModel, login, visitorLogin
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

.animate__fadeOutLeftBig {
	animation-duration: 0.4s;
}

.animate__fadeInRightBig {
	animation-duration: 0.75s;
    animation-delay: -0.25s;
}

.login-visitor {
  	text-align: right;
  	width: 250px;
  	margin: 0 auto;	

  	span {
  		cursor: pointer;
  	}
}
</style>
