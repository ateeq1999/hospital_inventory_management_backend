import axios from 'axios'

const state = {
  auth_user: JSON.parse(localStorage.getItem('auth')) || {},
  auth_token: localStorage.getItem('token') || '',
  auth_status: 'guest',
}

const getters = {
  isLoggedIn: state => !!state.auth_token,
  auth_user: state => state.auth_user,
}

const actions = {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post('/auth/admin/login', user)
        .then(resp => {
          const token = resp.data.token
          const auth = resp.data.admin
          localStorage.setItem('token', token)
          localStorage.setItem('auth', JSON.stringify(auth))
          commit('auth_success', token, auth)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        try {
          commit('/auth/admin/logout')
          localStorage.clear();
          delete axios.defaults.headers.common['Authorization']
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
}

const mutations = {
  auth_request(state){
    state.auth_status = 'loading'
  },
  auth_error(state){
    state.auth_status = 'error'
  },
  auth_success(state, token, user){
    state.auth_status = 'auth'
    state.auth_token = token
    state.auth_user = user
  },
  logout(state){
    state.auth_status = 'guest'
    state.auth_token = ''
    state.auth_user = null
  },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}