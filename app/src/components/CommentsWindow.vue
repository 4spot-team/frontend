<template>
    <div id="comments-window">
        <div id="comments-input-div">   
                <input class="comment-input" placeholder="Lascia un commento">
        </div>
        
        <div id="comments-list-div">
                <p v-if="noComments"> Non ci sono ancora commenti a questo evento </p>    
                <!-- TODO: Insert coments -->
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    viewedEvent: Object
});

function noComments() {
    let retval = true;
    const comments = props.viewedEvent.comments;
    if (comments !== undefined) {
        retval = (comments.length <= 0);
    }
    return retval;
}

</script>

<style scoped>
@import '../styles/event.css';
</style>