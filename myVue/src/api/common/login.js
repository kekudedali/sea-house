import fetch from '@/utils/fetch';
import { baseUrl } from "@/utils/urls";
export default {
    // 获取图形验证码
    getCheckCodeImg() {
        return fetch({
            baseURL,
            url: `/auth/captcha`,
            method: 'get'
        })
    },
    //登陆
    login(data) {
        return fetch({
            baseUrl,
            url: `auth/loginPost`,
            method: "post",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data
        })
    },
    //获取菜单信息
    getRules() {
        return fetch({
            baseUrl,
            url: `/AuthMenu/queryUserMenu`,
            method: 'get',
        })
    },
    // 登出
    logout() {
        return fetch({
            baseURL,
            url: '/auth/logout',
            method: 'get'
        })
    }
}