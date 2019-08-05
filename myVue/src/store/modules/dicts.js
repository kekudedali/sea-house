import { getDictsExceptCity, getDicts } from '@/api/common/dicts';

const DICT = {
    state: {
        dicts: null,
        cities: null
    },

    mutations: {
        SET_DICTS: (state, dicts) => {
            state.dicts = dicts;
        },
        SET_CITIES: (state, cities) => {
            state.cities = cities;
        }
    },

    actions: {
        SetDicts({ commit }) {
            const dict = new Promise((resolve, reject) => {
                getDictsExceptCity().then(({ data: { data, result } }) => {
                    if (result == "true") {
                        commit("SET_DICTS", data);
                        resolve();
                    }
                }).catch(err => {
                    console.log("获取数据字典失败");
                });
            });
            const city = new Promise((resolve, reject) => {
                getDicts().then(({ data: { data, result } }) => {
                    if (result == "true") {
						commit('SET_CITIES', data);
						resolve();
                    }
                }).catch(err => {
                    console.log("获取省份信息失败");
                });
            });
            return Promise.all([dict, city]);
        }
    }
};

export default DICT;
