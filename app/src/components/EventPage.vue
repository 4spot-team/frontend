<template>
    <div id="event">
        <div id="event-header">
                {{ title }}
        </div>

        <div id="img">
            <img v-bind:src="image" id="main-img">
        </div>  

        <div id="info-1">
            <div id="tags">
                <ul class="tags-list">
                    <li v-for="hashtag in hashtags" v-bind:key="hashtag">
                        #{{ hashtag }}
                    </li>
                </ul>
            </div>
            <br>
            <div id="interact">
                <ul class="interact-list">
                    <li>
                        <img src="../assets/profile-user.png" class="listImg">
                        &ensp;
                        @{{ organiserUsername }}
                    </li>
                    <li>
                        <ul class="star-list">
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
                    </li>
                    <li>
                        <button @click="subscribe" id="subscribe-btn">
                            Iscriviti
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <div id="info-2">
            <div id="info-2-icons">
                <ul class="icons-list">
                    <li>
                        <img src="../assets/location.png" class="listImgSmall">
                        &ensp;
                        {{ location }}
                    </li>
                    <li>
                        <img src="../assets/date.png" class="listImgSmall">
                        &ensp;
                        {{ parsedDate }}
                    </li>
                    <li>
                        <img src="../assets/ticket.png" class="listImgSmall">
                        &ensp;
                        {{ price }}
                    </li>
                </ul>
            </div>
            <div id="description">
                <br>
                <p>
                    {{ description }}
                </p>
            </div>
        </div>

        <div v-if="!creationProcess" id="comments">
            <div @click="$emit('showCommentsWindow')" 
            id="comments-header">
                <p> Commenti </p>
            </div>
            
            <div id="comments-list-div">
                <p v-if="noComments"> 
                    Non ci sono ancora commenti a questo evento 
                </p>    
                <!-- TODO: Insert coments -->
            </div>

            <div id="comments-input-div">   
                <input class="comment-input" placeholder="Lascia un commento">
            </div>
        </div>

    </div>
</template>

<script setup>
import { defineProps, onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { backendApiBaseUrl } from '@/states/backendInfo';
import { useLoggedUser } from '@/states/loggedUser';

const props = defineProps({
    useProps: Boolean,
    creationProcess: Boolean,
    codeProp: String,
    titleProp: String,
    imageProp: String,
    organiserProp: JSON,
    dateProp: Date,
    locationProp: String,
    priceProp: String,
    hashtagsProp: Array,
    descriptionProp: String,
    commentsProp: Array
});

const route = useRoute();
const loggedUser = useLoggedUser();

const noComments = ref(true);

let code = null;
let title = null;
let image = null;
let organiser = null;
let date = null;
let location = null;
let price = null;
let hashtags = null;
let description = null;
let comments = null;

let parsedDate;
let organiserUsername;

// This component works in both the cases where it is inserted
// inside a paretn component or it's a standalone Web Page
const refresh = () => {
    if (props.useProps) {   // Access event from home
        code = computed(() => props.codeProp);
        title = computed(() => props.titleProp);
        image = computed(() => props.imageProp);
        organiser = computed(() => props.organiserProp);
        date = computed(() => props.dateProp);
        location = computed(() => props.locationProp);
        price = computed(() => props.priceProp);
        hashtags = computed(() => props.hashtagsProp);
        description = computed(() => props.descriptionProp);
        
        // Returns only the first two comments (at most)
        comments = computed(() => props.commentsProp/* .slice(0, 2) */);  
    }
    else {  // Access event directly from url
        fetch(backendApiBaseUrl + '/event/' + route.params.eventCode, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',  
                'Authorization': loggedUser.getToken
            }
        })  
        .then(res => res.json())
        .then((data) => {
            if (data.success) {
                const event = data.event;

                // Assign values to stuff 
                code = ref(event.code);
                title = ref(event.title);
                image = ref(event.image);
                organiser = ref(event.organiser);
                date = ref(event.date);
                location = ref(event.location);
                price = ref(event.price);
                hashtags = ref(event.hashtags);
                description = ref(event.description);
                comments = ref(event.comments); // Returns all comments
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // Check length of comments
    if (comments !== null && comments.value !== undefined && comments.value.length > 0) {
        noComments.value = false;
    }
    
    // For correct format of date
    parsedDate = computed(() => {
        return date.value.toString().split(' ').slice(1, 4).toString().replace(',', ' ').replace(',', ', ');
    })
    organiserUsername = computed(() => {
        return organiser.value.username;
    })
}

function subscribe() {
    fetch(backendApiBaseUrl + '/events/' + code.value, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',  
            'Authorization': loggedUser.getToken
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success) {
            alert(data.message);
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

onMounted(refresh);

</script>

<style scoped>
@import '../styles/site2.css';
@import '../styles/event.css';
</style>