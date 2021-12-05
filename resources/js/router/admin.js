import equipment from './routes/equipment'
import units from './routes/units'

export default [
  {
    path: '/login',
    name: 'admin.login',
    component: () => import('../views/auth/Login.vue'),
    meta: { authAdmin: false }
  },
  {
    path: '/',
    name: 'admin.dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { authAdmin: true },
  },
  ...units,
  ...equipment
]
