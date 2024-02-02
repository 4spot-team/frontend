<template>
    <div @click="router.push('/event/' + eventCode)" id="reduced-event">
        <img :src="image" id='main-img'>
        <div id="event-title"> {{ title }} </div>
        <div id="event-organizer"> @{{ organiserUsername }} </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
    eventCode: String,
    title: String,
    image: String,
    organiserUsername: String,
});
</script>

<style scoped>
#reduced-event
{
    height: 250px;
    width: 300px;
    display: inline-block;
    margin: 2px 2px;
}

#main-img
{
    width: 100%;
    height: 150px;
    object-fit: cover;
}

#event-title
{
    font-size: 20px;
    text-align: center;
}

#event-organizer
{
    font-size: 15px;
    text-align: center;
}
</style>