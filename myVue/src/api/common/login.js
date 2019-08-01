import fetch from '@/utils/fetch';

export default {
    // 获取图形验证码
    getCheckCodeImg() {
        return fetch({
            baseURL,
            url: `/auth/captcha`,
            method: 'get'
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