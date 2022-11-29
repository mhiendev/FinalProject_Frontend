import { createWebHistory, createRouter } from 'vue-router';
import StationeryShop from '@/views/StationeryShop.vue';
const routes = [
    {
        path: '/',
        name: 'stationeryshop',
        component: StationeryShop,
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/views/NotFound.vue'),
    },

    {
        path: '/product',
        name: 'product.add',
        component: () => import('@/views/StationeryAdd.vue'),
        
    },

    {
        path: '/products/:id',
        name: 'product.edit',
        component: () => import('@/views/ProductEdit.vue'),
        props: (route) => ({ productId: parseInt(route.params.id) })
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;