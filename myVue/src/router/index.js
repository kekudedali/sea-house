import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/views/login/index';
import Element from "element-ui";
import http from "axios/index";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect:"login",
    },
    {
      path: '/login',
      name: 'login',
      menuCode: '',
      component:Login,
      hidden:false,
      meta:{
        title:'登陆',
        requiresAuth:false
      },
      noDropdown: true
    }
  ]
})

export default router;
