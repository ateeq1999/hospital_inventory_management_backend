const state = {
    manager: {},
    managers: [],
    error: null,
    status: 'Loading',
}

const getters = {
    manager: state => state.manager,
    managers: state => state.managers,
    error: state => state.error,
}

const actions = {
    index({commit}){
        return new Promise((resolve, reject) => {
            $http.get('/managers')
            .then(resp => {
                const managers = resp.data
                localStorage.setItem('managers', JSON.stringify(managers))
                commit('managers_success', managers)
                resolve(resp)
            })
            .catch(err => {
                commit('managers_error', err)
                localStorage.removeItem('managers')
                reject(err)
            })
        })
    },
    show({commit}, managerId){
        return new Promise((resolve, reject) => {
            $http.get(`/managers/${managerId}`)
            .then(resp => {
                const manager = resp.data
                localStorage.setItem('manager', JSON.stringify(manager))
                commit('manager_success', manager)
                resolve(resp)
            })
            .catch(err => {
                commit('managers_error', err)
                localStorage.removeItem('manager')
                reject(err)
            })
        })
    },
    store({commit}, formData){
        return new Promise((resolve, reject) => {
            $http.post(`/managers`, formData)
            .then(resp => {
                commit('CREATE_SUCCESS', 'SUCCESS')
                resolve(resp)
            })
            .catch(err => {
                commit('managers_error', err)
                reject(err)
            })
        })
    },
    update({commit}, formData){
        console.log(formData)
        return new Promise((resolve, reject) => {
            $http.put(`/managers/${formData.id}`, formData)
            .then(resp => {
                const manager = resp.data

                localStorage.setItem('manager', JSON.stringify(manager))

                commit('manager_success', manager)

                resolve(resp)
            })
            .catch(err => {
                commit('managers_error', err)

                localStorage.removeItem('manager')
                
                reject(err)
            })
        })
    },
    delete({commit}, managerId){
        return new Promise((resolve, reject) => {
            $http.delete(`/managers/${managerId}`)
            .then(resp => {
                localStorage.removeItem('manager')
                
                resolve(resp)
            })
            .catch(err => {
                commit('managers_error', err)

                localStorage.removeItem('manager')

                reject(err)
            })
        })
    },
}

const mutations = {
  CREATE_SUCCESS(state, payload){
    state.status = payload
  },
  managers_error(state, error){
    state.error = error
  },
  manager_success(state, payload){
    state.manager = payload
  },
  managers_success(state, payload){
    state.managers = payload
  },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}