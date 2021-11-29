<template>
  <div class="PChome2">
    <header class="PChome2_header">
      <div class="PChome2_left">
        <img src alt />
      </div>
      <div class="PChome2_center">
        <el-menu default-active="1" class="PChome2_menu" mode="horizontal">
          <el-menu-item index="1">
            <div class="PChome2_menu-list">
              <!-- <img src="../../../../../assets/img/fileicons/md_blue.png" alt srcset /> -->
              <i class="el-icon-user-solid"></i>
              <p>处理中心</p>
            </div>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <div class="PChome2_menu-list">
                <i class="el-icon-s-tools"></i>
                <p>我的工作台</p>
              </div>
            </template>
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
          <el-menu-item index="3">
            <div class="PChome2_menu-list">
              <i class="el-icon-picture"></i>
              <p>订单管理</p>
            </div>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="PChome2_right">
        <div>
          <p>标题文字</p>
          <p>2020-01-01</p>
        </div>
      </div>
    </header>
    <main class="PChome2_body"></main>
    <div class="PChome2_footer">这是底部</div>
  </div>
</template>   

<script>
export default {
  name: "PChome2",
};
</script>

<style lang="scss" scoped>
.PChome2 {
  --PChome2itemColor: #2cd6bf;
  --PChome2itemColorDarken: #0b9c89;
}
// color
.PChome2_header {
  background: var(--PChome2itemColor);
}
.PChome2_left {
  img {
    background: #fff;
  }
}
/deep/ .PChome2_menu {
  border: 0;
  background: var(--PChome2itemColor);

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
    background-color: var(--PChome2itemColorDarken);
    color: #f9f9f9;
  }
  .el-menu-item.is-disabled {
    opacity: 0.5;
  }
}
.PChome2_right {
  color: #fff;
}
.PChome2_body {
  background-color: #f9f9f9;
}
.PChome2_footer {
  background: var(--PChome2itemColor);
  color: #fff;
}
// layout
.PChome2 {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.PChome2_header {
  height: 60px;
  display: flex;
}
.PChome2_left {
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;

  img {
    width: 160px;
    height: 40px;
  }
}
.PChome2_center {
  flex: 1;
}
/deep/ .PChome2_menu {
  & > .el-menu-item,
  & > .el-submenu > .el-submenu__title {
    height: 60px;
  }
  & > .el-submenu > .el-menu-item {
    height: 42px;
    line-height: 42px;
    min-width: unset;
  }
  & > .el-submenu > .el-submenu__title > .el-submenu__icon-arrow {
    display: none;
  }
}
.PChome2_menu-list {
  height: 100%;
  text-align: center;
  padding-top: 6px;

  * {
    vertical-align: initial;
  }
  i,
  img {
    display: block;
    margin: 0 auto 2px;
  }
  i {
    font-size: 28px;
  }
  img {
    height: 28px;
  }
  p {
    line-height: 1.5;
    font-size: 14px;
  }
}
.PChome2_right {
  width: 200px;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;

  p:last-child {
    font-size: 14px;
  }
}
.PChome2_body {
  width: 100%;
  flex: 1;
  overflow: auto;
}
.PChome2_footer {
  width: 100%;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  padding: 0 22px;
}
</style>
