<template>
  <div class="PMDliststyle1">
    <div v-for="item in 3" :key="item" class="list-item">
      <div class="item-left">
        <img src="../../../../assets/img/img/05.png" alt="" />
      </div>
      <div class="item-right">
        <h2>
          这段商品信息含显示一行，但是明显超出了，当然超出的部分也被隐藏了，怎么样，不错吧
        </h2>
        <h3>
          这段商品信息含显示有一行，但是明显超出了，当然超出的部分也被隐藏了，怎么样，不错吧
        </h3>
        <span class="is-span">满200立减30</span>
        <div>
          <span class="is-newprice"><span class="is-mini">￥</span>358</span>
          <span class="is-oldprice"><span class="is-mini">￥</span>558</span>
          <el-button size="small">立即购买</el-button>
        </div>
      </div>
    </div>
  </div>
</template>     

<script>
export default {
  name: "PMDgoodStyle1",
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

.PMDliststyle1 {
  overflow: auto;
  position: relative;
  background: #fff;
  padding: 0 15px;
}
.list-item {
  background: #fff;
  padding: 15px 0;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: 0;
  }
}
.item-left {
  width: fontSizeRem100(1.1);
  height: fontSizeRem100(1.1);
  font-size: fontSizeRem100(0.16);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.2em;
  }
}
.item-right {
  height: fontSizeRem100(1.1);
  flex: 1;
  padding-left: 15px;
  font-size: fontSizeRem100(0.16);

  & > h2,
  & > h3 {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  & > h2 {
    font-size: 1em;
    margin-bottom: 0.4em;
  }
  & > h3 {
    font-size: 0.8em;
    margin-bottom: 0.4em;
    color: #adadad;
  }
  .is-span {
    color: #dd524d;
    font-size: 0.7em;
    border: 1px solid #dd524d;
    border-radius: 2px;
    margin-bottom: 0.2em;
    padding: 0.2em 1em;
    display: inline-block;
    text-align: center;
  }
  .is-newprice {
    color: #e65339;
    font-weight: bold;
    margin-right: 0.5em;
    line-height: 2;
  }
  .is-oldprice {
    color: #adadad;
    font-size: fontSizeRem100(0.14);
    text-decoration: line-through;
    line-height: 2;
  }
  .is-mini {
    font-size: fontSizeRem100(0.12);
  }
  .el-button {
    float: right;
  }
}
</style>
