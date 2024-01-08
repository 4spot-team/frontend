import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import LoginPage from './components/LoginPage.vue'
import SignupPage from './components/SignupPage.vue'
import PrivacyPage from './components/PrivacyPage.vue'
import HomePage from './components/HomePage.vue'
import ContainerHeader from './components/ContainerHeader.vue'
import ContainerNavlist from './components/ContainerNavlist.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/home', component: HomePage },
        { path: '/login', component: LoginPage},
        { path: '/signup', component: SignupPage},
        { path: '/policies', component: PrivacyPage },
        { path: '/header', component: ContainerHeader },
        { path: '/nav', component: ContainerNavlist }
    ]
});

const app = createApp(App);
app.use(router);
app.mount('#app');
