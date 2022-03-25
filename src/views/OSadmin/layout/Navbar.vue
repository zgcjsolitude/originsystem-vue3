<template>
	<div class="NavBar" :class="theme">
		<div class="right-menu">
			<div v-if="$i18n.locale !== 'en'" class="right-menu-item hover-effect">
				<svg @click="changeLang('en')" t="1627913092421" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2478"><path d="M853.333333 170.666667v682.666666H170.666667V170.666667h682.666666z m-384 170.666666H298.666667v341.333334h170.666666v-85.333334H384v-42.666666h85.333333v-85.333334H383.957333v-42.666666H469.333333V341.333333z m256 128h-213.333333v213.333334h85.333333v-128h42.666667v128h85.333333v-213.333334z" p-id="2479"></path></svg>
			</div>
			<div v-if="$i18n.locale !== 'zh-cn'" class="right-menu-item hover-effect">
				<svg @click="changeLang('zh-cn')" t="1627914376225" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3091"><path d="M853.333333 170.666667v682.666666H170.666667V170.666667h682.666666z m-298.666666 170.666666h-85.333334v42.666667H298.666667v213.333333h170.666666v85.333334h85.333334v-85.333334h170.666666V384h-170.666666V341.333333z m-85.333334 128v42.666667H384v-42.666667h85.333333z m170.666667 0v42.666667h-85.333333v-42.666667h85.333333z" p-id="3092"></path></svg>
			</div>
			
      		<el-tooltip content="情景模式切换" effect="dark" placement="bottom">
      		  	<div class="right-menu-item hover-effect">
					<el-icon v-if="storeProfiles == 'day'" @click="changeProfiles('night')"><PictureFilled /></el-icon>
					<el-icon v-else @click="changeProfiles('day')"><PictureRounded /></el-icon>
      		  	</div>
      		</el-tooltip>

      		<el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
      		  	<div class="el-dropdown-link avatar-wrapper">
      		  	  	<img v-lazy="vuexUserHeaderImggetter" class="user-avatar" />
      		  	  	<i class="el-icon-caret-top" style="transform: rotate(180deg);" />
      		  	</div>
  				<template #dropdown>
      		  		<el-dropdown-menu>
      		  		  	<router-link to="/index">
      		  		  	  	<el-dropdown-item>首页</el-dropdown-item>
      		  		  	</router-link>
      		  		  	<router-link to="/osadmin">
      		  		  	  	<el-dropdown-item>个人主页</el-dropdown-item>
      		  		  	</router-link>
      		  		  	<router-link to="/osadmin/usermsgset">
      		  		  	  	<el-dropdown-item>资料修改</el-dropdown-item>
      		  		  	</router-link>
      		  		  	<router-link to="/osadmin/system_msg">
      		  		  	  	<el-dropdown-item>系统信息</el-dropdown-item>
      		  		  	</router-link>
      		  		  	<el-dropdown-item divided @click="logout">
      		  		  	  	<span>Log Out</span>
      		  		  	</el-dropdown-item>
      		  		</el-dropdown-menu>
				</template>
      		</el-dropdown>
		</div>
	</div>
</template>

<script>
import { useStore } from "vuex";
import { computed, getCurrentInstance } from 'vue';
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { PictureRounded, PictureFilled } from '@element-plus/icons-vue';

export default {
  	name: "NavBar",
	components: {
		PictureRounded, PictureFilled
	},
	setup() {
		const store = useStore();
        const theme = computed(() => store.getters['OsAdmin/vuexProfilesgetter']);
		const storeProfiles = computed(() => store.state.OsAdmin.storeProfiles);
		const vuexUserHeaderImggetter = computed(() => store.getters.vuexUserHeaderImggetter);
		function changeProfiles(value) {
    		store.commit("OsAdmin/vuexProfilesChange", value);
    	}

		const { t } = useI18n();
		const { ctx } = getCurrentInstance();
		function changeLang(lang) {
			if (['en', 'zh-cn'].includes(lang)) {
				ctx.$i18n.locale = lang;
				localStorage.setItem('OSlocalLang', lang);
			}
		}

		const router = useRouter();
		function logout() {
    	  	store.dispatch('storeLogout', router);
    	}

		return {
			theme,
			storeProfiles,
			vuexUserHeaderImggetter,
			changeProfiles,
			logout,
			t, changeLang
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../css/_variable.scss';

.NavBar {
  height: 50px;
  overflow: hidden;
  position: relative;
}

.right-menu {
  	float: right;
  	height: 100%;
  	line-height: 50px;

  	img {
  	  	vertical-align: initial;
  	}

  	&:focus {
  	  	outline: none;
  	}

  	.right-menu-item {
  	  	display: inline-block;
  	  	padding: 0 8px;
  	  	height: 100%;
  	  	font-size: 18px;
  	  	vertical-align: text-bottom;

  	  	&.hover-effect {
  	  	  	cursor: pointer;
  	  	  	transition: background 0.3s;
			padding-top: 1px;

  	  	  	&:hover {
  	  	  	  	background: rgba(0, 0, 0, 0.025);
  	  	  	}
  	  	}
		
		i {
			font-size: 20px
		}

		svg {
			width: 24px;
			height: 24px;
			margin-bottom: 6px;
		}

		.el-icon {
			vertical-align: -0.25em;
		}
  	}

  	.avatar-container {
  	  	margin-right: 30px;

  	  	.avatar-wrapper {
  	  	  	margin-top: 5px;
  	  	  	position: relative;

  	  	  	.user-avatar {
  	  	  	 	cursor: pointer;
  	  	  	 	width: 40px;
  	  	  	 	height: 40px;
  	  	  	 	border-radius: 10px;
  	  	  	}

  	  	  	i {
  	  	  	 	cursor: pointer;
  	  	  	 	font-size: 12px;
  	  	  	}
  	  	}
  	}
}

.NavBar.osa-day {
	.right-menu .right-menu-item svg {
		fill: $osadminNavRightHBgcolor;
	}
}
.NavBar.osa-night {
	.right-menu .right-menu-item svg {
		fill: $osadminNavRightHcolor;
	}
}
</style>