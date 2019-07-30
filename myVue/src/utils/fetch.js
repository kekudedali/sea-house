import A from 'axios';
import { Message } from 'element-ui';
import { goToLogout } from "./index";

const service = A.create({
    baseURL: '/api',
    timeout: 30000,
    withCredentials: true,
    cancelToken: new A.CancelToken(c => (A.requestCancel = c))
})

// 在 request 拦截器实现
service.interceptors.request.use(config => {
    return config;
}, error => {
    Promise.reject(error);
})

//在 response 拦截器实现
service.interceptors.response.use(
    response => {
        let res = response.data;
        if (res && res.result && res.result != "true") {
            Message.error(res.message || res.resultDesc || '请求失败');
            if (res.statusCode && res.statusCode == '-99') {
                goToLogout();
            }
            return Promise.reject(response);
        }
        return response;
    },
    error => {
        Message.closeAll();
        if (error.response && error.response.status === 401) {
            goToLogout();
        } else {
            Message.error(error.message);
        }
        return Promise.reject(error);
    }
)

export default service;