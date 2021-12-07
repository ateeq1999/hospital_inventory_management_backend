import Vue from "vue";
import Vuex from "vuex";
import auth from './modules/auth'
import admin from './modules/admin'
import unit from './modules/unit'
import manager from './modules/manager'
import equipment from './modules/equipment'
import staff from './modules/staff'
import department from './modules/department'
import doctor from './modules/doctor'
import order from './modules/order'

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
    Equipment: equipment,
    Manager: manager,
    Staff: staff,
    Department: department,
    Doctor: doctor,
    Order: order,
  }
})
