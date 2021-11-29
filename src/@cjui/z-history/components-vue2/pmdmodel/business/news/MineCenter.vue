<template>
	<PmdmodelHeader 
    class="CjuiShowPmdnewsbookmsg"
		title="作者"
    :header-padding="false"
    right-icon="el-icon-more-outline"
		@leftEvent="$router.go(-1)"
		>
      <section class="scrollview">
        <div class="scrollview-header">
          <div class="scrollview-header-box">
            <div class="scrollview-header-top">
              <div class="scrollview-header-userimg">
                <img src="" alt="" />
              </div>
              <div class="scrollview-header-usermsg">
                <h2>你的名字 <i class="el-icon-success"></i></h2>
                <span>PRO</span>
              </div>
              <div class="scrollview-header-btn">
                <button>关注+</button>
              </div>
            </div>
            <div class="scrollview-header-text">
              这是一段关于面板主人的信息介绍，最大行数为3，超出的部分将被隐藏。
            </div>
            <div class="scrollview-header-bottom">
              <div class="scrollview-header-grid">
                <h2>82</h2>
                <p>关注</p>
              </div>
              <div class="scrollview-header-grid">
                <h2>99</h2>
                <p>粉丝</p>
              </div>
              <div class="scrollview-header-grid">
                <h2>12</h2>
                <p>文章</p>
              </div>
            </div>
          </div>
        </div>
        <div class="scrollview-title">
          <h2>动态</h2>
        </div>
        <div class="scrollview-list">
          <div class="list-item">
            <h3>订阅了话题</h3>
            <p>科创板审核系统正式开启 净利润大多在20000万以上</p>
            <span>2019-04-16</span>
          </div>
          <div class="list-item">
            <h3>点击了图集</h3>
            <div>
              点击了解平安医生第一年收分的年报:一份无法复制的互联网商业模式。
            </div>
            <span>2019-04-16</span>
          </div>
          <div class="list-item">
            <h3>订阅了话题</h3>
            <p>科创板审核系统正式开启 净利润大多在20000万以上</p>
            <span>2019-04-16</span>
          </div>
          <div class="list-item">
            <h3>点击了图集</h3>
            <div>
              点击了解平安医生第一年收分的年报:一份无法复制的互联网商业模式。
            </div>
            <span>2019-04-16</span>
          </div>
        </div>
      </section>
	</PmdmodelHeader>
</template>     

<script>
import PmdmodelHeader from '@/@cjui/public/pmdmodel/packages/structure/header';

export default {
	name: "CjuiShowPmdnewsbookmsg",
	components: {
	  	PmdmodelHeader
	},
  	data() {
		return {
		  
		}
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
// 分辨率适配，切换rem与px，采用 1rem = 100px 方案
@function fontSizeRem100($sizeValue: 16) {
  	// @return $sizeValue * 1px;
  	@return $sizeValue / 100 * 1rem;
}

.CjuiShowPmdnewsbookmsg {
	/deep/ .header {
		color: #fff;
  	background:transparent;
	}
}
.CjuiShowPmdnewsbookmsg.is-fixed-transition {
	/deep/ .header {
		background:#fff;
		box-shadow: 0 0 4px 2px rgba(0,0,0,0.1);
	}
  /deep/ .header-left {
      color: #00a5a1;
  }
  /deep/ .header-center {
      color: #333333;
  }
  /deep/ .header-right {
      color: #00a5a1;
  }
}
.scrollview-header {
  height: fontSizeRem100(300);
  background: #000;
  padding-top: fontSizeRem100(44);
  position: relative;
}
.scrollview-header-box {
  width: 100%;
  padding: 15px;
  position: absolute;
  top: 20%;
}
.scrollview-header-top {
  display: flex;
  align-items: center;
  color: #f9f9f9;

  .scrollview-header-userimg {
    width: fontSizeRem100(60);
    height: fontSizeRem100(60);
    border-radius: 100%;
    background: #f9f9f9;
    overflow: hidden;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .scrollview-header-usermsg {
    padding-left: fontSizeRem100(10);
    flex: 1;
    font-size: fontSizeRem100(18);

    h2 {
      color: #f9f9f9;
      font-size: 1em;
      font-weight: normal;
      position: relative;
    }
    h2 > i {
      color: #00a5a1;
    }
    span {
      color: #f9f9f9;
      font-size: 0.6em;
      background: #e2ac70;
      padding: 0.1em 1em;
      border-radius: 1em;
    }
  }
  .scrollview-header-btn {
    font-size: fontSizeRem100(14);

    button {
      background: none;
      border: 1px solid #fff;
      color: #fff;
      font-size: 1em;
      padding: 0.2em 1em;
      border-radius: 0.15em;
    }
  }
}
.scrollview-header-text {
  font-size: fontSizeRem100(14);
  color: #eee;
  padding-top: 15px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.scrollview-header-bottom {
  padding-top: fontSizeRem100(10);
  position: relative;
  overflow: hidden;

  .scrollview-header-grid {
    display: inline-block;
    text-align: center;
    color: #eee;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: fontSizeRem100(10);
    margin-right: 0.4rem;
    margin-top: 0.1rem;

    h2 {
      font-size: 2em;
      color: #f9f9f9;
    }
    p {
      font-size: 1.2em;
      color: #eee;
    }
  }
}
.scrollview-title {
  padding: 15px;
  border-bottom: 1px solid #eee;
  font-size: fontSizeRem100(10);

  h2 {
    position: relative;
    color: #333333;
    font-size: 1.4em;
  }

  h2:after {
    content: "";
    position: absolute;
    z-index: 0;
    top: 1px;
    left: -15px;
    width: 5px;
    height: 90%;
    background: #00a5a1;
  }
}
.scrollview-list {
  padding: 0 15px;
}
.list-item {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  font-size: fontSizeRem100(10);

  h3 {
    color: #808080;
    font-weight: normal;
    font-size: 1.4em;
  }
  p {
    color: #333333;
    font-size: 1.4em;
    margin: 0.5em 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  span {
    color: #b4b4b4;
    font-size: 1.2em;
  }
  div {
    margin: 0.5em 0;
    background: #f6f6f6;
    padding: 15px;
    color: #666666;
    font-size: 1.4em;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>
