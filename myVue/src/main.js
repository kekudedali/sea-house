import Vue from 'vue';
import Element from 'element-ui';
import App from './App';
import router from './router';
import errLog from './store/errLog';  // error log组件
import vueWaves from './directive/waves';// 水波纹指令
import store from './store';
import 'assets/iconfont/iconfont'; // iconfont 
import 'assets/iconfont/iconfont.css'; //iconfont 的css加入形式
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false

/**
  * 获取Cookies中的登录信息
  */

function modulesInit() {
  Vue.use(Element);
  Vue.use(vueWaves);
  if (process.env.NODE_ENV === 'production') {
    Vue.config.errorHandler = function (err, vm) {
      console.log(err, window.location.href);
      errLog.pushLog({
        err,
        url: window.location.href,
        vm
      })
    }
  }
  /**
	 * 获取Cookies中的登录信息
	 */
  store.dispatch('SetUserInfo');
  /**
   * 锐明视频服务参数初始化
   */
}

function instanceInit() {
  new Vue({
    router,
    store,
    data() {
      return {
        title: "kkkkk"
      }
    },
    render: h => h(App)
  }).$mount("#app")
  document.title = 'sea house';
}

function globalEventInit() {
  //浏览器切换事件
  document.addEventListener('visibilitychange', function () {
    //状态判断
    if (document.visibilityState == 'hidden') {
      store.dispatch('SetWindowBlur');
    } else {
      store.dispatch('SetWindowFocus');
    }
  })
}

function done() {
  modulesInit();
  instanceInit();
  globalEventInit();
}
done();