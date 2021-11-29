<template>
	<div class="NavBar">
		<div class="right-menu">
      		<el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
      		  	<div class="el-dropdown-link avatar-wrapper">
      		  	  	<img src="/img/OSadmin/header.png" class="user-avatar" />
      		  	  	<i class="el-icon-caret-top" style="transform: rotate(180deg);" />
      		  	</div>
  				<template #dropdown>
      		  		<el-dropdown-menu>
      		  		  	<router-link to="/index">
      		  		  	  	<el-dropdown-item>首页</el-dropdown-item>
      		  		  	</router-link>
      		  		  	<el-dropdown-item divided>
      		  		  	  	<span>Log Out</span>
      		  		  	</el-dropdown-item>
      		  		</el-dropdown-menu>
				</template>
      		</el-dropdown>
		</div>
	</div>
</template>

<script>
export default {
  	name: "NavBar",
	setup() {
	}
};
</script>

<style lang="scss" scoped>
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
</style>