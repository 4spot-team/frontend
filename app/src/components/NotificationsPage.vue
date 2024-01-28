<template>
    <div id="container">
        <ContainerHeader />
        <div id="usable">
            <ContainerNavlist />
            <div id="component">
                <div id="notifications">
                    <p v-if="notificationsList.length===0">
                        There are no notifications!
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import ContainerHeader from './ContainerHeader.vue';
import ContainerNavlist from './ContainerNavlist.vue';

const notificationsList = ref([]);
</script>

<style scoped>
@import '../styles/container.css';

#notifications
{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgb(235, 235, 235);
}

#notifications p
{
    margin: 30px 30px;
}

</style>