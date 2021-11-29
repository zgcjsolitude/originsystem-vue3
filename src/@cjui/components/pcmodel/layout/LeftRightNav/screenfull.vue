<template>
  	<div class="screenfull">
  	  	<!-- <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" /> -->
  	  	<i class="el-icon-full-screen"  @click="click"></i>
  	</div>
</template>

<script>
import screenfull from 'screenfull';
import { onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

export default {
  	name: 'Screenfull',
	setup() {
		const isFullscreen = ref(false);
		function click() {
  	  	  	if (!screenfull.enabled) {
  	  	  	  	ElMessage.warning('you browser can not work');
  	  	  	  	return false
  	  	  	}
  	  	  	screenfull.toggle();
  	  	}
  	  	function change() {
  	  	  isFullscreen.value = screenfull.isFullscreen;
  	  	}
  	  	function init() {
  	  	  	if (screenfull.enabled) {
  	  	  	  	screenfull.on('change', change);
  	  	  	}
  	  	}
  	  	function destroy() {
  	  	  	if (screenfull.enabled) {
  	  	  	  	screenfull.off('change', change);
  	  	  	}
  	  	}

		onMounted(() => {
			init();
		});
		onUnmounted(() => {
			destroy();
		});

		return {
			isFullscreen,
			click
		}
	}
}
</script>

<style scoped>
.screenfull {
	cursor: pointer;
}
.screenfull-svg {
  	display: inline-block;
  	cursor: pointer;
  	fill: #5a5e66;;
  	width: 20px;
  	height: 20px;
  	vertical-align: 10px;
}
</style>
