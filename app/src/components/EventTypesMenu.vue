<template>
    <div id="event-types"
        @mouseover="showEventTypes=true"
        @mouseleave="showEventTypes=false; emit('selectedTypes', eventTypeList)"
    >
        <input v-model="filter" class="filling-field" placeholder="Tipologie evento">

        <div 
            id="event-types-menu" 
            v-show="showEventTypes"
        >
            <ul style="padding-left: 30px;">
                <li v-for="superType in superEventTypes" :key="superType">
                    <input @click="modifySelectedTypes(superType)" type="checkbox" class="event-type-checkbox"> 
                    <p class="event-type-name">{{ superType }}</p>

                    <ul>
                        <li v-for="subType in filteredSubEventTypes[superType]" :key="(superType, subType)">
                            <input @click="modifySelectedTypes(subType)" type="checkbox" class="event-type-checkbox"> 
                            <p class="event-type-name">{{ subType }}</p>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';

const superEventTypes = ref([]);
const subEventTypes = ref({});
const filteredSubEventTypes = computed(() => {
    let dictionary = {};
    for (let i=0; i<superEventTypes.value.length; i++) {
        let array = [];

        for (let j=0; j < subEventTypes.value[superEventTypes.value[i]].length; j++) {
            if (subEventTypes.value[superEventTypes.value[i]][j].includes(filter.value)) {
                array.push(subEventTypes.value[superEventTypes.value[i]][j]);
            }
        }
        
        dictionary[superEventTypes.value[i]] = array;
    }
    return dictionary;
});

const emit = defineEmits(['selectedTypes']);

const eventTypeList = ref([]);
const filter = ref('');

/// TEST ///
superEventTypes.value.push('Sport');
subEventTypes.value['Sport'] = ['Pallavolo', 'Basket'];
////////////

const showEventTypes = ref(false);

// FUNCTIONS

// Modify selectedTypes
function modifySelectedTypes(eventType) {
    const index = eventTypeList.value.indexOf(eventType);
    if (index < 0) {
        eventTypeList.value.push(eventType);
    }
    else {
        eventTypeList.value.splice(index, 1);
    }
}

</script>

<style scoped>
@import '../styles/event_creation.css';

#event-types-menu{
    position: absolute;
    top: 0;
    overflow: visible;
}

#event-types-menu
{
    position: relative;
    background-color: white;
    max-width: 550px;
    max-height: 200px;
    box-shadow: 0 1px 1px 1px rgb(197, 197, 197);
    border-radius: 10px;

    margin: 0 20px;
    overflow-y: scroll;
}

.event-type-name
{
    display: inline;
    margin: 5px 10px;
}
</style>