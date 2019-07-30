//绑定localstore
import store from "storejs";
import Vue from 'vue';

const dataPersistence = {
    state: {
        localStore: store.get()
    },
    mutations: {
        SET_LOCALSTORE: (state, data) => {
            Vue.set(state.localStore, data.title, data.data);
        },
        DEL_LOCALSTORE: (state, title) => {
            Vue.delete(state.localStore, title)
        },
        CLEAR_LOCALSTORE: (state)=> {
            state.localStore = {};
        }
    },
    actions: {
        SetLocalStore({commit}, data) {
            if(!data.title) {
                console.error('必须要有title属性!')
                return 0;
            }
            return new Promise(resolve => {
                store.set(data.title, data.data);
                commit('SET_LOCALSTORE', data);
                resolve();
            })
        },
        DelLocalStore({commit}, title) {
            return new Promise(resolve => {
                if(title) {
                    store.remove(title);
                    commit('DEL_LOCALSTORE',title);
                } else {
                    store.clear();
                    commit('CLEAR_LOCALSTORE');
                }
                resolve();
            })
        }
    }
}

export default dataPersistence