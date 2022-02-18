import API from '@/views/OSadmin/js/interface.js';

const state = {
    // 后台系统设置
    storeProfiles: 'night',  // 情景模式，day - 日间模式，night - 夜晚模式
    // Admin公共列表
    vuexBlogClassList: [],
    vuexUserExtractTypeList: [],
}

const getters = {
	// 情景模式样式
	storeProfilesgetter: state => {
        return 'osa-' + state.storeProfiles
	},
	vuexProfilesgetter: state => {
        return 'osa-' + state.storeProfiles
	},
}

const mutations = {
    // 改变情景模式
    vuexProfilesChange(state, data) {
        sessionStorage.setItem('osadminProfiles', data)
        state.storeProfiles = sessionStorage.osadminProfiles
    },
    // Admin公共列表
    vuexLoadBlogClassList(state, data) {
        state.vuexBlogClassList = data;
    },
    vuexLoadUserExtractTypeList(state, data) {
        state.vuexUserExtractTypeList = data;
    },
}

const actions = {
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}