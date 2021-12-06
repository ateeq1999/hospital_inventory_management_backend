const RESOURCE_ROUTE = 'staff'

const state = {
    staff: {},
    staffs: [],
    error: null,
    status: 'Loading',
}

const getters = {
    staff: state => state.staff,
    staffs: state => state.staffs,
    error: state => state.error,
}

const actions = {
    index({commit}){
        return new Promise((resolve, reject) => {
            $http.get(`/staff`)
            .then(resp => {
                const staffs = resp.data
                localStorage.setItem('staffs', JSON.stringify(staffs))
                commit('staffs_success', staffs)
                resolve(resp)
            })
            .catch(err => {
                commit('staff_error', err)
                localStorage.removeItem('staffs')
                reject(err)
            })
        })
    },
    show({commit}, staffId){
        return new Promise((resolve, reject) => {
            $http.get(`/staff/${staffId}`)
            .then(resp => {
                const staff = resp.data
                localStorage.setItem('staff', JSON.stringify(staff))
                commit('staff_success', staff)
                resolve(resp)
            })
            .catch(err => {
                commit('staff_error', err)
                localStorage.removeItem('staff')
                reject(err)
            })
        })
    },
    store({commit}, formData){
        return new Promise((resolve, reject) => {
            $http.post(`/staff`, formData)
            .then(resp => {
                commit('CREATE_SUCCESS', 'SUCCESS')
                resolve(resp)
            })
            .catch(err => {
                commit('staff_error', err)
                reject(err)
            })
        })
    },
    update({commit}, formData){
        console.log(formData)
        return new Promise((resolve, reject) => {
            $http.put(`/staff/${formData.id}`, formData)
            .then(resp => {
                const staff = resp.data

                localStorage.setItem('staff', JSON.stringify(staff))

                commit('staff_success', staff)

                resolve(resp)
            })
            .catch(err => {
                commit('staff_error', err)

                localStorage.removeItem('staff')
                
                reject(err)
            })
        })
    },
    delete({commit}, staffId){
        return new Promise((resolve, reject) => {
            $http.delete(`/staff/${staffId}`)
            .then(resp => {
                localStorage.removeItem('staff')
                
                resolve(resp)
            })
            .catch(err => {
                commit('staff_error', err)

                localStorage.removeItem('staff')

                reject(err)
            })
        })
    },
}

const mutations = {
  CREATE_SUCCESS(state, payload){
    state.status = payload
  },
  staff_error(state, error){
    state.error = error
  },
  staffs_success(state, payload){
    state.staffs = payload
  },
  staff_success(state, payload){
    state.staff = payload
  },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}