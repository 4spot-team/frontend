import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import LoginPage from './components/LoginPage.vue'
import SignupPage from './components/SignupPage.vue'
import PrivacyPage from './components/PrivacyPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: LoginPage },
        { path: '/login', component: LoginPage},
        { path: '/signup', component: SignupPage},
        { path: '/policies', component: PrivacyPage }
    ]
});

const app = createApp(App);
app.use(router);
app.mount('#app');

