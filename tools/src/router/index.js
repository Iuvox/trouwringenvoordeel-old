import { createRouter, createWebHistory } from 'vue-router'
import { useMain } from '../store/main'

const router = createRouter({
    routes: [{
            name: 'Home',
            path: '/',
            component: () =>
                import ('/src/views/HomeView.vue')
        },
        {
            name: 'Referral',
            path: '/referral',
            meta: {
                auth: true
            },
            component: () =>
                import ('/src/views/ReferralView.vue')
        },
        {
            name: 'Login',
            path: '/login',
            component: () =>
            import ('/src/views/LoginView.vue')
        }
    ],
    history: createWebHistory()
})

router.beforeEach((to, from) => {
    const main = useMain()

    if ('auth' in to.meta && to.meta.auth === true && main.loggedIn === false) {
        return {
            name: 'Login',
            query: {
                redirect_to: to.path
            }
        }
    }
})

export default router