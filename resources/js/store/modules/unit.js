const state = {
    unit: {},
    units: [],
    error: null,
}

const getters = {
    unit: state => state.unit,
    units: state => state.units,
    error: state => state.error,
}

const actions = {
    getUnits({commit}){
        return new Promise((resolve, reject) => {
            $htp.get('/units')
            .then(resp => {
                const units = resp.data.units
                localStorage.setItem('units', JSON.stringify(units))
                commit('UNITS_SUCCESS', units)
                resolve(resp)
            })
            .catch(err => {
                commit('UNIT_ERROR', err)
                localStorage.removeItem('units')
                reject(err)
            })
        })
    },
    getUnit({commit}, unitId){
        return new Promise((resolve, reject) => {
            $htp.get(`/units/${unitId}`)
            .then(resp => {
                const unit = resp.data.unit
                localStorage.setItem('unit', JSON.stringify(unit))
                commit('UNIT_SUCCESS', unit)
                resolve(resp)
            })
            .catch(err => {
                commit('UNIT_ERROR', err)
                localStorage.removeItem('unit')
                reject(err)
            })
        })
    },
}

const mutations = {
  UNIT_ERROR(state, error){
    state.error = error
  },
  UNIT_SUCCESS(state, payload){
    state.unit = payload
  },
  UNITS_SUCCESS(state, payload){
    state.units = payload
  },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}