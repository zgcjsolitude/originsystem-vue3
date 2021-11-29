import utils from '@/utils/utils.js'

// axios 
import axios from "axios" 
import qs from 'qs'
axios.defaults.baseURL = GlobalConfig.ApiBaseUrl
axios.defaults.timeout = 120000
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = (data) => {  // 发送参数前进行处理
	data = utils.hex_encodeURIComponent(data)
	return qs.stringify(data, { arrayFormat: 'brackets' })  // 用qs格式化数据为表单类型
};

// app
import { createApp } from 'vue'
import '@/assets/css/index.scss'

import App from '@/views/App.vue'
import Router from '@/router/index'
import { store } from '@/store/index'
const app = createApp(App)
app.use(Router)
app.use(store)

// globalProperties 全局对象
import { ImgBaseUrl } from './assets/js/data-dictionary'
import _ from 'lodash'
app.config.globalProperties.$imgBaseUrl = ImgBaseUrl
app.config.globalProperties._ = _

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
app.use(ElementPlus, { elementZhLocale })

// animate.css
import 'animate.css'

// font-awesome
import './assets/libs/font-awesome-4.7.0/css/font-awesome.min.css'

// vue3-lazyload
import VueLazyLoad from 'vue3-lazyload'
app.use(VueLazyLoad, {
	log: false,
	loading: ImgBaseUrl + '/img/origin-system/picloading.jpg',
	error: ImgBaseUrl + '/img/origin-system/nopic.jpg',
	lifecycle: {
	  	loading: () => {},
	  	error: () => {},
	  	loaded: () => {}
	}
})

// 自定义语言包
import { createI18n } from 'vue-i18n'
import enLocale from './language/en'
import zhLocale from './language/zh-cn'
const localLang = localStorage.getItem('OSlocalLang') || 'zh-cn'
const i18n = createI18n({
    locale: localLang,		// 默认显示的语言 
    messages: {	        // 引入语言文件
        en: {
		  	...enLocale,
		  	...elementEnLocale
		},
        'zh-cn': {
		  	...zhLocale,
		  	...elementZhLocale
		},
    }
})
app.use(i18n)

// global components
import { ComponentInstall } from '@/components/global/index.js'
ComponentInstall(app)

app.mount('#app')