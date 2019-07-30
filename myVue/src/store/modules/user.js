import { Message } from 'element-ui';
import loginApi from '@/api/common/login';
import { goToLogout } from "@/utils";
import Cookies from 'js-cookie';

const user = {
    state: {
        user: null,
        rules: []
    },

    mutations: {
        SET_USER: (state, user) => {
            state.user = user;
        },
        SET_RULES: (state, roles) => {
            state.rules = [...(roles || []), 'default'];
        }
    },

    actions: {
        // 设置用户信息
        SetUserInfo({ commit }) {
            let userInfo = Cookies.get('userInfo');
			if (userInfo) {
				commit("SET_USER", JSON.parse(userInfo));
			}
        },
        // 获取权限信息
        GetRules({ commit }) {
            return new Promise((resolve, reject) => {
                // loginApi.getRules().then(({ data }) => {
				// 	let roles = [];
                //     if (data.result === 'true') {
                //         if (data.data && data.data.length > 0) {
                //             data.data.map(item => roles.push(item.menuCode));
                //             commit("SET_RULES", roles);
                //         } else {
                //             Message.error('该角色没有菜单信息');
                //             reject();
                //         }
                //     } else {
                //         Message.error('获取菜单权限失败');
                //         reject();
                //     }
                //     resolve();
                // }).catch(err => reject(err))
            })
        }
    }
};

export default user;
