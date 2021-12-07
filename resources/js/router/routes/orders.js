export default [
    {
        path: '/orders',
        name: 'orders.index',
        component: () => import('../../views/orders/Index.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/orders/create',
        name: 'orders.create',
        component: () => import('../../views/orders/Create.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/orders/:id/edit',
        name: 'orders.edit',
        component: () => import('../../views/orders/Edit.vue'),
        meta: { authAdmin: true }
    },
    {
        path: '/orders/:id',
        name: 'orders.show',
        component: () => import('../../views/orders/Show.vue'),
        meta: { authAdmin: true }
    },
]
  