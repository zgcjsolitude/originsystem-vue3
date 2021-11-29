<template>
  	<div class="sidebar-logo-container" :class="{ 'is-collapse': isCollapse }">
  	  	<router-link key="collapse" class="sidebar-logo-link" to="/osadmin/index">
  	  	  	<img v-if="vuexUserHeaderImggetter" v-lazy="vuexUserHeaderImggetter" class="sidebar-logo">
  	  	  	<h1 v-if="!isCollapse" class="sidebar-title">{{ userName }}</h1>
  	  	</router-link>
  	</div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from 'vue';

export default {
 	name: 'SidebarLogo',
 	props: {
 	 	isCollapse: {
 	 	  	type: Boolean,
 	 	  	required: true
 	 	}
 	},
	setup() {
		const store = useStore();
		const userName = computed(() => store.state.userName);
		const vuexUserHeaderImggetter = computed(() => store.getters.vuexUserHeaderImggetter);

		return {
			userName,
			vuexUserHeaderImggetter
		}
	}
}
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  	position: relative;
  	width: 100%;
  	height: 50px;
  	line-height: 50px;
  	padding: 0 15px;
  	background: #2b2f3a;
  	overflow: hidden;

  	& .sidebar-logo-link {
  	  	height: 100%;
  	  	width: 100%;

  	  	& .sidebar-logo {
  	  	  	width: 32px;
  	  	  	height: 32px;
  	  	  	vertical-align: middle;
  	  	  	margin-right: 12px;
  	  	  	border-radius: 100%;
  	  	}

  	  	& .sidebar-title {
  	  	  	display: inline-block;
  	  	  	margin: 0;
  	  	  	color: #fff;
  	  	  	font-weight: 600;
  	  	  	line-height: 50px;
  	  	  	font-size: 14px;
  	  	  	font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  	  	  	vertical-align: middle;
  	  	}
  	}

  	&.is-collapse {
  	  	.sidebar-logo {
  	  	  	margin-right: 0px;
  	  	}
  	}
}
</style>
