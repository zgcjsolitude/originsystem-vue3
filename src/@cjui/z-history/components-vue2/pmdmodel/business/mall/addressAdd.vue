<template>
	<PmdmodelHeader 
    	class="PMDaddressAdd"
		title="添加收货地址"
    	:right-icon-show="false"
		@leftEvent="$router.go(-1)"
		>
        <div class="body">
        	    <div class="body-content">
        	      <div class="content-column">
        	        <label>收货人</label>
        	        <input type="text" placeholder="收货人" />
        	        <span>+ 通讯录</span>
        	      </div>
        	      <div class="content-column">
        	        <label>手机号码</label>
        	        <input type="text" placeholder="手机号码" />
        	        <span>+86 <i class="el-icon-arrow-right"></i></span>
        	      </div>
        	      <div class="content-column">
        	        <label>所在地区</label>
        	        <input type="text" placeholder="所在地区" />
        	        <span><i class="el-icon-arrow-right"></i></span>
        	      </div>
        	      <div class="content-column">
        	        <label>详细地址</label>
        	        <textarea rows="2" placeholder="所在地区" />
        	      </div>
        	    </div>
        	    <div class="body-title">智能填写</div>
        	    <div class="body-tool">
        	      <div class="tool-column">
        	        <label>默认地址</label>
        	        <div>
        	          <el-switch
        	            v-model="switchValue"
        	            active-color="#13ce66"
        	            inactive-color="#ff4949"
        	          >
        	          </el-switch>
        	        </div>
        	      </div>
        	    </div>
        	    <div class="body-button">
        	      <el-button type="primary" round>主要按钮</el-button>
        	    </div>
        </div>
	</PmdmodelHeader>
</template>     

<script>
import PmdmodelHeader from '@/@cjui/public/pmdmodel/packages/structure/header';

export default {
  	name: "PMDlistStyle3",
	components: {
        PmdmodelHeader,
	},
  	data() {
  	  	return {
  	  	  	switchValue: true,
  	  	};
  	},
  	created() {},
};
</script>

<style lang="scss" scoped>
.PMDaddressAdd {
	/deep/ .header {
		color: #333;
  		background:#f9f9f9;
	}
	/deep/ .header-center {
		flex: 8;
	}
	/deep/ .header-right {
		text-align: left;
	}
}
.PMDaddressAdd.is-fixed-transition {
	/deep/ .header {
		color: #333;
  		background:#f9f9f9;
	}
}

// 分辨率适配，切换rem与px，采用 1rem = 100px 方案
@function fontSizeRem100($sizeValue: 16) {
  	// @return $sizeValue * 1px;
  	@return $sizeValue / 100 * 1rem;
}

.body {
  padding-bottom: fontSizeRem100(50);
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  background: #fff;
}
.body-content {
  padding: 0 15px;
}
.content-column {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  font-size: fontSizeRem100(14);

  label {
    width: fontSizeRem100(80);
    padding-right: 1em;
    font-weight: bold;
  }
  input {
    width: 100%;
    flex: 1;
    border: 0;
    font-size: fontSizeRem100(14);
  }
  textarea {
    width: 100%;
    flex: 1;
    border: 0;
    font-size: fontSizeRem100(14);
    font-family: auto;
  }
  span {
    padding-left: 1em;
  }
}
.content-column:last-child {
  border-bottom: 0;
}
.body-title {
  padding: 15px;
  background: #f9f9f9;
  font-weight: bold;
}
.body-tool {
  padding: 0 15px;
}
.tool-column {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  font-size: fontSizeRem100(14);

  label {
    width: fontSizeRem100(80);
    padding-right: 1em;
    font-weight: bold;
  }
  div {
    text-align: right;
    flex: 1;
  }
}
.tool-column:last-child {
  border-bottom: 0;
}
.body-button {
  padding: 15px;

  .el-button {
    width: 100%;
  }
}
</style>  
