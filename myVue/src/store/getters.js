const getters = {
    appId: state => state.app.appId,
    sidebar: state => state.app.sidebar,
    user: state => state.user.user,
    rules: state => state.user.rules,
    dicts: state => state.dicts.dicts,
    cities: state => state.dicts.cities,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    localStore: state => state.dataPersistence.localStore,
    screenfull: state => state.screenfull.isfull,
    theme: state => state.app,
    //网约车
    //所有公司
    companys: state => state.netcar.companys,
    cCompanys: state => state.netcar.cCompanys,
    //出租车车辆Hash
    taxiVehicleHash: state => state.taxi.vehicleHash
};
export default getters
