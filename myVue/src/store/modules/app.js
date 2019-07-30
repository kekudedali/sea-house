import Cookies from 'js-cookie';

// 这个页面是利用dispatch提交actions解决异步问题
const app = {
    state: {
        appId: process.env.APP_ID,
        sidebar: {
            opened: !+Cookies.get('sidebarStatus')
        },
        theme: 'default',
        windowFocus: true,
    },
    // 突变
    mutations: {
        // 任何时候改变state的状态都通过提交 mutation 来改变
        // 里面可以定义多个函数，当触发这个函数就会改变state状态
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                // 接收一个state作为参数， 相当于上面的state
                // 模拟异步，状态会发生混乱
                Cookies.set('sidebarStatus', 1);
            } else {
                Cookies.set('sidebarStatus', 0);
            }
            state.sidebar.opened = !state.sidebar.opened;
        },
        SET_WINDOW_FOCUS: state => {
            state.windowFocus = true;
        },
        SET_WINDOW_BlUR: state => {
            state.windowFocus = false;
        }
    },
    actions: {
        // 解决上面异步问题需要利用vuex里面的actions
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR');
        },
        SetWindowFocus: ({ commit }) => {
            commit('SET_WINDOW_FOCUS');
        },
        SetWindowBlur: ({ commit }) => {
            commit('SET_WINDOW_BlUR');
        }
    }
};

export default app;