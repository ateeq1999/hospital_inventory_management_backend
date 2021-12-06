const RESOURCE_ROUTE = 'doctors'

const state = {
    doctor: {},
    doctors: [],
    error: null,
    status: 'Loading',
}

const getters = {
    doctor: state => state.doctor,
    doctors: state => state.doctors,
    error: state => state.error,
}

const actions = {
    index({commit}){
        return new Promise((resolve, reject) => {
            $http.get(`/doctors`)
            .then(resp => {
                const doctors = resp.data
                localStorage.setItem('doctors', JSON.stringify(doctors))
                commit('doctors_success', doctors)
                resolve(resp)
            })
            .catch(err => {
                commit('doctors_error', err)
                localStorage.removeItem('doctors')
                reject(err)
            })
        })
    },
    show({commit}, itemId){
        return new Promise((resolve, reject) => {
            $http.get(`/doctors/${itemId}`)
            .then(resp => {
                const doctor = resp.data
                localStorage.setItem('doctor', JSON.stringify(doctor))
                commit('doctor_success', doctor)
                resolve(resp)
            })
            .catch(err => {
                commit('doctors_error', err)
                localStorage.removeItem('doctor')
                reject(err)
            })
        })
    },
    store({commit}, formData){
        return new Promise((resolve, reject) => {
            $http.post(`/doctors`, formData)
            .then(resp => {
                commit('CREATE_SUCCESS', 'SUCCESS')
                resolve(resp)
            })
            .catch(err => {
                commit('doctors_error', err)
                reject(err)
            })
        })
    },
    update({commit}, formData){
        console.log(formData)
        return new Promise((resolve, reject) => {
            $http.put(`/doctors/${formData.id}`, formData)
            .then(resp => {
                const doctor = resp.data

                localStorage.setItem('doctor', JSON.stringify(doctor))

                commit('doctor_success', doctor)

                resolve(resp)
            })
            .catch(err => {
                commit('doctors_error', err)

                localStorage.removeItem('doctor')
                
                reject(err)
            })
        })
    },
    delete({commit}, itemId){
        return new Promise((resolve, reject) => {
            $http.delete(`/doctors/${itemId}`)
            .then(resp => {
                localStorage.removeItem('doctor')
                
                resolve(resp)
            })
            .catch(err => {
                commit('doctors_error', err)

                localStorage.removeItem('doctor')

                reject(err)
            })
        })
    },
}

const mutations = {
  CREATE_SUCCESS(state, payload){
    state.status = payload
  },
  doctors_error(state, error){
    state.error = error
  },
  doctor_success(state, payload){
    state.doctor = payload
  },
  doctors_success(state, payload){
    state.doctors = payload
  },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}