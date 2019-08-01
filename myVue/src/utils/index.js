import { Message } from 'element-ui';
import '@/vendor/base64';
import '@/vendor/jsencrypt';
import router from "../router";
import Cookies from 'js-cookie';
import api from '@/api/common/login';


/**
 * 获取编码时间
 * @param target
 * @returns {*}
 */
export const getCodeTime = target => {
    let str = Base64.decode((target + '').slice(12, -6)),
        index = str.indexOf('@');
    return str.slice(index + 1);
};
/**
 * 退出登录
 * @param isMessage
 */
export const goToLogout = (isMessage) => {
    if (window.location.hash.indexOf('#/login') === -1) {
        if (Cookies.get('userInfo')) {
            Cookies.remove('userInfo');
            api.logout().then(({ data }) => {
                isMessage && Message.info('请登录');
                router.push('/login');
            }).catch(() => { });
        } else {
            isMessage && Message.info('请登录');
            router.push('/login')
        }
    }
}

/**
 * 解码
 * @param target
 * @returns {*}
 */
export const deCode = target => {
    // Base64加密解密
    let str = Base64.decode((target + '').slice(12, -6)),
        index = str.indexOf('@');
    return str.slice(0, index);
};

/**
 * 编码
 * @param target
 * @returns {string}
 */
export const enCode = target => {
    return `MTIzMjEzMjEz${Base64.encode(target + '@' + new Date().getTime())}MTIzMj`;
};

/**
 * 获取url的domain
 * @param url
 * @returns {*}
 */
export const getUrlDomain = (url) => {
    let a;
    try {
        let u = url.split('?')[0].split('//');
        a = u[0] + '//' + u[1].split('/')[0];
    } catch (e) {
        console.log('url error');
    }
    return a;
};