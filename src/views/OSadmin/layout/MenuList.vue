<template>
  	<el-menu mode="vertical" 
        :default-active="activeMenu"
    	:collapse="isCollapse"
    	:unique-opened="true"
    	:collapse-transition="false"
     	>
		<template v-for="(item, i) in menuList" :key="i">
        	<el-menu-item v-if="isShow(item) && !item?.children?.length" :index="i.toString()" @click="$router.push(item.path)">
        		<i :class="item.icon"></i>
				<template #title>{{ t(`osAdmin.${item.label}`) }}</template>
        	</el-menu-item>

  		  	<el-sub-menu v-if="isShow(item) && item?.children?.length" :index="i.toString()">
  		  	  	<template #title>
					<i :class="item.icon"></i>
					<span>{{ t(`osAdmin.${item.label}`) }}</span>
				</template>

				<template v-for="(el, j) in item.children" :key="j">
					<el-menu-item v-if="isShow(el)" :index="i + '-' + j" @click="$router.push(el.path);">
        				<i v-if="el.icon" :class="el.icon"></i>
						<template #title>{{ t(`osAdmin.${el.label}`) }}</template>
        			</el-menu-item>
				</template>
  		  	</el-sub-menu>
		</template>
    </el-menu>
</template>

<script>
import { ref, inject, computed, onMounted } from 'vue';
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

import { menuListOpt } from '../js/data.js';

export default {
 	name: 'OSadminMenuList',
 	props: {
 	 	isCollapse: {
 	 	  	type: Boolean,
 	 	  	required: true
 	 	}
 	},
	setup() {
		const menuList = menuListOpt;
		const activeMenu = '1';
		const userAuthority = inject('userAuthority');
		
		const { t } = useI18n();

		function isShow(item) {
			if (!item.authority || (item.authority && Array.isArray(userAuthority.value) && userAuthority.value.includes(item.authority))) {
				return true
			}
			return false
		}

        return {
            menuList,
			activeMenu,
			t,
			isShow
        }
	},
}
</script>

<style lang="scss" scoped>
@import '../css/_variable.scss';

// ======el-menu layout
$ElNavHeight: 48px; // 导航一级行高
$ElNavChildH: 42px; // 导航二级行高
.el-menu {
  	border: 0;
	
  	:deep(.el-menu-item),
  	:deep(.el-sub-menu__title) {
  	  	height: $ElNavHeight;
  	  	line-height: $ElNavHeight;
  	}
  	:deep(.el-sub-menu .el-menu-item) {
  	  	height: $ElNavChildH;
  	  	line-height: $ElNavChildH;
  	  	min-width: unset;
  	}
 	:deep(i.fa) {
 	  	margin-right: 8px;
 	}
}

// color
.el-menu {
	background: #2b2f3a;

  	:deep(.el-sub-menu .el-menu) {
		background: $osadminNavLeftBgcolor;
  	}
	:deep(.el-menu-item),
 	:deep(.el-menu-item i),
 	:deep(.el-sub-menu__title),
 	:deep(.el-sub-menu__title i),
 	:deep(.el-sub-menu .el-menu-item) {
 	  	color: $osadminNavLeftColor;
 	}
  	:deep(.el-menu-item.is-active) {
  	  	color: $osadminItemColor;
  	}
	:deep(.el-menu-item:focus),
  	:deep(.el-menu-item:hover),
  	:deep(.el-menu-item.is-active),
  	:deep(.el-sub-menu__title:focus),
  	:deep(.el-sub-menu__title:hover) {
  	  	background-color: $osadminNavLeftBgcolor;
  	  	color: $osadminItemColor;
  	}
  	:deep(.el-menu-item:focus),
  	:deep(.el-menu-item:hover),
  	:deep(.el-menu-item.is-active) {
  	  	border-right: 2px solid;
  	}
  	:deep(.el-menu-item:hover i),
  	:deep(.el-sub-menu__title:hover i),
  	:deep(.el-menu-item.is-active i) {
  	  	color: $osadminItemColor;
  	}
}
</style>

