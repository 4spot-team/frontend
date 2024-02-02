<template>
    <div id="create-event">
        <header> Crea il tuo Evento! </header>

        <div v-show="!filled">
            <div class="input-field">
                <p class="field-name">Titolo:</p>
                <input v-model="title" class="filling-field" placeholder="Titolo" required> 
            </div>
            <div class="input-field">
                <p class="field-name">Descrizione:</p>
                <input v-model="description" class="filling-field" placeholder="Descrizione">
            </div>
            <div class="input-field">
                <p class="field-name">Location:</p>
                <input @change="updateLocation" v-model="locationString" class="filling-field" placeholder="Location" required>
            </div>
            <div class="input-field">
                <p class="field-name">Data:</p>
                <input v-model="dateString" type="date" class="filling-field" :min="getTodayString()" required>
            </div>
            <div class="input-field">
                <p class="field-name">Immagine:</p>
                <div class="filling-field">
                    <label for="file-input-tag" class="file-input-label">
                        <div v-if="image === ''">
                            Select Image
                        </div>

                        <div v-else>
                            {{ imageTitle }}
                        </div>
                        <input 
                            @change="loadImage" 
                            id="file-input-tag" 
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            required
                        />
                    </label>
                </div>
            </div>
            <div class="input-field">
                <p class="field-name">Tipologie:</p>
                <div>
                    <EventTypesMenu 
                        @selected-types="(list) => {typologies = list}"
                    />
                </div>
            </div>
            <div class="input-field">
                <p class="field-name">Hashtags:</p>
                <input v-model="hashtagsString" class="filling-field" placeholder="Hashtags">
            </div>
            <div class="input-field">
                <p class="field-name">Prezzo:</p>
                <input v-model="price.amount" class="filling-field" placeholder="Prezzo" type="number" min="0">
            </div>
            <div class="input-field">
                <p class="field-name">Numero posti:</p>
                <input v-model="numberPlaces" class="filling-field" placeholder="Numero posti" type="number" min="0">
            </div>
            <div class="input-field">
                <p class="field-name">Vietato ai minori:</p>
                <input v-model="noUnderage" type="checkbox" class="filling-checkbox" required>
            </div>

            <button @click="checkCreatedEvent" class="create-event-btn">Avanti</button>
        </div>

        <!-- Show event after filled (and before creating event) -->
        <div v-show="filled">
            <EventPage 
                :use-props="true"
                :creation-process="true"
                :title-prop="title"
                :image-prop="image"
                :organiser-prop="organiser"
                :date-prop="date"
                :location-prop="locationString"
                :price-prop="price.currency + price.amount"
                :hashtags-prop="hashtags"
                :description-prop="description"
            />
            <button @click.stop.prevent="createEvent" class="create-event-btn">Crea Evento</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import EventTypesMenu from './EventTypesMenu.vue';
import EventPage from './EventPage.vue';

import { fileToBase64 } from '@/middlewares/imagesHandling';
import { backendApiBaseUrl } from '@/states/backendInfo';
import { useLoggedUser } from '@/states/loggedUser';

const router = useRouter();
const loggedUser = useLoggedUser();

// For utility
const locationString = ref('');
const dateString = ref('');
const hashtagsString = ref('');
const organiser = ref({
    username: loggedUser.getUsername
});
const imageTitle = ref('');

// Main refs and computed to send to backend
const title = ref('');
const description = ref('');
const location = ref({lat: 0, lon: 0});    // Coordinates
const date = computed(() => {   // Timestamp
    const dateList = dateString.value.split('/');
    const year = dateList[0];
    const month = dateList[1];
    const day = dateList[2];
    return new Date(year, month, day);
});    
const image = ref('');  // base64 String
const typologies = ref([]);
const hashtags = computed(() => {
    // Split hashtags string
    const hashtagsList = hashtagsString.value.split(' ');
    for (let i=0; i<hashtagsList.length; i++) {
        if (hashtagsList[i].charAt(0) === '#') {
            hashtagsList[i].slice(1);   // Remove '#' character
        }
    }
    return hashtagsList;
});
const price = ref({
    amount: 0,
    currency: '€'
});
const numberPlaces = ref(0);
const noUnderage = ref(false);

// Other utility refs
const filled = ref(false);

// Functions
function loadImage(event) {
    const file = event.target.files[0];
    imageTitle.value = file.name;
    fileToBase64(file)
    .then((res) => {
        image.value = res; 
        //alert('Image loaded.');
    })
    .catch((err) => {
        console.log(err);
    })
}

function checkCreatedEvent() {
    console.log(typologies.value);
    if (
        title.value !== '' &&
        /* typologies.value.length !== 0 && */  // Later
        (location.value.lat !== 0 && location.value.lon !== 0) &&
        date.value !== 0 &&
        image.value !== ''
    ) {
        filled.value = true;
    }
}

function createEvent() {
    fetch(backendApiBaseUrl + '/addevent', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',  
            'Authorization': loggedUser.getToken
        },
        body: JSON.stringify({
            title: title,
            types: typologies,
            location: location,
            date: date.value.getTime()/1000,
            noUnderage: noUnderage,
            hasQR: false,
            image: image,
            tickets: [],
            price: price,
            messagingGroup: undefined,
            hashtags: hashtags,
            description: description,
            numOfSpots: numberPlaces,
            occupiedSpots: 0,
            ratings: undefined,
            comments: [],
        })
    })
    .then(() => {
        router.push('/profile');
    })
    .catch((err) => {
        console.log(err);
    })
}

function updateLocation() {
    if (locationString.value !== '') {
        // Use Nominatim
        fetch(
            'https://nominatim.openstreetmap.org/search?q=' + 
            locationString.value +
            '&format=json&addressdetails=1&limit=1&polygon_svg=1', 
            {
                method: 'GET'
        })
        .then((res) => res.json())
        .then((dataList) => {
            const data = dataList[0];
            console.log('Data: ' + data);
            if (data.lat !== undefined && data.lon !== undefined) {
                location.value.lat = parseFloat(data.lat)
                location.value.lon = parseFloat(data.lon);

                console.log('Lat: ' + location.value.lat);
                console.log('Lon: ' + location.value.lon);
            }
            else {
                location.value.lat = location.value.lon = 0;
            }
        })
        .catch((err) => {
            console.log(err);
            location.value.lat = location.value.lon = 0;
        })
    }
    else {
        return (0, 0);
    }
}

// Limit date
function getTodayString() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}

</script>

<style scoped>
@import '../styles/site2.css';
@import '../styles/event_creation.css';
</style>