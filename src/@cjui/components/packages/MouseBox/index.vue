<template>
    <!-- <cjui-mouse-box :event="eventName"></cjui-mouse-box> -->
    <div class="cjui-mouse-box">
        <slot></slot>
    </div>
</template>

<script>
import $ from "jquery";
import { toRefs, watch } from 'vue';

export default {
  	name: "CjuiMouseBox",
  	props: {
  	  	event: {  // 传入鼠标点击事件
  	  	  	validator: function (value) {
  	  	  	  	return value;
  	  	  	},
  	  	},
  	  	margin: {  // 边界安全距离
  	  	  	type: Number,
  	  	  	default: 10,
  	  	},
  	  	duration: {  // 显现用时
  	  	  	type: Number,
  	  	  	default: 200,
  	  	},
  	},
	setup(props, context) {
		const { event, margin, duration } = toRefs(props);
    	function closeEvent() {
			document.removeEventListener("click", closeEvent);
    	  	$(".cjui-mouse-box").hide(duration.value, () => {
    	  	  	context.emit("close");
    	  	});
    	}
		function initByJquery() {
      		//Get window size:
      		var winWidth = $(document).width();
      		var winHeight = $(document).height();
      		//Get pointer position:
      		var posX = event.value.pageX;
      		var posY = event.value.pageY;
      		//Get contextmenu size:
      		var menuWidth = $(".cjui-mouse-box").outerWidth();
      		var menuHeight = $(".cjui-mouse-box").outerHeight();
      		//Security margin:
      		var secMargin = margin.value;
      		//Prevent page overflow:
      		let posLeft, posTop;
      		if (
      		  posX + menuWidth + secMargin >= winWidth &&
      		  posY + menuHeight + secMargin >= winHeight
      		) {
      		  //Case 1: right-bottom overflow:
      		  posLeft = posX - menuWidth - secMargin;
      		  posTop = posY - menuHeight - secMargin;
      		} else if (posX + menuWidth + secMargin >= winWidth) {
      		  //Case 2: right overflow:
      		  posLeft = posX - menuWidth - secMargin;
      		  posTop = posY + secMargin;
      		} else if (posY + menuHeight + secMargin >= winHeight) {
      		  //Case 3: bottom overflow:
      		  posLeft = posX + secMargin;
      		  posTop = posY - menuHeight - secMargin;
      		} else {
      		  //Case 4: default values:
      		  posLeft = posX + secMargin;
      		  posTop = posY + secMargin;
      		}
      		if (posLeft < 0) posLeft = 0;
      		if (posTop < 0) posTop = 0;

      		$(".cjui-mouse-box").css({ left: posLeft + "px", top: posTop + "px", }).show(duration.value);

      		document.addEventListener("click", closeEvent);
    	}
		watch(() => event.value, (newVal, oldVal) => {
  	  	  	$(".cjui-mouse-box").hide(duration.value, () => {
  	  	  	  	initByJquery();
  	  	  	});
		});
	}
};
</script>

<style lang="scss">
.cjui-mouse-box {
    min-width: 100px;
    background: #000;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 15px 35px rgba(50, 50, 90, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    overflow: hidden;
    display: none;
    position: fixed;
    margin: 10px;
    padding: 10px;
    z-index: 19999;
}
</style>
