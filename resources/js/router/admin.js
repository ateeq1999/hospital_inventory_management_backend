import equipment from './routes/equipment'
import units from './routes/units'
import managers from './routes/managers'
import staff from './routes/staff'
import departments from './routes/departments'
import doctors from './routes/doctors'

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
  ...equipment,
  ...managers,
  ...staff,
  ...departments,
  ...doctors,
]
