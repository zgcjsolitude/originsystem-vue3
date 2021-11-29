<template>
  <div class="PCnav3">
    <div class="PCnav3_left" :class="[isCollapse ? 'is-isCollapse' : '']">
      <logo v-if="showLogo" :collapse="isCollapse" />
      <el-scrollbar class="PCnav3_left-nav" wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :unique-opened="false"
          :collapse-transition="false"
          mode="vertical"
        >
          <!-- <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" /> -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="PCnav3_right">
      <Navbar
        @closeLeftNav="isCollapse = !isCollapse"
        :isCollapse="isCollapse"
      />
      <div class="PCnav3_right-centent">
        <keep-alive :include="keepList" :exclude="nokeepList" :max="10">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo";
import Navbar from "./Navbar";

export default {
  name: "PCnav3Index",
  components: {
    Logo,
    Navbar,
  },
  data() {
    return {
      keepList: [],
      nokeepList: [],
      showLogo: true,
      activeMenu: "1",
      isCollapse: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.PCnav3 {
  --PCnav3itemColor: #2cd6bf; // 界面主题色
  --PCnav3LeftTextColor: #bfcbd9; // 文字颜色
  --PCnav3LeftBgColor: #304156; // 界面左侧背景色
  --PCnav3LeftHoverBg: #263445; // hover背景色
}
// color
.PCnav3_left {
  background-color: var(--PCnav3LeftBgColor);
}
.PCnav3_right {
  background: #f9f9f9;
}
/deep/ .el-menu {
  background: var(--PCnav3LeftBgColor);

  .el-submenu .el-menu {
    background: var(--PCnav3LeftBgColor);
  }
  .el-menu-item,
  .el-menu-item i,
  .el-submenu__title,
  .el-submenu__title i,
  .el-submenu .el-menu-item {
    color: var(--PCnav3LeftTextColor);
  }
  .el-menu-item.is-active {
    color: var(--PCnav3itemColor);
  }
  .el-menu-item:focus,
  .el-menu-item:hover,
  .el-menu-item.is-active,
  .el-submenu__title:focus,
  .el-submenu__title:hover,
  .el-submenu .el-menu-item:focus,
  .el-submenu .el-menu-item:hover {
    background-color: var(--PCnav3LeftHoverBg);
    color: var(--PCnav3itemColor);
  }
  .el-menu-item:focus,
  .el-menu-item:hover,
  .el-menu-item.is-active {
    border-right: 2px solid;
  }
  .el-menu-item:hover i,
  .el-submenu__title:hover i,
  .el-menu-item.is-active i {
    color: var(--PCnav3itemColor);
  }
}
// layout
.PCnav3 {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  display: flex;
}
.PCnav3_left {
  width: 220px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in;
}
.PCnav3_left.is-isCollapse {
  width: 64px;
}
.PCnav3_left-nav {
  flex: 1;
}
.PCnav3_right {
  flex: 1;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.PCnav3_right-centent {
  flex: 1;
  overflow: auto;
}
/deep/ .el-menu {
  $ElNavHeight: 48px; // 导航一级行高
  $ElNavChildH: 42px; // 导航二级行高

  border: 0;

  .el-menu-item,
  .el-submenu__title {
    height: $ElNavHeight;
    line-height: $ElNavHeight;
  }
  .el-submenu .el-menu-item {
    height: $ElNavChildH;
    line-height: $ElNavChildH;
    min-width: unset;
  }
}
</style>

<style>
.scrollbar-wrapper {
  overflow-x: hidden !important;
}
</style>
