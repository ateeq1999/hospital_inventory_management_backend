const RESOURCE_ROUTE = 'orders'

const state = {
    order: {},
    orders: [],
    error: null,
    status: 'Loading',
}

const getters = {
    order: state => state.order,
    orders: state => state.orders,
    error: state => state.error,
}

const actions = {
    index({commit}){
        return new Promise((resolve, reject) => {
            $http.get(`/orders`)
            .then(resp => {
                const orders = resp.data
                localStorage.setItem('orders', JSON.stringify(orders))
                commit('orders_success', orders)
                resolve(resp)
            })
            .catch(err => {
                commit('orders_error', err)
                localStorage.removeItem('orders')
                reject(err)
            })
        })
    },
    show({commit}, itemId){
        return new Promise((resolve, reject) => {
            $http.get(`/orders/${itemId}`)
            .then(resp => {
                const order = resp.data
                localStorage.setItem('order', JSON.stringify(order))
                commit('order_success', order)
                resolve(resp)
            })
            .catch(err => {
                commit('orders_error', err)
                localStorage.removeItem('order')
                reject(err)
            })
        })
    },
    store({commit}, formData){
        return new Promise((resolve, reject) => {
            $http.post(`/orders`, formData)
            .then(resp => {
                commit('CREATE_SUCCESS', 'SUCCESS')
                resolve(resp)
            })
            .catch(err => {
                commit('orders_error', err)
                reject(err)
            })
        })
    },
    update({commit}, formData){
        console.log(formData)
        return new Promise((resolve, reject) => {
            $http.put(`/orders/${formData.id}`, formData)
            .then(resp => {
                const order = resp.data

                localStorage.setItem('order', JSON.stringify(order))

                commit('order_success', order)

                resolve(resp)
            })
            .catch(err => {
                commit('orders_error', err)

                localStorage.removeItem('order')
                
                reject(err)
            })
        })
    },
    delete({commit}, itemId){
        return new Promise((resolve, reject) => {
            $http.delete(`/orders/${itemId}`)
            .then(resp => {
                localStorage.removeItem('order')
                
                resolve(resp)
            })
            .catch(err => {
                commit('orders_error', err)

                localStorage.removeItem('order')

                reject(err)
            })
        })
    },
}

const mutations = {
  CREATE_SUCCESS(state, payload){
    state.status = payload
  },
  orders_error(state, error){
    state.error = error
  },
  order_success(state, payload){
    state.order = payload
  },
  orders_success(state, payload){
    state.orders = payload
  },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}