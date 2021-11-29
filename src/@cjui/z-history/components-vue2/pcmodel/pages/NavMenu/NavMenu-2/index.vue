<template>
  <div class="PChome1">
    <header class="PChome1_header">
      <div class="PChome1_header-top">
        <div class="PChome1_h-t-left">
          <span class="PChome1_h-icon">
            <img src alt />
          </span>
          <span class="PChome1_h-title">PC标题文本</span>
        </div>
      </div>
      <div class="PChome1_header-bottom">
        <el-menu default-active="1" class="PChome1_menu" mode="horizontal">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4">订单管理</el-menu-item>
        </el-menu>
      </div>
    </header>
    <main class="PChome1_body">
      <!-- 这是内容区域 -->
    </main>
    <div class="PChome1_footer">这是底部</div>
  </div>
</template>     

<script>
export default {
  name: "PChome1",
};
</script>

<style lang="scss" scoped>
.PChome1 {
  --PChome1itemColor: #2cd6bf;
  --PChome1itemColorDarken: #0b9c89;
}
// color
.PChome1_header {
  background: var(--PChome1itemColor);
}
.PChome1_header-top {
  box-shadow: #696969 0px 0px 4px 2px;
}
.PChome1_h-t-left {
  background: #f9f9f9;
}
.PChome1_h-t-left:after {
  border-right: 1px solid #000;
  background: #f9f9f9;
}
.PChome1_h-icon {
  img {
    background-color: var(--PChome1itemColor);
  }
}
.PChome1_h-title {
  color: #535353;
}
.PChome1_body {
  background-color: #f9f9f9;
}
.PChome1_footer {
  background: var(--PChome1itemColor);
  color: #fff;
}
/deep/ .PChome1_menu {
  border: 0;
  background: var(--PChome1itemColor);

  & > .el-menu-item,
  & > .el-menu-item i,
  & > .el-submenu > .el-submenu__title,
  & > .el-submenu > .el-submenu__title i,
  & > .el-submenu > .el-menu-item {
    color: #f9f9f9;
  }
  & > .el-menu-item:focus,
  & > .el-menu-item:hover,
  & > .el-menu-item.is-active,
  & > .el-submenu > .el-submenu__title:focus,
  & > .el-submenu > .el-submenu__title:hover,
  & > .el-submenu.is-active > .el-submenu__title,
  & > .el-submenu.is-active > .el-submenu__title:hover {
    border-bottom: 2px solid #00fa70;
    background-color: var(--PChome1itemColorDarken);
    color: #f9f9f9;
  }
  .el-menu-item.is-disabled {
    opacity: 0.5;
  }
}
// layout
.PChome1 {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.PChome1_header {
  height: 100px;
}
.PChome1_header-top {
  height: 50%;
  position: relative;
  z-index: 1;
}
.PChome1_h-t-left {
  width: 60%;
  height: 100%;
  padding: 0 15px;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
}
.PChome1_h-t-left:after {
  content: "";
  position: absolute;
  top: 0;
  right: -25px;
  bottom: 0;
  left: 0;
  z-index: -1;
  transform: skew(-45deg);
}
.PChome1_h-icon {
  img {
    display: block;
    width: 80px;
    height: 32px;
  }
}
.PChome1_h-title {
  padding: 10px;
  font-weight: 600;
  font-size: 17px;
}
.PChome1_header-bottom {
  height: 50%;
  padding: 0 15px;
}
/deep/ .PChome1_menu {
  & > .el-menu-item,
  & > .el-submenu > .el-submenu__title {
    height: 50px;
    line-height: 50px;
  }
  & > .el-submenu > .el-menu-item {
    height: 42px;
    line-height: 42px;
    min-width: unset;
  }
}
.PChome1_body {
  width: 100%;
  flex: 1;
  overflow: auto;
}
.PChome1_footer {
  width: 100%;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  padding: 0 22px;
}
</style>
