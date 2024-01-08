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
import { ref } from 'vue';

import NavlistButton from './NavlistButton.vue';

const btnList = ref([
    {route: '/profile', imgPath: '/assets/profile-user.png', title: 'Profilo'},
    {route: '/explore', imgPath: '/assets/location.png', title: 'Esplora'},
    {route: '/messages', imgPath: '/assets/send.png', title: 'Messaggi'},
    {route: '/notifications', imgPath: '/assets/bell.png', title: 'Notifiche'}
])
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