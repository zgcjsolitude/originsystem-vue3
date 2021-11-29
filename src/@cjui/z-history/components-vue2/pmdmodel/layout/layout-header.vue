<template>
	<div class="CjuiPMDlayoutHeader" 
		:class="[
			headerFixed ? 'is-fixed' : '',
			headerPadding ? 'is-padding': '',
			headerFixed && transition ? 'is-fixed-transition' : '',
		]"
		@scroll="scrollEvent">
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
		headerFixed: {
			type: Boolean,
			default: true
		},
		headerPadding: {
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
    	  	if (this.scrollH > 0 && this.headerFixed) {
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
// 分辨率适配，切换rem与px，采用 1rem = 100px 方案
@function fontSizeRem100($sizeValue: 16) {
  	// @return $sizeValue * 1px;
  	@return $sizeValue / 100 * 1rem;
}

// color
.CjuiPMDlayoutHeader {
	.header {
		color: #f9f9f9;
  		background: #000;
	}
}
.CjuiPMDlayoutHeader.is-fixed-transition {
	.header {
		color: #333;
		background:#fff;
		box-shadow: 0 0 4px 2px rgba(0,0,0,0.1);
	}
}

.CjuiPMDlayoutHeader {
  	width: 100%;
  	height: 100%;
  	overflow: auto;
	position: relative;
	
	.header{
  		width: 100%;
  		height: fontSizeRem100(44);
  		padding: 0;
  		font-family: lato, Arial, sans-serif;
  		transform: translateY(0%);
  		transition: all 0.5s;
  		display: flex;
  		align-items: center;
	}
	.header-left {
	  	padding-left: 15px;
	  	flex: 2;
	  	font-size: fontSizeRem100(14);
	}
	.header-left i {
	  	font-size: fontSizeRem100(20);
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
	  	font-size: fontSizeRem100(14);
	}
	.header-right i {
	  	font-size: fontSizeRem100(20);
	}
}
.CjuiPMDlayoutHeader.is-fixed {
	.header {
  		position: fixed;
  		top: 0;
  		left: 0;
  		z-index: 1000;
	}
}
.CjuiPMDlayoutHeader.is-fixed.is-padding {
	padding-top: fontSizeRem100(44);
}
</style>  
