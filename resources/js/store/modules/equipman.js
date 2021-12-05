const state = {
    equipman: {},
    equipmen: [],
    error: null,
    status: 'Loading',
}

const getters = {
    equipman: state => state.equipman,
    equipmen: state => state.equipmen,
    error: state => state.error,
}

const actions = {
    index({commit}){
        return new Promise((resolve, reject) => {
            $http.get('/equipmen')
            .then(resp => {
                const equipmen = resp.data
                localStorage.setItem('equipmen', JSON.stringify(equipmen))
                commit('equipmen_success', equipmen)
                resolve(resp)
            })
            .catch(err => {
                commit('equipmen_error', err)
                localStorage.removeItem('equipmen')
                reject(err)
            })
        })
    },
    show({commit}, unitId){
        return new Promise((resolve, reject) => {
            $http.get(`/equipmen/${unitId}`)
            .then(resp => {
                const equipman = resp.data
                localStorage.setItem('equipman', JSON.stringify(equipman))
                commit('equipman_success', equipman)
                resolve(resp)
            })
            .catch(err => {
                commit('equipmen_error', err)
                localStorage.removeItem('equipman')
                reject(err)
            })
        })
    },
    store({commit}, formData){
        return new Promise((resolve, reject) => {
            $http.post(`/equipmen`, formData)
            .then(resp => {
                commit('CREATE_SUCCESS', 'SUCCESS')
                resolve(resp)
            })
            .catch(err => {
                commit('equipmen_error', err)
                reject(err)
            })
        })
    },
    update({commit}, formData){
        console.log(formData)
        return new Promise((resolve, reject) => {
            $http.put(`/equipmen/${formData.id}`, formData)
            .then(resp => {
                const equipman = resp.data

                localStorage.setItem('equipman', JSON.stringify(equipman))

                commit('equipman_success', equipman)

                resolve(resp)
            })
            .catch(err => {
                commit('equipmen_error', err)

                localStorage.removeItem('equipman')
                
                reject(err)
            })
        })
    },
    delete({commit}, unitId){
        return new Promise((resolve, reject) => {
            $http.delete(`/equipmen/${unitId}`)
            .then(resp => {
                localStorage.removeItem('equipman')
                
                resolve(resp)
            })
            .catch(err => {
                commit('equipmen_error', err)

                localStorage.removeItem('equipman')

                reject(err)
            })
        })
    },
}

const mutations = {
  CREATE_SUCCESS(state, payload){
    state.status = payload
  },
  equipmen_error(state, error){
    state.error = error
  },
  equipman_success(state, payload){
    state.equipman = payload
  },
  equipmen_success(state, payload){
    state.equipmen = payload
  },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}