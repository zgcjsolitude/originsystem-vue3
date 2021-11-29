import CjuiIconSvg from './index.vue'

// 需要使用webpack的svg-sprite-loader插件
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('../../../../../assets/svg', true, /\.svg$/)
requireAll(req)

CjuiIconSvg.install = function (Vue) {
    Vue.component(CjuiIconSvg.name, CjuiIconSvg)
}

export const cjuiIconSvg = CjuiIconSvg
