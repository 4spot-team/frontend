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
            <!-- Location fileds -->
            <div class="input-field">
                <p class="field-name">Codice postale:</p>
                <input v-model="locationObject.postalCode" class="filling-field" placeholder="Codice postale" required>
            </div>
            <div class="input-field">
                <p class="field-name">Paese:</p>
                <input v-model="locationObject.state" class="filling-field" placeholder="Stato" required>
            </div>
            <div class="input-field">
                <p class="field-name">Città:</p>
                <input v-model="locationObject.city" class="filling-field" placeholder="Città" required>
            </div>
            <div class="input-field">
                <p class="field-name">Via:</p>
                <input v-model="locationObject.address" class="filling-field" placeholder="Indirizzo" required>
            </div>
            <div class="input-field">
                <p type="number" class="field-name">Numero civico:</p>
                <input v-model="locationObject.houseNumber" type="number" class="filling-field" placeholder="Numero civico" required>
            </div>

            <div class="input-field">
                <p class="field-name">Data:</p>
                <input @click="console.log(dateString)" v-model="dateString" type="datetime-local" class="filling-field" :min="getTodayString()" required>
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
        <div>
            <EventPage
                v-if="filled" 
                :use-props="true"
                :creation-process="true"
                :title-prop="title"
                :image-prop="image"
                :organiser-prop="organiser"
                :date-prop="filled ? date : new Date()"
                :location-prop="locationObject.city + ', ' + locationObject.address + locationObject.houseNumber"
                :price-prop="price.currency + (price.amount !== undefined ? price.amount : 0).toString()"
                :hashtags-prop="hashtags"
                :description-prop="description"
                :comments-prop="[]"
            />
            <button v-if="filled" @click.stop.prevent="createEvent" class="create-event-btn">
                Crea Evento
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

import EventTypesMenu from './EventTypesMenu.vue';
import EventPage from './EventPage.vue';

import { fileToBase64 } from '@/middlewares/imagesHandling';
import { backendApiBaseUrl } from '@/states/backendInfo';
import { useLoggedUser } from '@/states/loggedUser';

const router = useRouter();
const loggedUser = useLoggedUser();

// For utility
const locationObject = reactive({
    postalCode: "",
    state: "",
    city: "",
    address: "",
    houseNumber: undefined 
});

const hashtagsString = ref('');
const organiser = ref({
    username: loggedUser.getUsername
});
const imageTitle = ref('');
const dateString = ref('');

// Main refs and computed to send to backend
const title = ref('');
const description = ref('');

const date = computed(() => {   // Timestamp
    // Split Date and Time
    const dateTimeList = dateString.value.split('T');

    // Split date
    const dateList = dateTimeList[0].split('-');
    const year = dateList[0];
    const month = dateList[1] - 1;
    const day = dateList[2];

    // Split time
    const timeList = dateTimeList[1].split(':');
    const hours = timeList[0];
    const minutes = timeList[1];
    return new Date(year, month, day, hours, minutes);
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
    amount: undefined,
    currency: '€'
});
const numberPlaces = ref(undefined);
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
        locationObject.postalCode !== '' &&
        locationObject.state !== '' &&
        locationObject.city !== '' &&
        locationObject.address !== '' &&
        locationObject.houseNumber !== undefined &&
        dateString.value !== '' &&
        image.value !== ''
    ) {
        filled.value = true;
    }
}

function createEvent() {
    fetch(backendApiBaseUrl + '/addevent', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',  
            'Authorization': loggedUser.getToken
        },
        body: JSON.stringify({
            title: title.value,
            types: typologies.value,
            location: locationObject,
            date: date.value.toISOString(),
            noUnderage: noUnderage.value,
            hasQR: false,
            image: image.value,
            tickets: [],
            price: price.value,
            messagingGroup: undefined,
            hashtags: hashtags.value,
            description: description.value,
            numOfSpots: numberPlaces.value,
            occupiedSpots: 0,
            ratings: undefined,
            comments: [],
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        if (data.success) {
            router.push('/profile');
        }
    })
    .catch((err) => {
        console.log(err);
    })
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