<template>
  <div class="PMDliststyle2">
    <div v-for="item in 3" :key="item" class="list-item">
      <div class="item-left">
        <h2><em>￥</em>200</h2>
        <p>满299元可用</p>
      </div>
      <div class="item-right">
        <h3 class="item-right-title">
          <em>券票</em>仅限购买阿迪达斯旗舰店商品
        </h3>
        <div class="item-right-center">
          <div class="item-right-date">2018.08.13-2018.08.31</div>
          <div class="item-right-bth">立即使用</div>
        </div>
        <div class="item-right-bottom">
          <div class="item-right-msg">详细信息</div>
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
      <div class="item-model"></div>
    </div>
    <div v-for="item in 3" :key="item" class="list-item is-green">
      <div class="item-left">
        <h2><em>￥</em>200</h2>
        <p>满299元可用</p>
      </div>
      <div class="item-right">
        <h3 class="item-right-title"><em>券票</em>仅限购买阿迪达斯旗舰店商品</h3>
        <div class="item-right-center">
          <div class="item-right-date">2018.08.13-2018.08.31</div>
          <div class="item-right-bth">立即使用</div>
        </div>
        <div class="item-right-bottom">
          <div class="item-right-msg">详细信息</div>
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
      <div class="item-model"></div>
    </div>
    <div v-for="item in 3" :key="item" class="list-item is-gray">
      <div class="item-left">
        <h2><em>￥</em>200</h2>
        <p>满299元可用</p>
      </div>
      <div class="item-right">
        <h3 class="item-right-title"><em>券票</em>仅限购买阿迪达斯旗舰店商品</h3>
        <div class="item-right-center">
          <div class="item-right-date">2018.08.13-2018.08.31</div>
          <div class="item-right-bth">已使用</div>
        </div>
        <div class="item-right-bottom">
          <div class="item-right-msg">详细信息</div>
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
      <div class="item-model"></div>
    </div>
  </div>
</template>     

<script>
export default {
  name: "PMDlistStyle2",
  data() {
    return {};
  },
  created() {},
};
</script>

<style lang="scss" scoped>
// 分辨率适配，切换rem与px，采用 1rem = 100px 方案
@function fontSizeRem100($sizeValue: 0.16) {
  // @return $sizeValue * 100px;
  @return $sizeValue * 1rem;
}

.PMDliststyle2 {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  background: #fdfdfd;
  padding: 15px 15px 0;
}
.list-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
}
.item-left {
  background-image: linear-gradient(to right, #529be8, #6175e0);
  background-color: #6175e0;
  text-align: center;
  color: #fff;
  height: fontSizeRem100(1);
  padding: 0.8em;
  width: 37%;
  position: relative;
  overflow: hidden;
  font-size: fontSizeRem100(0.16);

  & > h2 {
    color: #fff;
    font-size: 2.5em;
  }
  & > h2 em {
    color: #fff;
    font-style: normal;
    font-weight: normal;
    font-size: fontSizeRem100(0.2);
  }
  & > p {
    font-size: 0.75em;
    margin: 0;
  }
}
.item-right {
  padding: 10px;
  flex: 1;
  overflow: hidden;
  font-size: fontSizeRem100(0.12);

  .item-right-title {
    font-size: 1em;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    padding-bottom: 0.8em;
    font-weight: 600;
  }
  .item-right-title em {
    font-size: 1em;
    background: #5293d5;
    font-style: normal;
    color: #fff;
    border-radius: fontSizeRem100(0.2);
    padding: fontSizeRem100(0.01) fontSizeRem100(0.05);
    margin-top: fontSizeRem100(0.08);
    margin-right: 0.2em;
  }
}
.item-right-center {
  font-size: fontSizeRem100(0.12);
  border-bottom: 1px dashed #ddd;
  display: flex;
  padding-bottom: fontSizeRem100(0.06);

  .item-right-date {
    flex: 1;
    line-height: 1.2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-top: 0.5em;
    color: #333;
  }
  .item-right-bth {
    background: none;
    border: 1px solid #08acee;
    color: #08acee;
    border-radius: 2em;
    padding: 0.1em 0.5em;
  }
}
.item-right-bottom {
  font-size: fontSizeRem100(0.12);
  display: flex;

  .item-right-msg {
    flex: 1;
    padding-top: 0.7em;
  }
  i {
    padding: 0.3em;
    background: #eee;
    color: #fff;
    border-radius: 1em;
    margin-top: 0.6em;
  }
}
.item-model {
  width: fontSizeRem100(0.24);
  height: fontSizeRem100(1.1);
  background-image: radial-gradient(#fdfdfd 38%, transparent 0),
    radial-gradient(#fdfdfd 38%, transparent 0);
  background-size: fontSizeRem100(0.3) fontSizeRem100(0.3);
  background-position: 0px 0px, 0px fontSizeRem100(0.15);
  position: absolute;
  left: fontSizeRem100(-0.16);
  top: fontSizeRem100(-0.04);
}

.list-item.is-green {
  .item-left {
    background-image: linear-gradient(to right, #54dedf, #30d0a6);
    background-color: #30d0a6;
  }
  .item-right .item-right-title em {
    background: #30d0a6;
  }
  .item-right-center .item-right-bth {
    border-color: #30d0a6;
    color: #30d0a6;
  }
}

.list-item.is-gray {
  .item-left {
    background-image: unset;
    background-color: #c3c3c3;
  }
  .item-right .item-right-title em {
    background: #c3c3c3;
  }
  .item-right-center .item-right-bth {
    border-color: #c3c3c3;
    color:#c3c3c3;
  }
}
</style>  
