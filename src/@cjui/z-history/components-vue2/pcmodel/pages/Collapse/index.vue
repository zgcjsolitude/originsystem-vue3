<template>
  <div class="PCcollapse1">
    <p class="PCcollapse1_title">基础属性</p>
    <el-collapse v-model="activeNames1" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="PCcollapse1_col">
            <cjui-icon-svg
              icon-class="404"
              class="PCcollapse1_col-icon is-hidden"
            />
            <span class="PCcollapse1_col-title">生命值上限</span>
            <span class="PCcollapse1_col-right">1321231</span>
          </div>
        </template>
        <div>ninadsadas</div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <div class="PCcollapse1_col">
            <cjui-icon-svg icon-class="404" class="is-hiddden" />
            <span class="PCcollapse1_col-title">生命值上限</span>
            <span class="PCcollapse1_col-right">1321231</span>
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <div class="PCcollapse1_col">
            <cjui-icon-svg icon-class="404" class="PCcollapse1_col-icon" />
            <span class="PCcollapse1_col-title">生命值上限</span>
            <span class="PCcollapse1_col-right">1321231</span>
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <div class="PCcollapse1_col">
            <cjui-icon-svg icon-class="404" class="PCcollapse1_col-icon" />
            <span class="PCcollapse1_col-title">生命值上限</span>
            <span class="PCcollapse1_col-right">1321231</span>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
    <p class="PCcollapse1_title">基础属性</p>
    <el-collapse v-model="activeNames2" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="PCcollapse1_col">
            <cjui-icon-svg
              icon-class="404"
              class="PCcollapse1_col-icon is-hidden"
            />
            <span class="PCcollapse1_col-title">生命值上限</span>
            <span class="PCcollapse1_col-right">1321231</span>
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <div class="PCcollapse1_col">
            <cjui-icon-svg icon-class="404" class="is-hiddden" />
            <span class="PCcollapse1_col-title">生命值上限</span>
            <span class="PCcollapse1_col-right">1321231</span>
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <div class="PCcollapse1_col">
            <cjui-icon-svg icon-class="404" class="PCcollapse1_col-icon" />
            <span class="PCcollapse1_col-title">生命值上限</span>
            <span class="PCcollapse1_col-right">1321231</span>
          </div>
        </template>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <div class="PCcollapse1_col">
            <cjui-icon-svg icon-class="404" class="PCcollapse1_col-icon" />
            <span class="PCcollapse1_col-title">生命值上限</span>
            <span class="PCcollapse1_col-right">1321231</span>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>     

<script>
export default {
  name: "PCcollapse1",
  data() {
    return {
      activeNames1: [],
      activeNames2: [],
    };
  },
};
</script>

<style lang="scss" scoped>
// color
.PCcollapse1 {
  background: linear-gradient(
    180deg,
    rgba(0, 37, 45, 0.8),
    rgba(31, 22, 11, 0.8)
  );
  color: #bfbfbf;
  .el-collapse {
    border-top: 0;
    border-bottom: 0;
  }
  .el-collapse-item__header {
    color: #f9f9f9;
  }
  .el-collapse-item__header.focusing:focus:not(:hover) {
    color: #0bbbcc;
  }
  .el-collapse-item:nth-child(2n + 1) .el-collapse-item__header {
    background-color: rgba($color: #000000, $alpha: 0.3);
  }
  .el-collapse-item:nth-child(2n) .el-collapse-item__header {
    background-color: rgba($color: #000000, $alpha: 0.2);
  }
  .el-collapse-item__wrap {
    background-color: transparent;
  }
  .el-collapse-item__content {
    color: #eee;
  }
}
// layout
.PCcollapse1 {
  width: 100%;
  height: 100%;
  overflow: auto;

  .el-collapse-item__header {
    border: 0;
    font-weight: 600;
    height: 3em;
    line-height: 3em;
    padding: 0 3em 0 1em;
    position: relative;
  }
  .el-collapse-item__arrow {
    display: none;
  }
  .el-collapse-item__wrap {
    background-color: transparent;
    border-bottom: 0;
    padding: 0 2.3em;
  }
}
.PCcollapse1_title {
  margin-top: 0.5em;
  font-size: 13px;
  line-height: 2;
  padding: 0 1em;
}
.PCcollapse1_col {
  width: 100%;
  position: relative;

  .PCcollapse1_col-icon.is-hidden {
    visibility: hidden;
  }
  .PCcollapse1_col-title {
    margin-left: 1em;
  }
  .PCcollapse1_col-right {
    position: absolute;
    right: 0;
  }
}
</style>