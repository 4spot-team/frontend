<template>
    <div id="container">
        <ContainerHeader />
        <div id="usable">
            <ContainerNavlist />
            <div id="component">
                <div id="explore">
                    <l-map ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false">
                        <l-tile-layer url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                                        layer-type="base"
                                        name="Stadia Maps Basemap"
                                        max-zoom="20"
                                        min-zoom="2"
                                        >
                        </l-tile-layer>
                        <l-marker 
                            v-bind:key="arcade.geometry.coordinates" 
                            v-for="arcade in arcades.features.slice(0, 10)" 
                            :lat-lng="arcade.geometry.coordinates.reverse()">
                        </l-marker>
                    </l-map>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, /* LPopup */ } from "@vue-leaflet/vue-leaflet";

import arcades from "../arcades/arcades.json";

import ContainerHeader from './ContainerHeader.vue';
import ContainerNavlist from './ContainerNavlist.vue';

const zoom = ref(2);
const center = ref([47.41322, -1.219482]);

</script>

<style scoped>
@import '../styles/container.css';

#explore
{
    height: 100%;
    width: 100%;
}
</style>