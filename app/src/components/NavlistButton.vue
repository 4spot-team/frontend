<template>
    <div @click="this.$router.push({ path: route })" class="page-button">
        <img :src=imgPath class="listImg">
        &emsp;
        {{title}}
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    route: String,
    imgPath: String,
    title: String
});
</script>

<style scoped>
@import '../styles/page_btn.css';
</style>