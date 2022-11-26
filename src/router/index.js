import { createWebHistory, createRouter } from 'vue-router';
import StationeryShop from '@/views/StationeryShop.vue';
const routes = [
    {
        path: '/',
        name: 'stationeryshop',
        component: StationeryShop,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;