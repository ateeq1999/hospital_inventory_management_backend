export default [
    {
        path: '/units',
        name: 'admin.units.index',
        component: () => import('../../views/units/Index.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/units/create',
        name: 'admin.units.create',
        component: () => import('../../views/units/Create.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/units/:id/edit',
        name: 'admin.units.edit',
        component: () => import('../../views/units/Edit.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/units/:id',
        name: 'admin.units.show',
        component: () => import('../../views/units/Show.vue'),
        meta: { authAdmin: true }
    },
]
  