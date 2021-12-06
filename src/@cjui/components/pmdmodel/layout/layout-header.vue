<template>
	<div class="CjuiPMDlayoutHeader" 
		:class="[
			headerShow ? 'is-show' : '',
			transition ? 'is-transition' : '',
		]"
		@scroll="scrollEvent"
		>

    	<header v-if="headerShow" class="header">
			<span class="header-left">
				<slot name="headerLeft">
      				<i v-if="leftIconShow" :class="leftIcon" @click="leftEvent"></i>
				</slot>
			</span>
			<span class="header-center">
				<slot name="header">
					{{ title }}
				</slot>
			</span>
			<span class="header-right">
				<slot name="headerRight">
      				<i v-if="rightIconShow" :class="rightIcon" @click="rightEvent"></i>
				</slot>
			</span>
		</header>
		
		<div class="body">
			<slot></slot>
		</div>
	</div>
</template>     

<script>
export default {
	name: "CjuiPMDlayoutHeader",
	props: {
        headerShow: {
			type: Boolean,
			default: true
        },
		title: {
			type: String,
			default: 'Header'
		},
		leftIconShow: {
			type: Boolean,
			default: true
		},
		leftIcon: {
			type: String,
			default: 'el-icon-arrow-left'
		},
		rightIconShow: {
			type: Boolean,
			default: true
		},
		rightIcon: {
			type: String,
			default: 'el-icon-setting'
		}
	},
  	data() {
  	  	return {
			scrollH: 0,
			transition: false,
  	  	};
	},
	methods: {
    	scrollEvent(el) {
    	  	this.scrollH = el.target.scrollTop;
    	  	if (this.scrollH > 0) {
    	  	  	this.transition = true;
    	  	} else {
    	  	  	this.transition = false;
    	  	}
    	},
		leftEvent() {
		  	this.$emit('leftEvent');
		},
		rightEvent() {
			this.$emit('rightEvent');
		}
	}
};
</script>

<style lang="scss">
// 分辨率适配，切换rem与px，默认采用 1rem = 16px 方案，可改变计算函数适配项目
@function fontSizeRem($sizeValue: 16) {
  	// @return $sizeValue * 1px;
  	@return $sizeValue * 0.0625rem;
}

// color
.CjuiPMDlayoutHeader {
	--header-color: #999;
	--header-background: #111;
	--header-transition-color: #555;
	--header-transition-background: #f9f9f9;
}

.CjuiPMDlayoutHeader {
	.header {
		color: var(--header-color);
  		background: var(--header-background);
	}
}
.CjuiPMDlayoutHeader.is-transition {
	.header {
		color: var(--header-transition-color);
		background:var(--header-transition-background);
		box-shadow: 0 0 4px 2px rgba(0,0,0,0.1);
	}
}

// layout
.CjuiPMDlayoutHeader {
  	width: 100%;
  	height: 100%;
  	overflow: auto;
	position: relative;
	
	.header {
  		width: 100%;
  		height: fontSizeRem(44);
  		padding: 0;
  		font-family: lato, Arial, sans-serif;
  		transform: translateY(0%);
  		transition: all 0.5s;
  		display: flex;
  		align-items: center;
  		position: fixed;
  		top: 0;
  		left: 0;
  		z-index: 1000;
	}
	.header-left {
	  	padding-left: 15px;
	  	flex: 2;
	  	font-size: fontSizeRem(14);
	}
	.header-center {
		padding: 0 15px;
	  	text-align: center;
	  	flex: 4;
	}
	.header-right {
	  	flex: 2;
	  	padding-right: 15px;
	  	text-align: right;
	  	font-size: fontSizeRem(14);
	}
	.header-left i,
	.header-right i {
		cursor: pointer;
	  	font-size: fontSizeRem(20);
	}

	.body {
		width: 100%;
	}
}
.CjuiPMDlayoutHeader.is-show {
	padding-top: fontSizeRem(44);
}
</style>  
