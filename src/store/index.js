import { createStore } from 'vuex'
import { OsBaseUrlApi } from '@/assets/js/data-dictionary'
import UserApi from '@/api/user-api'
import API from '@/api/os-api'

import OsAdmin from './modules/osadmin.js'

export const store = createStore({
    state () { 
    	return {
            // 系统状态
			storeLoading: false,  // 系统页面首次加载，store数据状态
            isLogin: false,
		    // 登录用户信息
		    userId: '',
            userName: '游客（本地）',
            userPassword: '123456',
            userEmail: '123456789@qq.com',
			userTel: '',
            userHeaderImg: '/private/users/temp/headpic.jpg',
            userGender: -1,
            userIntro: '',
            userBirthday: '',
            userStatus: false,
            userCreatedTime: '',
            userUpdatedTime: '',
            userAuthority: -1,  // 权限
            // 看板娘帮助
            vuexL2Dlive: 'false', // 看板娘状态显示
            vuexL2DliveTalk: [],  // 看板娘对话框所有内容
            vuexL2DTalkSign: '个人主页',  // 获取看板娘对话框标识
            vuexL2DliveHelp: {  // 按钮事件
                topShow: false,  // 是否显示 回到顶部
                topEvent: false,  // 值改变时触发回到顶部事件
            },
        }
    },
    getters: {
		// 获取是否登录
		vuexIsLogingetter: state => {
            return state.isLogin
		},
		// 获取用户头像
		vuexUserHeaderImggetter: state => {
			return OsBaseUrlApi + state.userHeaderImg
		},
		// L2D看板娘状态
		vuexL2Dlivegetter: state => {
            return state.vuexL2Dlive === 'true'
		},
    },
    mutations: {
		storeLoading(state, payload) {
			state.storeLoading = payload;
		},
		// 初始化公共信息
		storeLoadCommonState(state) {
			state.isLogin = false;
			state.userAuthority = [];
		},
		// 登录载入用户信息
		storeLoginIn(state, data) {
			state.userId = data.userId
			state.userName = data.name
			state.userPassword = data.password
			state.userGender = data.gender
			state.userEmail = data.email
			state.userTel = data.tel
			state.userHeaderImg = data.headimgurl
			state.userBirthday = data.birthday
			state.userIntro = data.intro
			state.userAuthority = data.authority
			state.userStatus = data.status
			state.userCreatedTime = data.createdTime
			state.userUpdatedTime = data.updatedTime
			state.isLogin = true
			sessionStorage.setItem('userId', data.userId)
			sessionStorage.setItem('userName', data.name)
			sessionStorage.setItem('userPassword', data.password)
			sessionStorage.setItem('isLogin', 'true')
		},
		// 登出删除用户信息
		storeLoginOut() {
			sessionStorage.removeItem('userId')
			sessionStorage.removeItem('userName')
			sessionStorage.removeItem('userPassword')
			sessionStorage.removeItem('isLogin')
            setTimeout(() => {
                window.location.reload()
            }, 50)
		},

		// 上传头像成功后改变头像
		vuexHeaderImgChange(state, data) {
			sessionStorage.userHeaderImg = data
			state.userHeaderImg = sessionStorage.userHeaderImg
		},
		// 改变L2D看板娘显示状态
		vuexL2DliveChange(state, data) {
			sessionStorage.setItem('L2Dlive', data)
			state.vuexL2Dlive = sessionStorage.L2Dlive
		},
		// 看板娘对话所有内容
		vuexL2DliveTalkChange(state, data) {
			state.vuexL2DliveTalk = data
		},
		// 看板娘对话按键功能
		vuexL2DliveHelpChange(state, data) {
			for (let i = 0; i < data.length; i++) {
				let keyName = data[i].keyName
				state.vuexL2DliveHelp[keyName] = data[i].keyValue
			}
		},
		// 看板娘获取对话标识
		vuexL2DTalkSignChange(state, data) {
			sessionStorage.setItem('L2DTalkSign', data)
			state.vuexL2DTalkSign = sessionStorage.L2DTalkSign
		},
    },
    actions: {
		// 系统store状态加载
		async storeLoadEvent({ state, getters, commit, dispatch }) {
			commit('storeLoading', true);
			commit('storeLoadCommonState');

			const isLogin = sessionStorage.isLogin;
			if (isLogin !== 'true') {
				await dispatch('storeLocalLogin');
			} else {
				await dispatch('storeLoadUserMsg');
			}
		},
		// 用户/游客本地登录
		async storeLocalLogin({ state, commit, dispatch }) {
			const OSlocalUserName = localStorage.getItem('OSlocalUserName');
			const OSlocalUserPassword = localStorage.getItem('OSlocalUserPassword');
			if (OSlocalUserName && OSlocalUserPassword) {
				const { code, data } = await UserApi.User_login({
					userName: OSlocalUserName,
					userPassword: OSlocalUserPassword,
				});
				if (code === 200 && data && data.length) {
					commit('storeLoginIn', data[0]);
				}
			}
        },
		// 已登录信息载入
		async storeLoadUserMsg({ state, getters, commit }) {
            const { code, data } = await UserApi.User_loginmsg({
                userId: sessionStorage.userId,
                userPassword: sessionStorage.userPassword
            });
			if (code === 200 && data && data.length) {
				commit('storeLoginIn', data[0]);
				return
			}
            commit('storeLoginOut');
		},
		// 用户登录方法
		async storeLogin({ state, getters, commit }, { name, password }) {
            const { code, data } = await UserApi.User_login({
                userName: name,
                userPassword: password,
            });
			if (code === 200 && data && data.length) {
				commit('storeLoginIn', data[0]);
			}
            return { code, data }
        },
		// 游客登录
		async storeVisitorLogin({ state, getters, commit }) {
            const { code, data } = await UserApi.User_login({
                userName: '游客',
                userPassword: '123456',
            });
			if (code === 200 && data && data.length) {
				commit('storeLoginIn', data[0]);
			}
            return { code, data }
        },
		// 用户登出
        async storeLogout({ state, getters, commit }, router) {
            if (confirm("确认退出？")) {
                const { code, data } = await UserApi.User_logout({ userId: state.userId, userName: state.userName, userPassword: state.userPassword })
                if (code === 200) {
                    router.push({ path: "/index" })
                    commit('storeLoginOut')
                }
                return { code, data };
            }
        },
    },
	modules: {
		OsAdmin,
	}
})