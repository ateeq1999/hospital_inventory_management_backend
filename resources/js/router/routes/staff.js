export default [
    {
        path: '/staff',
        name: 'staff.index',
        component: () => import('../../views/staff/Index.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/staff/create',
        name: 'staff.create',
        component: () => import('../../views/staff/Create.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/staff/:id/edit',
        name: 'staff.edit',
        component: () => import('../../views/staff/Edit.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/staff/:id',
        name: 'staff.show',
        component: () => import('../../views/staff/Show.vue'),
        meta: { authAdmin: true }
    },
]
  