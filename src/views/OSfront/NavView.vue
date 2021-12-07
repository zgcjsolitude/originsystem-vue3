<template>
	<div class="OSfrontNavView">
    	<header>
      		<div class="container-xl header">
        		<nav class="navbar navbar-expand-lg navbar-dark">
          			<cjui-font-animation theme="fade-on" class="cjui-font--style">OriginSystem</cjui-font-animation>
         			<button type="button" class="navbar-toggler"
         				data-toggle="collapse"
         				data-target="#navbarSupportedContent"
         				aria-controls="navbarSupportedContent"
         				aria-expanded="false"
         				aria-label="Toggle navigation"
         				>
         				<span class="navbar-toggler-icon"></span>
         			</button>

          			<div class="collapse navbar-collapse" id="navbarSupportedContent">
            			<ul class="navbar-nav mr-auto cjui-nav-light">
							<li class="nav-item" v-for="(item, i) in menuList" :key="i"
								:class="[
									$route.path.includes(item.path) && 'is-active',
									item.children.length > 0 && 'dropdown'
								]">
								<a href="#" class="nav-link"
									:class="[
										item.children.length > 0 && 'dropdown-toggle',
									]"
                					data-toggle="dropdown"
                					role="button"
                					aria-haspopup="true"
                					aria-expanded="false"
									:data-target="`#navbarDropdown${i}`"
									@click="item.children && !item.children.length && $router.push(item.path)"
									>
									{{ t(`osFront.${item.label}`) }}
								</a>
                				<div v-if="item.children.length > 0" :id="`navbarDropdown${i}`" class="dropdown-menu animate__animated animate__fadeInUp">
                  					<a class="dropdown-item" v-for="(el, i) in item.children" :key="i" 
									  	:class="[
											$route.path.includes(el.path) && 'is-active',
										]"
									  	@click="$router.push(el.path)"
										>
									  	{{ t(`osFront.${el.label}`) }}
									</a>
								</div>
							</li>
            				<div id="lightbox"></div>
            			</ul>
            			<div class="header-login">
              				<div v-if="!isLogin" class="label-text" @click="login">
              				  	<span>{{ t('Login') }}</span>
              				  	<i class="el-icon-s-promotion" @click="LoginInterFace = true"></i>
              				</div>
              				<div v-if="isLogin" class="header-login-menu">
								<div class="dropdown header-login-menu">
								  	<span class="label-name dropdown-toggle" data-target="#navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										{{ userName }}
									</span>
								  	<div id="navbarDropdown" class="dropdown-menu dropdown-menu-lg-right animate__animated animate__fadeInUp" aria-labelledby="navbarDropdown">
								  	  	<a class="dropdown-item" @click="$router.push('/index')">首页</a>
								  	  	<a class="dropdown-item" @click="$router.push('/osadmin/index')">系统管理后台</a>
										<div class="dropdown-divider"></div>
								  	  	<a class="dropdown-item" @click="logout">退出</a>
								  	</div>
								</div>
              				</div>
              				<div class="header-login-img" v-if="isLogin">
              				  	<img :src="vuexUserHeaderImggetter" class="cjui-img-cover" alt />
              				</div>
         				</div>
         			</div>
        		</nav>
			</div>
		</header>
		<section>
			<slot></slot>
		</section>
  	</div>
</template>

<script>
import { computed, getCurrentInstance } from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

export default {
  	name: 'OSfrontNavView',
	props: {
		menuList: {
			type: Array,
			default: () => []
		}
	},
	setup(props, context) {
		const store = useStore();
		const userName = computed(() => store.state.userName);
		const isLogin = computed(() => store.state.isLogin);
		const vuexUserHeaderImggetter = computed(() => store.getters.vuexUserHeaderImggetter);

		const { t } = useI18n();
		const { ctx } = getCurrentInstance();
		function changeLang(lang) {
			if (['en', 'zh-cn'].includes(lang)) {
				ctx.$i18n.locale = lang;
			}
		}

		const router = useRouter();
		function login() {
			context.emit('login');
		}
		function logout() {
			store.dispatch('storeLogout', router);
		}

		return {
			isLogin, userName,
			vuexUserHeaderImggetter, 
			login,
			logout,
			t, changeLang,
		}
	}
}
</script>

<style lang="scss" scoped>
@import './css/_variable.scss';

$indexNavBgColor: #010101;

