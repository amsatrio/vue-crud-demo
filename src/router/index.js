import CounterView from '@/views/CounterView.vue';
import IndexView from '@/views/IndexView.vue';
import TodoView from '@/views/TodoView.vue';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: IndexView
        },
        {
            path: '/counter',
            name: 'counter',
            component: CounterView
        },
        {
            path: '/todo',
            name: 'todo',
            component: TodoView
        }
    ]
});

export default router;