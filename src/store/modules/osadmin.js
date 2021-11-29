import API from '@/views/OSadmin/js/interface.js';

const state = {
    // 后台系统设置
    vuexProfiles: 'night',  // 情景模式，day - 日间模式，night - 夜晚模式
    // Admin公共列表
    vuexBlogClassList: [],
    vuexUserExtractTypeList: [],
    vuexSystemExtractTypeList: [],
}

const getters = {
	// 情景模式样式
	storeProfilesgetter: state => {
        return 'osa-' + state.vuexProfiles
	},
	vuexProfilesgetter: state => {
        return 'osa-' + state.vuexProfiles
	},
}

const mutations = {
    // 改变情景模式
    vuexProfilesChange(state, data) {
        sessionStorage.setItem('osadminProfiles', data)
        state.vuexProfiles = sessionStorage.osadminProfiles
    },
    // Admin公共列表
    vuexLoadBlogClassList(state, data) {
        state.vuexBlogClassList = data;
    },
    vuexLoadUserExtractTypeList(state, data) {
        state.vuexUserExtractTypeList = data;
    },
    vuexLoadSystemExtractTypeList(state, data) {
        state.vuexSystemExtractTypeList = data;
    },
}

const actions = {
    // 异步加载系统后台列表
    vuexLoadAdminAllList({ dispatch }) {
        dispatch('vuexLoadBlogClassList');  // 后台博客分组
        dispatch('vuexLoadUserExtractTypeList');  // 后台用户博客分组
        dispatch('vuexLoadSystemExtractTypeList');  // 后台系统博客分组
    },
    // 后台博客分组
    async vuexLoadBlogClassList({ rootState, commit }) {
        const { data } = await API._Return_usermsg({
            sign: "blogClass",
            userName: rootState.userName,
        });
        commit('vuexLoadBlogClassList', data);
    },
    // 后台用户摘录分组
    async vuexLoadUserExtractTypeList({ rootState, commit }) {
        const { data } = await API._Return_usermsg({
            sign: "extractType",
            userName: rootState.userName,
        });
        commit('vuexLoadUserExtractTypeList', data);
    },
    // 后台系统摘录分组
    async vuexLoadSystemExtractTypeList({ rootState, commit }) {
        let { data } = await API._Return_systemmsglist({
            sign: "extractType",
            userName: rootState.userName,
        });
        commit('vuexLoadSystemExtractTypeList', data);
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}