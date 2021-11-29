import CjuiFont from './index.vue'

CjuiFont.install = function (Vue) {
    Vue.component(CjuiFont.name, CjuiFont)
}

export const cjuiFont = CjuiFont