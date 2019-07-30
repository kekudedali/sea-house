import fetch from '@/utils/fetch';

export default {
    // 登出
    logout(){
        return fetch({
            baseURL,
            url: '/auth/logout',
			method: 'get'
        })
    }
}