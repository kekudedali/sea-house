import Vue from 'vue';
import Router from 'vue-router';
import staticRouter from './static.js';
import Element from "element-ui";
// 页面进度条
// import NProgress from "nprogress";
Vue.use(Router);
export const constantRouterMap = [
  ...staticRouter
];

const router = new Router({
  mode: "hash",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

router.beforeEach((to, form, next) => {
  let requiresAuth = to.meta ? to.meta.requiresAuth : true;
  let rules = store.getters.rules;
  let user = store.getters.user;
  if (requiresAuth && !user) {
    next('/login');
  } else {
    if (to.path != '/login' && user && (!rules || rules.length <= 0)) {
      next();
    } else {
      if (to.matched.length === 0) {
        if (form.name) {
          Element.Message.error("地址有误");
        }else{
          next('/login');
        }
      }else{
        next()
      }
    }
  }
})


export default router;
