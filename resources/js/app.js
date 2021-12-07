import '../css/app.css'
import App from './App.vue'
// import Inbox from './inbox.vue'
// import Base from './base.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import Vue from 'vue'

Vue.config.productionTip = false

axios.defaults.baseURL = window.location.origin + "/api"

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.$http = axios

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
