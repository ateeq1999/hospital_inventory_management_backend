export default [
    {
        path: '/managers',
        name: 'managers.index',
        component: () => import('../../views/managers/Index.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/managers/create',
        name: 'managers.create',
        component: () => import('../../views/managers/Create.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/managers/:id/edit',
        name: 'managers.edit',
        component: () => import('../../views/managers/Edit.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/managers/:id',
        name: 'managers.show',
        component: () => import('../../views/managers/Show.vue'),
        meta: { authAdmin: true }
    },
]
  