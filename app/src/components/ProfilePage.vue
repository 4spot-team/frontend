<template>
    <div id="container">
        <ContainerHeader />
        <div id="usable">
            <ContainerNavlist />
            <div id="component">
                <div id="profile">
                    <div id="profile-info">
                        <!-- Profile Header -->
                        <div id="profile-header">
                            <div id="profile-img-div">
                                <img id="profile-image" src="/assets/profile-user.png">
                            </div>
                            <div id="main-info">
                                <!-- <div id="name-age">
                                    <p>
                                        Paolo Bianchi, 24
                                    </p>
                                </div> -->
                                <div id="profile-username">
                                    <p>
                                        @{{ userInfo.username }} - Account personale
                                    </p>
                                </div>
                            </div>
                            <div id="settings-image-div">
                               <img src="/assets/settings.png">
                            </div>
                        </div> 
                        <!-- Network Info -->
                        <div id="network-info">
                            <div class="n-info">
                                <p>Following: </p>
                                <p style="color: grey;">
                                    {{ userInfo.following.length }}
                                </p>
                            </div>
                            <div class="n-info">
                                <p>Followers: </p>
                                <p style="color: grey;">
                                    {{ userInfo.followers.length }}
                                </p>
                            </div>
                            <!-- <div class="n-info">
                                <p>Amici: </p>
                                <p style="color: grey;">
                                    {{ userInfo.frien }}
                                </p>
                            </div> -->
                            <div class="n-info">
                                <p>Rating: </p>
                                    <ul class="star-list" style="margin-left: 3%;">
                                        <li>
                                            <img src="../assets/star.png" class="star">
                                        </li>
                                        <li>
                                            <img src="../assets/star.png" class="star">
                                        </li>
                                        <li>
                                            <img src="../assets/star.png" class="star">
                                        </li>
                                        <li>
                                            <img src="../assets/star.png" class="star">
                                        </li>
                                        <li>
                                            <img src="../assets/star.png" class="star">
                                        </li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                    <div id="your-events">
                        <header class="profile-section-header">I tuoi eventi</header>
                        <div class="profile-section-body">
                            <p v-if="yourEvents.length===0">No events organized</p>
                            <div class="reduced-events-list">
                                <ReducedEvent 
                                    v-for="event in yourEvents"
                                    :key="event.code"
                                    :event-code="event.code"
                                    :title="event.title"
                                    :image="event.image"
                                    :organiser-username="event.organiser.username"
                                />
                            </div>
                        </div>
                    </div>
                    <div id="organized-events">
                        <header class="profile-section-header">Eventi organizzati</header>
                        <div class="profile-section-body">
                            <p v-if="organizedEvents.length===0">No events organized</p>
                            <div class="reduced-events-list">
                                <ReducedEvent 
                                    v-for="event in organizedEvents"
                                    :key="event.code"
                                    :event-code="event.code"
                                    :title="event.title"
                                    :image="event.image"
                                    :organiser-username="event.organiser.username"
                                />
                            </div>
                        </div>
                    </div>
                    <div id="new-event">
                        <button @click="router.push('/create-event')"> Nuovo evento</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { urlToBase64 } from '@/middlewares/imagesHandling';
import { backendApiBaseUrl } from '@/states/backendInfo';
import { useLoggedUser } from '@/states/loggedUser';

import ContainerHeader from './ContainerHeader.vue';
import ContainerNavlist from './ContainerNavlist.vue';
import ReducedEvent from './ReducedEvent.vue';


const router = useRouter();
const loggedUser = useLoggedUser();


const userInfo = reactive({
    username: '',
    following: [],
    followers: []
});
const yourEvents = ref([]);
const organizedEvents = ref([]);

// Example Event
const exampleOrganizer = {
    username: 'comunedirovereto'
}
const exampleEvent = {
    code: '1',
    title: "Concerto fine anno",
    image: '',
    organiser: exampleOrganizer,
};
yourEvents.value.push(exampleEvent);
organizedEvents.value.push(exampleEvent);

onMounted(() => {
    /// DEBUG ///
    urlToBase64('http://localhost:8080/assets/concert.jpeg')
        .then((base64String) => {
            console.log(base64String);
            exampleEvent.image = base64String;
        })
        .catch((err) => {
            console.log(err);
        })

    /////////////

    // GET user page
    fetch(backendApiBaseUrl + '/users/' + loggedUser.username, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',  
            'Authorization': loggedUser.getToken
        }  
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success) { // Gets only events organized by logged user yet
            // User
            userInfo.username = data.user.username;
            userInfo.following = data.user.following;
            userInfo.followers = data.user.followers;

            // Events
            organizedEvents.value = data.events;
        }
    })
    .catch((err) => {
        console.log(err);
    })

    console.log('Do something')
});
</script>

<style scoped>
@import '../styles/container.css';
@import '../styles/site2.css';
@import '../styles/event.css';
@import '../styles/profile.css';
</style>