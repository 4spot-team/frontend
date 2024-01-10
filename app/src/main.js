import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

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
        { path: '/', component: HomePage },
        { path: '/home', component: HomePage },
        { path: '/login', component: LoginPage},
        { path: '/signup', component: SignupPage},
        { path: '/policies', component: PrivacyPage },
        { path: '/profile', component: ProfilePage },
        { path: '/explore', component: ExplorePage},
        { path: '/messages', component: MessagesPage},
        { path: '/notifications', component: NotificationsPage}
    ]
});

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');
