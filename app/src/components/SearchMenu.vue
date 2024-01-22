<template>
    <div @mouseover="showMenu=true" 
        @mouseleave="showMenu=false"
        id="search-menu"
    >
        <input @input="search" v-model="query" id="search-input" placeholder="Cerca">

        <div v-show="showMenu" id="results-menu">
            <div class="result-type">
                Eventi
            </div>
            <ul class="search-result">
                <li v-if="foundEvents.length===0" >Nessun evento</li>
                <li v-else v-for="event in foundEvents" v-bind:key="event.id">
                    {{ event.title }}
                </li>
            </ul>

            <div class="result-type">
                Utenti
            </div>
            <ul class="search-result">
                <li v-if="foundUsers.length === 0">Nessun utente</li>
                <li v-else v-for="user in foundUsers" v-bind:key="user.username">
                    @{{ user.username }}
                </li>
            </ul>
            
            <div class="result-type">
                Tipologie di eventi
            </div>
            <ul class="search-result">
                <li v-if="foundEventTypes.length===0">Nessuna tipologia</li>
                <li v-else v-for="eventType in foundEventTypes" v-bind:key="eventType.name">
                    {{ eventType.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    import { useLoggedUser } from '../states/loggedUser';
    import { backendApiBaseUrl } from '@/states/backendInfo';

    const loggedUser = useLoggedUser();

    const query = ref('');

    const showMenu = ref(false);

    const foundEvents = ref([]);
    const foundUsers = ref([]);
    const foundEventTypes = ref([]);

    function search() {
        fetch(backendApiBaseUrl + '/home', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',  
                'Authorization': loggedUser.getToken
            },
            body: JSON.stringify({ query: query.value })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                foundEvents.value = data.events;
                foundUsers.value = data.users;
                foundEventTypes.value = data.generalEvents;
            }
        })
        .catch((err) => {
            console.log(err);   // DEBUG
        })
    }

    onMounted(search);
</script>

<style scoped>
#search-menu
{
    position: absolute;
    top: 0;
    padding: 5px 0px;
    width: 100%;
    overflow: visible;
}

#search-input
{
    position: relative;
    color: inherit;
    font-size: 22px;
    width: 30%;
    max-width: 300px;
    margin: 10px 50px;
    padding: 10px 2%;
    border: 5px;
    box-shadow: 0 3px 2px 2px rgb(197, 197, 197);
    border-radius: 20px;
}

#results-menu
{   
    overflow: hidden;
    overflow-y: scroll;
    background-color: white;
    width: 50%;
    max-width: 550px;
    margin: 10px 50px;
    padding: 20px 20px;
    /* min-height: 60px; */
    max-height: 200px;
    /* box-shadow: 0 3px 2px 2px rgb(197, 197, 197); */
    border-radius: 10px;
}

.result-type
{
    font-size: 18px;
    color: rgb(78, 78, 78);
    border-bottom: 1px solid rgb(173, 173, 173);
}

.search-result
{
    margin: 20px 0;
}
</style>