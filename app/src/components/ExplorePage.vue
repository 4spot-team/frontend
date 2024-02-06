<template>
    <div id="container">
        <ContainerHeader />
        <div id="usable">
            <ContainerNavlist />
            <div id="component">
                <div id="explore">
                    <l-map ref="map" @update:zoom="getEvents" @update:center="getEvents" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false">
                        <l-tile-layer url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                                        layer-type="base"
                                        name="Stadia Maps Basemap"
                                        :max-zoom=20
                                        :min-zoom=2
                                        >
                        </l-tile-layer>
                        <!-- User -->
                        <l-marker
                            v-if="userLocation.lat !== 0 && userLocation.lng !== 0"
                            :lat-lng="userLocation"
                            :icon="userIcon"
                        >
                        </l-marker>
                        <!-- Events -->
                        <l-marker class="event-marker"
                            v-for="event in events"
                            :key="event.code"
                            :lat-lng="event.location.coordinates"
                            :icon="getMarkerIcon(event)"
                            @click="zoomOnEvent(event)"
                        >
                            <l-popup class="event-tooltip">
                                <a :href="'/event/' + event.code">
                                    <p class="tooltip-title">
                                        {{ event.title }}
                                    </p>
                                    <p class="tooltip-date">
                                        {{ event.date }}
                                    </p>
                                </a>
                            </l-popup>
                        </l-marker>
                    </l-map>
                </div>

                <!-- Button for center to position -->
                <button id="center-btn" @click="recenter"> 
                    <img src="/assets/full-moon.png"> 
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

import { backendApiBaseUrl } from '@/states/backendInfo';
import { useLoggedUser } from '@/states/loggedUser';

import places from '../arcades/places.json';    // TEST

import ContainerHeader from './ContainerHeader.vue';
import ContainerNavlist from './ContainerNavlist.vue';

// Automatically links to the l-map
const map = ref(null);

const loggedUser = useLoggedUser();

const events = ref([]);

const zoom = ref(5);
const center = ref({lat: 0, lng: 0});
const userLocation = ref({lat: 0, lng: 0});

// Tooltip and Popup

// Calculate coordinates to send to backend
const worldPixels = computed(() => 256 * Math.pow(2, zoom.value));

const mapWidthDegrees = computed(() => {    
    const mapWidthPixels = document.getElementById('explore').getBoundingClientRect().width;
    return mapWidthPixels / worldPixels.value * 360.0;
})

const mapHeightDegrees = computed(() => {
    const mapHeightPixels = document.getElementById('explore').getBoundingClientRect().height;
    return mapHeightPixels / worldPixels.value * 180.0;
})

const coordinatesIntervals = computed(() => {
    return {
        lat: [center.value.lat - (mapHeightDegrees.value/2.0), center.value.lat + (mapHeightDegrees.value/2.0)],
        lng: [center.value.lng - (mapWidthDegrees.value/2.0), center.value.lng + (mapWidthDegrees.value/2.0)]
    }
});

// User Location Marker
const userIcon = L.icon({
    iconUrl: '/assets/full-moon.png',
    iconSize:     [30, 30], // size of the icon
})

// Zoom in on marker click
async function zoomOnEvent(event) {
    console.log(event.location.coordinates);
    center.value = {
        lat: event.location.coordinates[0],
        lng: event.location.coordinates[1]
    }
    zoom.value = 12;
}

// Request coordinates to backend
function getEvents() {
    /* console.log('Lat: ' + center.value.lat);
    console.log('Lng: ' + center.value.lng);
    console.log('LMap: ' + JSON.stringify(map.value.center)); */

    /* console.log(coordinatesIntervals.value); // TEST */
    fetch(backendApiBaseUrl + '/map', {   
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',  
            'Authorization': loggedUser.getToken
        },
        body: JSON.stringify(coordinatesIntervals.value)
    })
    .then(res => res.json())
    .then((data) => {
        if (data.success) {
            events.value = data.events;
            console.log('Eventi: ' + JSON.stringify(events.value[0]));
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

// For geolocalization
function setUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            userLocation.value.lat = position.coords.latitude;
            userLocation.value.lng = position.coords.longitude;

            recenter();
        });
    } else {
        userLocation.value.lat = 47.41322;
        userLocation.value.lng = -1.219482;
        alert("Geolocation is not supported by this browser.");
    }
}

// Set center of the map to the position of client
function recenter() {
    center.value = {
        lat: userLocation.value.lat,
        lng: userLocation.value.lng
    }
    zoom.value = 12;
}

// For Marker Icon
function getMarkerIcon(event) {
    const fontSize = 15;
    const titleLen = event.title.length * fontSize;

    const retval = new L.DivIcon({
        className: 'markerDivIcon',
        html:   "<div style='text-align: left; align-items: center'>" +
                    "<img src='/assets/placeholder.png' class='event-marker-img' height='40px'>" + 
                    "<div style='position: absolute; left: -" + titleLen/13 * 6 + "px; font-size: " + fontSize + 
                    "px; color: red; width: " + titleLen + "px; text-align: center'>" + event.title + "</div>" +
                "</div>"
    });
    return retval;
}

onMounted(() => {
    /// TEST ///
    events.value = places.events;
    console.log(places.events);
    console.log(events.value);
    ////////////
    setUserLocation();
});
</script>

<style scoped>
@import '../styles/container.css';

#explore
{
    height: 100%;
    width: 100%;
}

#center-btn
{   
    position: absolute;
    padding: 0 0;
    width: 100px;
    height: 100px;
    left: 10px;
    bottom: 10px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid grey;
    z-index: 400;
}

#center-btn img
{
    position: relative;
    width: 70px;
    margin: 15px 15px;
}

.event-tooltip a
{
    color: black;
    text-decoration: none;
}
.tooltip-title
{
    font-size: 15px;
}
.tooltip-date
{
    font-size: 12px;
}

.event-marker-img
{
    width: 30px;
}
</style>