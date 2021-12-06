export default [
    {
        path: '/departments',
        name: 'departments.index',
        component: () => import('../../views/departments/Index.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/departments/create',
        name: 'departments.create',
        component: () => import('../../views/departments/Create.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/departments/:id/edit',
        name: 'departments.edit',
        component: () => import('../../views/departments/Edit.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/departments/:id',
        name: 'departments.show',
        component: () => import('../../views/departments/Show.vue'),
        meta: { authAdmin: true }
    },
]
  