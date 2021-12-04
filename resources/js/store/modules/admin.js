import axios from 'axios'

const state = {
  admin_user: JSON.parse(localStorage.getItem('admin')) || {},
  admin_token: localStorage.getItem('token') || '',
  admin_status: 'guest',
}

const getters = {
  isLoggedIn: state => !!state.admin_token,
  admin_user: state => state.admin_user,
}

const actions = {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('admin_request')
        axios.post('/admin/login', user)
        .then(resp => {
          const token = resp.data.token
          const admin = resp.data.user
          localStorage.setItem('token', token)
          localStorage.setItem('admin', JSON.stringify(admin))
          commit('admin_success', token, admin)
          resolve(resp)
        })
        .catch(err => {
          commit('admin_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        try {
          commit('logout')
          localStorage.clear();
          delete axios.defaults.headers.common['authorization']
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
}

const mutations = {
  admin_request(state){
    state.admin_status = 'loading'
  },
  admin_error(state){
    state.admin_status = 'error'
  },
  admin_success(state, token, user){
    state.admin_status = 'admin'
    state.admin_token = token
    state.admin_user = user
  },
  logout(state){
    state.admin_status = 'guest'
    state.admin_token = ''
    state.admin_user = null
  },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}