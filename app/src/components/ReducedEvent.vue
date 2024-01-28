<template>
    <div @click="router.push('/event')" id="reduced-event">
        <img src="../assets/concert.jpeg" id='main-img'>
        <div id="event-title"> Titolo</div>
        <div id="event-organizer"> @coso </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
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