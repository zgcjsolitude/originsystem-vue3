<template>
    <div class="CjuiPMDmodeladdresslist" :key="key">
        <div v-if="leftIconShow" class="list-left">
          	<i :class="leftIcon"></i>
        </div>
        <div class="list-center">
          	<p class="is-tell"><span class="is-name">{{ address.name }}</span>{{ address.tell }}</p>
          	<p class="is-address">
          	  	<span v-if="address.default" class="is-default">默认</span>
				<span>{{ address.province }} {{ address.city }} {{ address.region }} {{ address.address }}0a</span>
          	</p>
        </div>
        <div class="list-right">
        	<span @click="exitEvent">
				<slot>编辑</slot>
			</span>
        </div>
    </div>
</template>     

<script>
export default {
  	name: "CjuiPMDmodeladdresslist",
  	props: {
		address: {
		  	type: Object,
		  	default: {
			  	name: '名字',
			  	tell: '1324758637',
			  	default: true,
			  	province: '四川省',
			  	city: '成都市',
			  	region: '武侯区',
			  	address: '某某社区00栋某单元0a'
		  	}
		},
		leftIconShow: {
			type: Boolean,
			default: true
		},
		leftIcon: {
			type: String,
			default: 'el-icon-location-outline'
		},
		key: {
			type: String,
			default: 'key'
		}
  	},
  	methods: {
		exitEvent() {
			this.$emit('exitEvent', this.address);
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

$fontColor1: #000;
$fontColor2: #333;
$fontColor3: #7d7d7d;
$fontColor4: #e8e8e8;

.CjuiPMDmodeladdresslist {
  	display: flex;
  	padding-bottom: 15px;
	background: #fff;
	  
	.list-left {
	  	display: flex;
	  	justify-content: center;
	  	align-items: center;
	  	padding: 15px;
	  	font-size: fontSizeRem100(24);
	}
	.list-center {
	  	flex: 1;
	  	padding-right: 15px;

	  	.is-tell {
	  	  	font-size: fontSizeRem100(14);
	  	  	color: $fontColor3;
	  	  	margin-bottom: 0.2em;
	  	}
	  	.is-name {
	  	  	font-size: fontSizeRem100(16);
	  	  	font-weight: bold;
	  	  	color: $fontColor2;
	  	  	margin-right: 1em;
	  	}
	  	.is-default {
	  	  	padding: 0 1em;
	  	  	background: #fff5e4;
	  	  	color: orange;
	  	  	border-radius: 0.2em;
	  	  	margin-right: 1em;
	  	}
	  	.is-address {
	  	  	font-size: fontSizeRem100(14);
	  	  	color: $fontColor2;
	  	}
	}
	.list-right {
	  	display: flex;
	  	justify-content: center;
	  	align-items: center;	

	  	span {
	  	  	display: block;
	  	  	text-align: center;
	  	  	font-size: 0.14rem;
	  	  	color: $fontColor3;
	  	  	width: 5em;
	  	  	line-height: 2em;
	  	  	border-left: 1px solid $fontColor4;
	  	}
	}
}
</style>  
