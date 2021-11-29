### 自研底层组件/样式/函数库
# 说明：【全局引用】@cjui文件夹内的任何文件都只能由项目顶层引用，再到子模块的二次引用，勿子模块直接全局造成引用混乱，举例如下：
1. components 组件库全局注册引用请在 /components/global/index.js 中进行；
2. css 样式库的全局引用请在 /assets/_common.scss 中进行；
3. js 脚本库的全局注册请在 /utils/utils.js 中进行。