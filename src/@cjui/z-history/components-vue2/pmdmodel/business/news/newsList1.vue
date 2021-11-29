<template>
    <div class="PMDmodelnewslist">
      <div class="item-body">
        <div class="item-body-left">
          <img src="../../../../assets/img/img/05.png" alt="" />
        </div>
        <div class="item-body-right">
          <h2>这段新闻就一行，就这样</h2>
          <span>已推荐</span>
          <p>03-15 11:01 推荐 233 浏览 32</p>
        </div>
      </div>
      <div class="list-item-footer">
        <div class="item-footer-icon">
          <i class="el-icon-share"></i>
          <span>分享</span>
        </div>
        <div class="item-footer-icon">
          <i class="el-icon-chat-dot-square"></i>
          <span>评论</span>
        </div>
        <div class="item-footer-icon">
          <i class="el-icon-pie-chart"></i>
          <span>数据</span>
        </div>
        <div class="item-footer-icon">
          <i class="el-icon-more-outline"></i>
          <span>更多</span>
        </div>
      </div>
    </div>
</template>     

<script>
export default {
  	name: "PMDmodelnewslist",
};
</script>

<style lang="scss">
// 分辨率适配，切换rem与px，采用 1rem = 100px 方案
@function fontSizeRem100($sizeValue: 16) {
  	// @return $sizeValue * 1px;
  	@return $sizeValue / 100 * 1rem;
}

.PMDmodelnewslist {
  	display: flex;
	flex-direction: column;
  	padding-bottom: 15px;
	background: #fff;
	
	.item-body {
  		padding: 15px;
  		display: flex;
  		align-items: center;
  		position: relative;

  		&:after {
  		  	content: "";
  		  	position: absolute;
  		  	z-index: 2;
  		  	bottom: 0;
  		  	left: 15px;
  		  	width: calc(100% - 30px);
  		  	height: 1px;
  		  	border-bottom: 1px solid #e2e2e2;
  		  	transform: scaleY(0.5);
  		  	transform-origin: 0 100%;
  		}
	}
	.item-body-left {
  		width: fontSizeRem100(120);
  		height: fontSizeRem100(82);
  		font-size: fontSizeRem100(16);

  		img {
  		  	width: 100%;
  		  	height: 100%;
  		  	object-fit: cover;
  		  	border-radius: 0.2em;
  		}
	}
	.item-body-right {
  		flex: 1;
  		padding-left: 15px;
  		font-size: fontSizeRem100(16);

  		& > h2 {
  		  	font-size: 1em;
  		  	margin-bottom: 0.4em;
  		  	word-break: break-all;
  		  	text-overflow: ellipsis;
  		  	display: -webkit-box;
  		  	-webkit-box-orient: vertical;
  		  	-webkit-line-clamp: 2;
  		  	overflow: hidden;
  		}
  		& > span {
  		  	color: #507cf7;
  		  	font-size: 0.7em;
  		  	border: 1px solid #507cf7;
  		  	border-radius: 2px;
  		  	margin-bottom: 0.2em;
  		  	display: block;
  		  	width: 4em;
  		  	text-align: center;
  		  	transform: scale(0.8);
  		}
  		& > p {
  		  	color: #999999;
  		  	font-size: 0.8em;
  		}
	}
	.list-item-footer {
  		padding: 15px;
  		display: flex;
	}
	.item-footer-icon {
  		flex: 1;
  		text-align: center;
  		color: #b5b5b5;
  		position: relative;
  		font-size: fontSizeRem100(16);

  		&:not(:last-child):after {
  		  	content: "";
  		  	position: absolute;
  		  	z-index: 0;
  		  	top: 0;
  		  	right: 0;
  		  	height: 100%;
  		  	border-right: 1px solid #d9d9d9;
  		  	transform: scaleX(0.5);
  		  	transform-origin: 100% 0;
  		}

  		i {
  		  	font-size: 1.2em;
  		  	margin-right: 0.2em;
  		}
  		i, span {
  		  	vertical-align: middle;
  		}
	}
}
</style>  
