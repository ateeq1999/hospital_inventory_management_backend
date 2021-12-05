export default [
    {
        path: '/equipment',
        name: 'equipment.index',
        component: () => import('../../views/equipment/Index.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/equipment/create',
        name: 'equipment.create',
        component: () => import('../../views/equipment/Create.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/equipment/:id/edit',
        name: 'equipment.edit',
        component: () => import('../../views/equipment/Edit.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/equipment/:id',
        name: 'equipment.show',
        component: () => import('../../views/equipment/Show.vue'),
        meta: { authAdmin: true }
    },
]
  