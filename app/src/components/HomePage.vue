<template>  
    <div id="container">
        <ContainerHeader />
        <div id="usable">
            <ContainerNavlist />
            <div id="component">
                <div id="home">
                    <div id="events-list-div">
                        <EventPage />
                        <EventPage />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    /* import { onMounted } from 'vue'; */
    
    import EventPage from './EventPage.vue';
    import ContainerHeader from './ContainerHeader.vue';
    import ContainerNavlist from './ContainerNavlist.vue';

    /* import { loggedUser } from '@/states/loggedUser'; */
    
    /* onMounted(() => {

    }); */
</script>

<style scoped>
@import '../styles/container.css';

#home
{
    position: relative;
    background-color: rgb(229, 229, 229);
    padding: 0 40px;
}

#events-list-div
{
    position: relative;
    background-color: white;
    border-radius: 20px;
    padding-top: 30px;
}

</style>