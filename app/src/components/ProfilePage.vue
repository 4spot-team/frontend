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
                                <div id="name-age">
                                    <p>
                                        Paolo Bianchi, 24
                                    </p>
                                </div>
                                <div id="profile-username">
                                    <p>
                                        @paolobianchi - Account personale
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
                                    15
                                </p>
                            </div>
                            <div class="n-info">
                                <p>Followers: </p>
                                <p style="color: grey;">
                                    113
                                </p>
                            </div>
                            <div class="n-info">
                                <p>Amici: </p>
                                <p style="color: grey;">
                                    3
                                </p>
                            </div>
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
                                    :key="event.value.code"
                                    :title="event.value.title"
                                    :image="event.value.image"
                                    :organiser-username="event.value.organiser.username"
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
                                    :key="event.value.code"
                                    :title="event.value.title"
                                    :image="event.value.image"
                                    :organiser-username="event.value.organiser.username"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { urlToBase64 } from '@/middlewares/imagesHandling';

import ContainerHeader from './ContainerHeader.vue';
import ContainerNavlist from './ContainerNavlist.vue';
import ReducedEvent from './ReducedEvent.vue';

const yourEvents = ref([]);
const organizedEvents = ref([]);

// Example Event
const exampleOrganizer = {
    username: 'comunedirovereto'
}
const exampleEvent = ref({
    code: '1',
    title: "Concerto fine anno",
    image: '',
    organiser: exampleOrganizer,
});
yourEvents.value.push(exampleEvent);
organizedEvents.value.push(exampleEvent);

onMounted(() => {
    /// DEBUG ///
    urlToBase64('http://localhost:8080/assets/concert.jpeg')
        .then((base64String) => {
            console.log(base64String);
            exampleEvent.value.image = base64String;
        })
        .catch((err) => {
            console.log(err);
        })

    /////////////

    console.log('Do something')
});
</script>

<style scoped>
@import '../styles/container.css';
@import '../styles/site2.css';
@import '../styles/event.css';
@import '../styles/profile.css';
</style>