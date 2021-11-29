<template>
	<!-- 全屏展示器 -->
	<div>
	    <el-dialog title="全屏展示器" v-model="visible" fullscreen @close="closeEvent">
	    	<div class="box-container">
				<slot></slot>
			</div>
	    </el-dialog>
	</div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        }
    },
	methods: {
		closeEvent() {
            this.$emit('update:visible', false);
		}
	}
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog.is-fullscreen) {
	border-radius: 0;
	display: flex;
    flex-direction: column;

	.el-dialog__header {
		padding: 15px 20px;
		font-weight: 600;
	}
	.el-dialog__headerbtn {
		top: 10px;
		font-size: 24px;
	}
	.el-dialog__body {
		padding: 15px 20px;
		background: #333;
		overflow: auto;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
.box-container {
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
	background: #69d8aa;
	background-image: repeating-linear-gradient(30deg, hsla(0,0%,100%,.1), hsla(0,0%,100%,.1) 15px, transparent 0, transparent 30px);
}
</style>
