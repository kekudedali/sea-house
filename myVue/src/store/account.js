import { deCode, enCode } from "@/utils";
import md5 from '@/vendor/md5';

export const saveAccount = a => {
    let aKey = md5('app@a'),
        as = getAccounts();
    as[a] = { a };
    localStorage.setItem(aKey, enCode(JSON.stringify(as)));
};
export const getAccounts = () => {
    let aKey = md5('app@a'),
        oAs = localStorage.getItem(aKey);
    return oAs ? (() => {
        let d = JSON.parse(deCode(oAs));
        return (typeof d === 'object' && !(d instanceof Array)) ? d : {};
    })() : {};
};
export const savePassword = (a, p, o) => {
    let pKey = md5('app@p'),
        ps = getPasswords();
    if (!!p) ps[a] = { a, p, o };
    else delete ps[a];
    localStorage.setItem(pKey, enCode(JSON.stringify(ps)));
};
export const getPasswords = () => {
    // md5将密码解密
    let pKey = md5('app@p'),
        oPs = localStorage.getItem(pKey);
    return oPs ? (() => {
        // JSON.parse将JSON一样的字符串转化为JSON一样的对象
        let d = JSON.parse(deCode(oPs));
        return (typeof d === 'object' && !(d instanceof Array)) ? d : {};
    })() : {};
};
export default {
    getAccounts,
    getPasswords,
    savePassword,
    saveAccount
}



