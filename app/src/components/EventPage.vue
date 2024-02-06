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
                <p v-for="comment in comments" :key="comment._id"> 
                    {{ comment.text }}
                </p>

            </div>

            <div id="comments-input-div">   
                <input v-model="commentInput" @keyup.enter="leaveComment" class="comment-input" placeholder="Lascia un commento">
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
const commentInput = ref('');

// Only for init
const fakeOrganiz = {
    username: ''
}

const code = ref('');
const title = ref('');
const image = ref('');
const organiser = ref(fakeOrganiz);
const date = ref(new Date());
const location = ref('');
const price = ref('');
const hashtags = ref([]);
const description = ref('');
const comments = ref([]);

let parsedDate;
let organiserUsername;

// This component works in both the cases where it is inserted
// inside a paretn component or it's a standalone Web Page
const refresh = () => {
    if (props.useProps) {   // Access event from home
        code.value = props.codeProp;
        title.value = props.titleProp;
        image.value = props.imageProp;
        organiser.value = props.organiserProp;
        date.value = props.dateProp;
        location.value = props.locationProp;
        price.value = props.priceProp;
        hashtags.value = props.hashtagsProp;
        description.value = props.descriptionProp;
        
        // Returns only the first two comments (at most)
        comments.value = props.commentsProp;  
    }
    else {  // Access event directly from url
               
        // Make fetch
        fetch(backendApiBaseUrl + '/events/' + encodeURIComponent(route.params.eventCode), {
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
                console.log(data.event);

                // Assign values to stuff 
                code.value = event.code;
                title.value = event.title;
                image.value = event.image;
                organiser.value = event.organiser;
                date.value = new Date(event.date);
                location.value = event.location.city + ', ' + event.location.address + event.location.houseNumber;
                price.value = event.price.currency + event.price.amount;
                hashtags.value = event.hashtags;
                description.value = event.description;
                comments.value = event.comments; // Returns all comments

                console.log('Title: ' + title.value);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // Check length of comments
    if (comments.value !== null && comments.value !== undefined && comments.value.length > 0) {
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
    if (!props.creationProcess) {
        fetch(backendApiBaseUrl + '/events/' + encodeURIComponent(code.value), {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',  
                'Authorization': loggedUser.getToken
            },
            body: JSON.stringify({
                subscribe: true
            })
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
}

function leaveComment() {
    fetch(backendApiBaseUrl + '/events/' + encodeURIComponent(code.value), {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',  
            'Authorization': loggedUser.getToken
        },
        body: JSON.stringify({
            comment: commentInput.value
        })
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


onMounted(() => {
    refresh();
    console.log(title);
});

</script>

<style scoped>
@import '../styles/site2.css';
@import '../styles/event.css';
</style>