.OSfrontNavView {
	width: 100%;
	height: 100%;
	position: relative;
	overflow: auto;
	display: flex;
	flex-direction: column;
	
	header {
	  	background: $indexNavBgColor;
	  	font-family: fantasy;
	}
	section {
		flex: 1;
  		background: linear-gradient(33deg, #121317, #323b42);
		overflow: auto;
	}
}
.header {
	height: 100%;

	nav {
		height: 100%;
		padding: .4rem 1rem;
	}

	.dropdown-menu {
		margin: 7px 0 0;
	}
}
.header-login {
	display: flex;
	align-items: center;

	.label-text {
		height: 100%;
		font-size: 14px;
		color: #16ffe0;
		font-family: fantasy;
		cursor: pointer;
	}

	.dropdown-menu {
		margin: 15px 0 0;
	}
}
.header-login-menu {
	display: inline-block;

	.label-name {
		font-size: 14px;
		color: #f3f3f3;
		cursor: pointer;
		font-weight: 600;
	}
	.label-name:hover {
		color: lighten($color: $osfrontItemColor, $amount: 25%);
	}
}
.header-login-img {
	width: 32px;
	height: 32px;
	margin-left: 10px;
	float: right;
	border-radius: 50%;
	overflow: hidden;
}

.cjui-font--style {
  	font-size: 24px;
  	margin-right: 2em;
	color: #ccc;
	max-width: 50%;
}

// ======bootstrap style
.navbar-dark {
	.navbar-toggler {
	  	border-color: rgba(255, 255, 255, 0.4);
	  	padding: 0 0.25rem;
	}
	.navbar-nav .nav-link {
  		color: rgba(255, 255, 255, 0.9);
	}
	.navbar-collapse {
		background: #000;
    	// margin-top: 8px;
		// border-top:  1px solid #333333;
	  	z-index: 88;
	}
}
.dropdown-menu {
	background: #000;
	border-radius: 3px;
	border-top:  1px solid #333333;

	.dropdown-item {
		color: #bbbbbb;
		font-size: 14px;
		cursor: pointer;
	}
	.dropdown-item:first-child,
	.dropdown-divider + .dropdown-item {
		border-top: 0;
	}
	.dropdown-item:hover {
		color: $osfrontItemColor;
		background: #333;
	}
	.dropdown-divider {
		border-color: #333333;
	}
}

// ======cjui-navLight style
.cjui-nav-light {
  	li {
  	  	position: relative;
  	  	transition: 0.2s ease color;
  	}
  	li:before,
  	li:after {
  	  	content: "";
  	  	position: absolute;
  	  	border-radius: 50%;
  	  	transform: scale(0);
  	  	transition: 0.2s ease transform;
  	}
  	li:before {
  	  	top: 4px;
  	  	left: 10px;
  	  	width: 6px;
  	  	height: 6px;
  	}
  	#lightbox {
  	  	position: absolute;
  	  	left: 5%;
  	  	bottom: 0;
  	  	width: 30px;
  	  	height: 3px;
  	  	background-color: transparent;
  	  	border-radius: 5px;
  	  	transition: 0.2s ease left;
  	}
  	li:nth-child(3n + 1):before {
  		background-color: yellow;
  	}
  	li:nth-child(3n + 1):after {
  		background-color: red;
  	}
  	li:nth-child(3n + 2):before {
  		background-color: #00e2ff;
  	}
  	li:nth-child(3n + 2):after {
  		background-color: #89ff00;
  	}
  	li:nth-child(3n + 3):before {
  		background-color: purple;
  	}
  	li:nth-child(3n + 3):after {
  		background-color: palevioletred;
  	}
  	li:hover:before,
  	li:hover:after {
  		transform: scale(1);
  	}
  	li:nth-child(3n + 1):hover ~ #lightbox {
  		background: linear-gradient(130deg, yellow, red);
  	}
  	li:nth-child(3n + 2):hover ~ #lightbox {
  		background: linear-gradient(130deg, #00e2ff, #89ff00);
  	}
  	li:nth-child(3n + 3):hover ~ #lightbox {
  	  	background: linear-gradient(130deg, purple, palevioletred);
  	}
  	// 需要自行设置的项
  	li:nth-child(1):hover ~ #lightbox {
  	  	left: 200px;
  	}
  	li:nth-child(2):hover ~ #lightbox {
  	  	left: 260px;
  	}
  	li:nth-child(3):hover ~ #lightbox {
  	  	left: 350px;
  	}
  	li:nth-child(4):hover ~ #lightbox {
  	  	left: 460px;
  	}
  	li:nth-child(5):hover ~ #lightbox {
  	  	left: 540px;
  	}
}
@media only screen and (max-width: 768px) {
  	.cjui-font_style {
  	  	max-width: 200px;
  	  	overflow: hidden;
  	}
  	.CJUI-navLight {
  	  	li:before,
  	  	li:after,
  	  	#lightbox {
  	  	  	display: none;
  	  	}
  	}
}
</style>
