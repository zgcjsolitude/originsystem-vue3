<template>
  	<div class="CjuiPMDlayoutRow">
        <div class="layout-row-container" :class="[padding && 'is-padding']">
            <div class="layout-row-left" :style="{ width: leftWidth, height: leftHeight }">
		        <slot name="left">
            	<img src="/img/origin-system/nopic.jpg" alt="">
		        </slot>
            </div>
            <div class="layout-row-right" :style="{ height: leftHeight }" >
                <slot name="right">
            		right
		        </slot>
            </div>
        </div>

        <slot></slot>
  	</div>
</template>

<script>
export default {
    props: {
        padding: {
            type: Boolean,
            default: false
        },
        leftWidth: {
            type: String,
            default: '100px'
        },
        leftHeight: {
            type: String,
            default: '100px'
        },
    },
}
</script>


<style lang="scss" scoped>
// 分辨率适配，切换rem与px，采用 1rem = 100px 方案
@function fontSizeRem100($sizeValue: 16) {
  	@return $sizeValue * 1px;
  	// @return $sizeValue / 100 * 1rem;
}

.CjuiPMDlayoutRow {
    position: relative;
}
.layout-row-container {
    display: flex;
    align-items: center;
}
.layout-row-left {
    img {
        width: 100%; 
        height: 100%;
        object-fit: cover;
    }
}
.layout-row-right {
    flex: 1;
    padding: 15px;
    position: relative;
}
.layout-row-container.is-padding {
    padding: 15px;

    .layout-row-left {
        img {
            border-radius: fontSizeRem100(4);
        }
    }
    .layout-row-right {
        padding-left: 15px;
    }
}
</style>
