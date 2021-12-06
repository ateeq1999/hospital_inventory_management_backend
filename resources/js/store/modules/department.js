const RESOURCE_ROUTE = 'departments'

const state = {
    department: {},
    departments: [],
    error: null,
    status: 'Loading',
}

const getters = {
    department: state => state.department,
    departments: state => state.departments,
    error: state => state.error,
}

const actions = {
    index({commit}){
        return new Promise((resolve, reject) => {
            $http.get(`/departments`)
            .then(resp => {
                const departments = resp.data
                localStorage.setItem('departments', JSON.stringify(departments))
                commit('departments_success', departments)
                resolve(resp)
            })
            .catch(err => {
                commit('departments_error', err)
                localStorage.removeItem('departments')
                reject(err)
            })
        })
    },
    show({commit}, departmentId){
        return new Promise((resolve, reject) => {
            $http.get(`/departments/${departmentId}`)
            .then(resp => {
                const department = resp.data
                localStorage.setItem('department', JSON.stringify(department))
                commit('department_success', department)
                resolve(resp)
            })
            .catch(err => {
                commit('departments_error', err)
                localStorage.removeItem('department')
                reject(err)
            })
        })
    },
    store({commit}, formData){
        return new Promise((resolve, reject) => {
            $http.post(`/departments`, formData)
            .then(resp => {
                commit('CREATE_SUCCESS', 'SUCCESS')
                resolve(resp)
            })
            .catch(err => {
                commit('departments_error', err)
                reject(err)
            })
        })
    },
    update({commit}, formData){
        console.log(formData)
        return new Promise((resolve, reject) => {
            $http.put(`/departments/${formData.id}`, formData)
            .then(resp => {
                const department = resp.data

                localStorage.setItem('department', JSON.stringify(department))

                commit('department_success', department)

                resolve(resp)
            })
            .catch(err => {
                commit('departments_error', err)

                localStorage.removeItem('department')
                
                reject(err)
            })
        })
    },
    delete({commit}, departmentId){
        return new Promise((resolve, reject) => {
            $http.delete(`/departments/${departmentId}`)
            .then(resp => {
                localStorage.removeItem('department')
                
                resolve(resp)
            })
            .catch(err => {
                commit('departments_error', err)

                localStorage.removeItem('department')

                reject(err)
            })
        })
    },
}

const mutations = {
  CREATE_SUCCESS(state, payload){
    state.status = payload
  },
  departments_error(state, error){
    state.error = error
  },
  department_success(state, payload){
    state.department = payload
  },
  departments_success(state, payload){
    state.departments = payload
  },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}