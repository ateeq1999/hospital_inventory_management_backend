import Vue from "vue";
import Vuex from "vuex";
import auth from './modules/auth'
import admin from './modules/admin'
import unit from './modules/unit'

Vue.use(Vuex)

const state = {
}
const getters = {
}
const actions = {
}
const mutations = {
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    Auth: auth,
    Admin: admin,
    Unit: unit,
  }
})
