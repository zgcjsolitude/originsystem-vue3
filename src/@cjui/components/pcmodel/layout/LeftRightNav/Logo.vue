<template>
  	<div class="sidebar-logo-container" :class="{ 'is-collapse': isCollapse }">
  	  	<router-link key="collapse" class="sidebar-logo-link" to="/index">
  	  	  	<img src="/img/OSadmin/header.png" class="sidebar-logo">
			<h1 v-if="!isCollapse" class="sidebar-title">标题</h1>
  	  	</router-link>
  	</div>
</template>

<script>
export default {
 	name: 'SidebarLogo',
 	props: {
 	 	isCollapse: {
 	 	  	type: Boolean,
 	 	  	required: true
 	 	}
 	},
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
