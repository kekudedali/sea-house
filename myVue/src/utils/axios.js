import axios from 'axios';
import { Message } from 'element-ui';
import router from "../router";
import Cookies from 'js-cookie';
// import api from '@/api/common/login';


const service = axios.create({
    baseURL: "",
    timeout: 30000,
    withCredentials: true,
    cancelToken: new A.CancelToken(c => (A.requestCancel = c))
})

service.interceptors.request.use(config => {
    return config;
}, error => {
    Promise.reject(error);
});

service.interceptors.response.use(
    response => {
        let res = response.data;
        if (res && res.result && res.result != 'true'){
            Message.error(res.Message || res.resultDesc || '请求失败');
            if(res.statusCode && res.statusCode == '-99'){

            }
            return Promise.reject(response);
        }
        return response;
    },
    error=>{
        Message.closeAll();
        if(error.response&& error.response.status === 401){

        }else{
            Message.error(error.message);
        }
        return Promise.reject(error);
    }
)

export default service;
