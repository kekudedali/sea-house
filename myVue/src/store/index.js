require('es6-promise').polyfill();
import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import dataPersistence from './modules/dataPersistence';
import screenfull from './modules/screenfull';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        app,
        user,
        dataPersistence,
        screenfull,
    },
})

export default store;