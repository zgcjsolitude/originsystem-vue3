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
13. 彩带效果 分隔下边框 组件封装
14. 源权树无子集可拖拽 和 全修改
15. 鼠标点击动画
18. 重构路由埋点
19. 数据库定时脚本
20. 富文本文章编辑器
21. nginx代理
22. token
24. 博文编辑页面切换事件重复
25. 删除博文空间 classify OVF1635433769903

## 长久需求
1. 国际化策略完善

## 问题记录
1. 表格分页器无效

## 项目使用插件说明
### npm 包
1. axios + qs + vue-router;
2. vue3-lazyload  -- 图片懒加载插件;
3. sass  -- dart-scss;
4. element-resize-detector  -- 元素宽度监听器
6. element-plus + @element-plus/icons + @element-plus/icons-vue -- element-ui vue3版本及图标库
7. screenfull -- screenfull全屏触发器，目前依赖包screenfull版本>5，在vue中全屏功能无效，请安装指定版本4.2.1
8. @vitejs/plugin-vue-jsx -- JSX语法支持
9. animate.css -- 过度动画
10. clipboard -- 复制插件
11. vue-i18n -- 国际化插件
12. localforage -- indexDB存储工具库
13. echarts -- echarts图表
14. lodash -- js工具函数库
15. tinymce + @tinymce/tinymce-vue  -- tinymce富文本编辑器
### 本地public/libs 包
1. jquery@3.5.1 + bootstrap@4.6.0
2. particles@2.0.0
3. tinymce@5.10.2
### 资源src/assets/libs 包
1. font-awesome-4.7.0  -- font-awesome图标库

## 开发日志
### github
1. github地址 https://github.com/zgcjsolitude/originsystem-vue3
### localStorage公共信息
1. OSlocalLang -- 本地语言选择本地化存储key值