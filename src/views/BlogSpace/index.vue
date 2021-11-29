<template>
	<NavViews :title="navMsg.title" :nav-list="navList" @titleEvent="$router.push('/index')">
    	<router-view></router-view>
	</NavViews>
</template>

<script>
import NavViews from "./NavView.vue";
import { navListOpt } from './js/data.js';

export default {
  	name: 'BlogSpaceIndex',
	components:{
		NavViews,
	},
  	data() {
    	return {
            navMsg: {
                title: 'OS-BlogSpace',
			},
			navList: navListOpt
    	};
	},
}
</script>
