<template>
  	<el-menu mode="vertical" 
        :default-active="activeMenu"
    	:collapse="isCollapse"
    	:unique-opened="true"
    	:collapse-transition="false"
     	>
		<template v-for="(item, i) in menuList" :key="i">
        	<el-menu-item v-if="item.children.length === 0" :index="i" >
        		<i :class="item.icon"></i>
				<template #title>{{ item.label }}</template>
        	</el-menu-item>

  		  	<el-submenu v-else :index="i">
  		  	  	<template #title>
					<i :class="item.icon"></i>
					<span>{{ item.label }}</span>
				</template>

				<template v-for="(el, j) in item.children" :key="j">
					<el-menu-item :index="i + '-' + j" >
        				<i :class="el.icon"></i>
						<template #title>{{ el.label }}</template>
        			</el-menu-item>
				</template>
  		  	</el-submenu>
		</template>
    </el-menu>
</template>

<script>
import { useStore } from "vuex";
import { computed } from 'vue';

export default {
 	name: 'OSadminMenuList',
 	props: {
 	 	isCollapse: {
 	 	  	type: Boolean,
 	 	  	required: true
 	 	}
 	},
	setup() {
        const menuList = [
            { icon: 'el-icon-s-custom', label: '个人中心', children: [] },
            { icon: 'el-icon-s-custom', label: '我的工作台', children: [ { icon: 'el-icon-s-custom', label: '选项1' } ] },
        ];
		const activeMenu = '1';

        return {
            menuList,
			activeMenu
        }
	}
}
</script>

<style lang="scss" scoped>
@import '../../../_variable.scss';

// ======el-menu layout
$ElNavHeight: 48px; // 导航一级行高
$ElNavChildH: 42px; // 导航二级行高
.el-menu {
  	border: 0;
	
  	:deep(.el-menu-item),
  	:deep(.el-submenu__title) {
  	  	height: $ElNavHeight;
  	  	line-height: $ElNavHeight;
  	}
  	:deep(.el-submenu .el-menu-item) {
  	  	height: $ElNavChildH;
  	  	line-height: $ElNavChildH;
  	  	min-width: unset;
  	}
}
// color
.el-menu {
	background: #2b2f3a;

  	:deep(.el-submenu .el-menu) {
		background: #2b2f3a;
  	}
	:deep(.el-menu-item),
 	:deep(.el-menu-item i),
 	:deep(.el-submenu__title),
 	:deep(.el-submenu__title i),
 	:deep(.el-submenu .el-menu-item) {
 	  	color: #bfcbd9;
 	}
  	:deep(.el-menu-item.is-active) {
  	  	color: $cjuiItemColor;
  	}
	:deep(.el-menu-item:focus),
  	:deep(.el-menu-item:hover),
  	:deep(.el-menu-item.is-active),
  	:deep(.el-submenu__title:focus),
  	:deep(.el-submenu__title:hover) {
  	  	background-color: #263445;
  	  	color: $cjuiItemColor;
  	}
  	:deep(.el-menu-item:focus),
  	:deep(.el-menu-item:hover),
  	:deep(.el-menu-item.is-active) {
  	  	border-right: 2px solid;
  	}
  	:deep(.el-menu-item:hover i),
  	:deep(.el-submenu__title:hover i),
  	:deep(.el-menu-item.is-active i) {
  	  	color: $cjuiItemColor;
  	}
}
</style>
