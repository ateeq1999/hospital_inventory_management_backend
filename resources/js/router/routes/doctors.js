export default [
    {
        path: '/doctors',
        name: 'doctors.index',
        component: () => import('../../views/doctors/Index.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/doctors/create',
        name: 'doctors.create',
        component: () => import('../../views/doctors/Create.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/doctors/:id/edit',
        name: 'doctors.edit',
        component: () => import('../../views/doctors/Edit.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/doctors/:id',
        name: 'doctors.show',
        component: () => import('../../views/doctors/Show.vue'),
        meta: { authAdmin: true }
    },
]
  