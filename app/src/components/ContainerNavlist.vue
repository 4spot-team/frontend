<template>
    <div id="nav">
        <div class="navList">
            <NavlistButton 
                v-for="btn in btnList"
                v-bind:key="btn.route"
                v-bind:route="btn.route"
                v-bind:img-path="btn.imgPath"
                v-bind:title="btn.title"
            />
        </div>
    </div>  
</template>

<script setup>
import { ref, onMounted } from 'vue';

import NavlistButton from './NavlistButton.vue';

const btnList = ref([]);

onMounted(() => {
    const Home = {route: '/home', imgPath: '/assets/home.png', title: 'Home'}
    const Profile = {route: '/profile', imgPath: '/assets/profile-user.png', title: 'Profilo'};
    const Explore = {route: '/explore', imgPath: '/assets/location.png', title: 'Esplora'};
    const Messages = {route: '/messages', imgPath: '/assets/send.png', title: 'Messaggi'};
    const Notifications = {route: '/notifications', imgPath: '/assets/bell.png', title: 'Notifiche'};

    const route = window.location.href.split('/')[3];

    switch (route) {
        case '':
        case 'home':
            btnList.value = [
                Profile,
                Explore,
                Messages,
                Notifications
            ];     
            break;
        case 'profile':
            btnList.value = [
                Home,
                Explore,
                Messages,
                Notifications
            ];
            break;
        case 'explore':
            btnList.value = [
                Home,
                Profile,
                Messages,
                Notifications
            ];
            break;
        case 'messages':
            btnList.value = [
                Home,
                Profile,
                Explore,
                Notifications
            ];
            break;
        case 'notifications':
            btnList.value = [
                Home,
                Profile,
                Explore,
                Messages
            ];
            break;
        default:
            this.$router.push({ path: '/' });
            break;
    }
});
</script>

<style scoped>
/* @import '../styles/site2.css'; */

#nav
{
    background-color: rgb(68, 68, 68);
    color: white;
    position: absolute;
    height: 100%;
    width: 25%;
    left: 0;
    bottom: 0;
}
.navList
{
    list-style-type: none;
    height: 25%;
    text-align: left;
    font-size: 20px;
    margin-top: 0;
    padding-left: 0px;
}

.navList li
{
    padding: 30px 30px;
    margin: 0 0;
    width: auto;
    border-bottom: 1px solid white;
}

.navList li:hover 
{
    background-color: rgb(97, 97, 97);
}

.navList li:hover .listImg
{
    width: 35px;
}

.listImg
{
    width: 30px;
    vertical-align: middle;
}
</style>