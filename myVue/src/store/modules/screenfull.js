
const isfull = {
    state: {
        isfull: false
    },
    mutations: {
        OPEN_SCREENFULL: (state, data) => {
            state.isfull = true;
        },
        CLOSE_SCREENFULL: (state, data) => {
            state.isfull = false;
        }
    },
    actions: {
        openScreenfull({commit}) {
            commit('OPEN_SCREENFULL');
        },
        closeScreenfull({commit}) {
            commit('CLOSE_SCREENFULL');
        },
    }
}

export default isfull