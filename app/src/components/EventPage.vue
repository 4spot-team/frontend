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
                        <button id="subscribe-btn">
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
                <!-- TODO: Insert coments -->
                <p> Non ci sono ancora commenti a questo evento </p>    
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
    titleProp: String,
    imageProp: String,
    organiserProp: JSON,
    dateProp: Date,
    locationProp: String,
    priceProp: String,
    hashtagsProp: Array,
    descriptionProp: String
});

const route = useRoute();
const loggedUser = useLoggedUser();

let title;
let image;
let organiser;
let date;
let location;
let price;
let hashtags;
let description;

let parsedDate;
let organiserUsername;

// This component works in both the cases where it is inserted
// inside a paretn component or it's a standalone Web Page
const refresh = () => {
    if (props.useProps) {   // Access event from home
        title = computed(() => props.titleProp);
        image = computed(() => props.imageProp);
        organiser = computed(() => props.organiserProp);
        date = computed(() => props.dateProp);
        location = computed(() => props.locationProp);
        price = computed(() => props.priceProp);
        hashtags = computed(() => props.hashtagsProp);
        description = computed(() => props.descriptionProp);
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
                title = ref(event.title);
                image = ref(event.image);
                organiser = ref(event.organiser);
                date = ref(event.date);
                location = ref(event.location);
                price = ref(event.price);
                hashtags = ref(event.hashtags);
                description = ref(event.description);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    // For correct format of date
    parsedDate = computed(() => {
        return date.value.toString().split(' ').slice(1, 4).toString().replace(',', ' ').replace(',', ', ');
    })
    organiserUsername = computed(() => {
        return organiser.value.username;
    })

    /// DEBUG ///
    console.log(title.value);
    console.log(hashtags.value);
    /* console.log(.value); */
    console.log(organiser.value);
    console.log(location.value);
    console.log(price.value);
    console.log(description.value);
    /////////////
}

onMounted(refresh);

</script>

<style scoped>
@import '../styles/site2.css';
@import '../styles/event.css';
</style>