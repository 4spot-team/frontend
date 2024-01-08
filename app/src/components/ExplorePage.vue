<template>
    <div id="container">
        <ContainerHeader />
        <div id="usable">
            <ContainerNavlist />
            <div id="component">
                <div id="explore">

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ContainerHeader from './ContainerHeader.vue';
import ContainerNavlist from './ContainerNavlist.vue';
</script>

<style scoped>
@import '../styles/container.css';
</style>