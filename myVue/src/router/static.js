// const _import = require('router/_import_' + process.env.NODE_ENV);
import AppHome from "../views/index";
import Login from "../views/login/index";
import Home from "../views/home/index";

let app = {
	path: '/',
	name: 'AppHome',
	menuCode: '',
	component: AppHome,
	hidden: true,
	meta: {
		title: 'app',
		requiresAuth: false
	},
	noDropdown: true
}

let login = {
	path: '/login',
	name: 'login',
	menuCode: '',
	component: Login,
	hidden: true,
	meta: {
		title: '登陆',
		requiresAuth: false
	},
	noDropdown: true
}
let home = {
	path: '/home',
	name: 'home',
	menuCode: '',
	component: Home,
	hidden: true,
	meta: {
		title: '首页',
		requiresAuth: false
	},
	noDropdown: true
}


export default [app, login,home];
