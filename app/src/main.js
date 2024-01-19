import { createApp, watch } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { useLoggedUser } from './states/loggedUser'

import App from './App.vue'
import LoginPage from './components/LoginPage.vue'
import SignupPage from './components/SignupPage.vue'
import PrivacyPage from './components/PrivacyPage.vue'
import HomePage from './components/HomePage.vue'
import ProfilePage from './components/ProfilePage.vue'
import ExplorePage from './components/ExplorePage.vue'
import MessagesPage from './components/MessagesPage.vue'
import NotificationsPage from './components/NotificationsPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage, meta: { requiresAuth: true } },
        { path: '/home', component: HomePage, meta: { requiresAuth: true } },
        { path: '/login', component: LoginPage, meta: { requiresAuth: false }},
        { path: '/signup', component: SignupPage, meta: { requiresAuth: false }},
        { path: '/policies', component: PrivacyPage, meta: { requiresAuth: false } },
        { path: '/profile', component: ProfilePage, meta: { requiresAuth: true } },
        { path: '/explore', component: ExplorePage, meta: { requiresAuth: true }},
        { path: '/messages', component: MessagesPage, meta: { requiresAuth: true }},
        { path: '/notifications', component: NotificationsPage, meta: { requiresAuth: true }}
    ]
});



// Local Storage
const pinia = createPinia();
watch(
    pinia.state,
    (state) => {
        localStorage.setItem('user', JSON.stringify(state.user));
    },
    { deep: true }
);

// MOUNT
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');

// First frontend check of token
const loggedUser = useLoggedUser();

router.beforeEach((to) => {
    if (to.meta.requiresAuth && !loggedUser.isAuthenticated()) {
        return {
            path: '/login',
            // save the location we were at to come back later
            query: { redirect: to.fullPath }
        }
    }
});