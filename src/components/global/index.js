// *** 不要全局注册继承父组件含有template标签的子组件

// @cjui 全局注册组件
import CjuiFontAnimation from '@/@cjui/components/packages/FontAnimation/index.vue';
import CjuiLoadingProgress from '@/@cjui/components/packages/LoadingProgress/index.vue';
import CjuiMouseBox from '@/@cjui/components/packages/MouseBox/index.vue';
import CjuiWfrow from '@/@cjui/components/packages/Waterfall/Wfrow.vue';
import CjuiWfcol from '@/@cjui/components/packages/Waterfall/Wfcol.vue';
import CjuiElplusTable from '@/@cjui/components/webUI/ElementPlus/packages/table/main.jsx';

// 根源系统前台 全局注册组件

// 博客空间 全局注册组件
import BSLoadingProgress from './blog-space/LoadingProgress.vue';

// CJUI前端指南 全局注册组件
import WBGfullscreenDialog from './web-develop-guide/FullscreenDialog.vue';

export const ComponentInstall = function(app) {

    // @cjui 全局注册组件
    app.component('CjuiFontAnimation', CjuiFontAnimation);
    app.component('CjuiLoadingProgress', CjuiLoadingProgress);
    app.component('CjuiMouseBox', CjuiMouseBox);
    app.component('CjuiWfrow', CjuiWfrow);
    app.component('CjuiWfcol', CjuiWfcol);
    app.component('CjuiElplusTable', CjuiElplusTable);

    // 根源系统前台 全局注册组件

    // 博客空间 全局注册组件
    app.component('BsLoadingProgress', BSLoadingProgress);

    // CJUI前端指南 全局注册组件
    app.component('WBGfullscreenDialog', WBGfullscreenDialog);
}