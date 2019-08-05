const _import = require('router/_import_' + process.env.NODE_ENV);

let app = {
    path: '/',
	name: 'AppHome',
	menuCode: '',
	component: _import('index'),
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
	component: _import('login/index'),
    hidden: true,
    meta: {
		title: '登陆',
		requiresAuth: false
	},
	noDropdown: true
}

let form = {
    path: '/form',
	name: 'form',
	menuCode: '',
	component: _import('form/index'),
    hidden: true,
    meta: {
		title: '表单',
		requiresAuth: false
	},
	noDropdown: true
}

export default [app, login, form];
