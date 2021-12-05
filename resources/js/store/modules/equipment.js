const state = {
    equipment: {},
    equipment: [],
    error: null,
    status: 'Loading',
}

const getters = {
    equipment: state => state.equipment,
    equipment: state => state.equipment,
    error: state => state.error,
}

const actions = {
    index({commit}){
        return new Promise((resolve, reject) => {
            $http.get('/equipment')
            .then(resp => {
                const equipment = resp.data
                localStorage.setItem('equipment', JSON.stringify(equipment))
                commit('equipment_success', equipment)
                resolve(resp)
            })
            .catch(err => {
                commit('equipment_error', err)
                localStorage.removeItem('equipment')
                reject(err)
            })
        })
    },
    show({commit}, unitId){
        return new Promise((resolve, reject) => {
            $http.get(`/equipment/${unitId}`)
            .then(resp => {
                const equipment = resp.data
                localStorage.setItem('equipment', JSON.stringify(equipment))
                commit('equipment_success', equipment)
                resolve(resp)
            })
            .catch(err => {
                commit('equipment_error', err)
                localStorage.removeItem('equipment')
                reject(err)
            })
        })
    },
    store({commit}, formData){
        return new Promise((resolve, reject) => {
            $http.post(`/equipment`, formData)
            .then(resp => {
                commit('CREATE_SUCCESS', 'SUCCESS')
                resolve(resp)
            })
            .catch(err => {
                commit('equipment_error', err)
                reject(err)
            })
        })
    },
    update({commit}, formData){
        console.log(formData)
        return new Promise((resolve, reject) => {
            $http.put(`/equipment/${formData.id}`, formData)
            .then(resp => {
                const equipment = resp.data

                localStorage.setItem('equipment', JSON.stringify(equipment))

                commit('equipment_success', equipment)

                resolve(resp)
            })
            .catch(err => {
                commit('equipment_error', err)

                localStorage.removeItem('equipment')
                
                reject(err)
            })
        })
    },
    delete({commit}, unitId){
        return new Promise((resolve, reject) => {
            $http.delete(`/equipment/${unitId}`)
            .then(resp => {
                localStorage.removeItem('equipment')
                
                resolve(resp)
            })
            .catch(err => {
                commit('equipment_error', err)

                localStorage.removeItem('equipment')

                reject(err)
            })
        })
    },
}

const mutations = {
  CREATE_SUCCESS(state, payload){
    state.status = payload
  },
  equipment_error(state, error){
    state.error = error
  },
  equipment_success(state, payload){
    state.equipment = payload
  },
  equipment_success(state, payload){
    state.equipment = payload
  },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}