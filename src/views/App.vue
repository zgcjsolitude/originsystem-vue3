<template>
  	<div class="app-container">
		<router-view v-slot="{ Component }">
			<keep-alive :include="keepList" :exclude="noKeepList" :max="10">
		  		<transition enter-active-class="animate__animated animate__fadeIn">
		  		  	<component :is="Component" />
		  		</transition>
			</keep-alive>
		</router-view>
  	</div>
</template>

<script>
export default {
  	name: 'App',
	setup() {
		const keepList = ['OSfrontIndex', 'OSadminIndex'];
		const noKeepList = ['BlogSpaceIndex'];

		return {
			keepList, noKeepList
		}
	}
}
</script>

<style>
.app-container {
	width: 100%;
	height: 100%;
	overflow: auto;
	position: relative;
}
</style>
