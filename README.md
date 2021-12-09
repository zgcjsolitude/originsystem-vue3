# orign-system-vue3

## 项目规范
1. 采用4空格缩进
2. 非全局组件文件命名，业务拆分的子组件采用 PascalCase，可公共使用的组件采用 kebab-case，在模板中书写统一采用 PascalCase
3. 全局组件文件命名采用 kebab-case，在模板中书写统一采用 kebab-case
4. 可公共使用的组件统一使用 `<script>`, 业务拆分的子组件使用 `<script>` 或 `<script setup>`(建议用于业务逻辑复杂场景)
5. 项目中尽量不要写任何全局样式，子业务通用性样式若要提升到全局，请在 @/assets/css/global-list.scss 中注册，非通用性全局样式取名尽可能复杂避免影响到全局

## 需求记录
1. 锚点定位显示
2. CJUI文档分辨率适应
3. 后台个人信息界面
5. svg公共组件
6. ENV环境变量识别url路径
7. 指定位置埋点函数
10. 系统功能树、系统指南模块、嵌入式开发
11. MongoDB时间戳转化
12. bin 脚本文件夹
12. 彩带效果 分隔下边框 组件封装

## 长久需求
1. 国际化策略完善

## 问题记录
1. 表格分页器无效


## 更新日志
### orign-system-vue3@0.0.0
1. 根源系统建立，包含系统前台、后台、和个人博客三个项目，以及文字摘录展示等1个独立模块
2. 新增前端开发文档指南项目，内容为个人前端总结经验
3. 新增国际化策略、本地存储语言选择
4. 封装el表格jsx组件
5. 登录载入逻辑优化


## 根源系统功能说明
### 系统前台
1. 首页功能入口
2. 文字摘录展示独立模块
### 系统后台
1. 个人中心
2. 个人空间
    - 博客空间管理
    - 摘录管理
    - 用户信息配置
    - 文件管理
3. 系统管理
    - 系统信息管理
    - 系统摘录管理
4. 系统建设人
    - 管理员管理
### 博客空间
1. 首页
2. 博文分类
### 前端开发指南
1. 组件
2. css样式收藏


## 项目使用插件说明
### npm 包
1. axios + qs + vue-router;
2. vue3-lazyload  -- 图片懒加载插件;
3. sass  -- dart-scss;
4. element-resize-detector  -- 元素宽度监听器
6. element-plus + @element-plus/icons -- element-ui vue3版本及图标库
7. screenfull -- screenfull全屏触发器，目前依赖包screenfull版本>5，在vue中全屏功能无效，请安装指定版本4.2.1
8. @vitejs/plugin-vue-jsx -- JSX语法支持（vite配置失败，目前无法使用jsx语法）
9. animate.css -- 过度动画
10. clipboard -- 复制插件
11. vue-i18n -- 国际化插件
12. localforage -- indexDB存储工具库
13. echarts -- echarts图表
14. lodash -- js工具函数库
### 本地public/libs 包
1. jquery@3.5.1 + bootstrap@4.6.0
2. particles@2.0.0
### 资源src/assets/libs 包
1. font-awesome-4.7.0  -- font-awesome图标库


## 开发日志
###
1. github地址 https://github.com/zgcjsolitude/originsystem-vue3
### localStorage公共信息
1. OSlocalLang -- 本地语言选择本地化存储key值