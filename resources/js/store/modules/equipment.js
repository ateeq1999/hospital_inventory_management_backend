const RESOURCE_ROUTE = 'equipments'

const state = {
    equipment: {},
    equipments: [],
    error: null,
    status: 'Loading',
}

const getters = {
    equipment: state => state.equipment,
    equipments: state => state.equipments,
    error: state => state.error,
}

const actions = {
    index({commit}){
        return new Promise((resolve, reject) => {
            $http.get(`${RESOURCE_ROUTE}`)
            .then(resp => {
                const equipments = resp.data
                localStorage.setItem('equipments', JSON.stringify(equipments))
                commit('equipments_success', equipments)
                resolve(resp)
            })
            .catch(err => {
                commit('equipment_error', err)
                localStorage.removeItem('equipments')
                reject(err)
            })
        })
    },
    show({commit}, unitId){
        return new Promise((resolve, reject) => {
            $http.get(`${RESOURCE_ROUTE}/${unitId}`)
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
            $http.post(`${RESOURCE_ROUTE}`, formData)
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
            $http.put(`${RESOURCE_ROUTE}/${formData.id}`, formData)
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
            $http.delete(`${RESOURCE_ROUTE}/${unitId}`)
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
  equipments_success(state, payload){
    state.equipments = payload
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