<template>  
    <div id="container">
        <ContainerHeader />
        <div id="usable">
            <ContainerNavlist />

            <div id="component">
                <div id="home">
                    <div v-if="accepted">
                        <div id="events-list-container">
                            <div id="events-list-div">
                                <EventPage 
                                    v-for="event in events"
                                    :key="event.code"
                                    :use-props="true"
                                    :creation-process="false"
                                    :code-prop="event.code"
                                    :title-prop="event.title"
                                    :image-prop="event.image"
                                    :organiser-prop="event.organiser"
                                    :date-prop="new Date(event.date)"
                                    :location-prop="event.location.city + ', ' + event.location.address + event.location.houseNumber"
                                    :price-prop="event.price.currency + (event.price.amount !== undefined ? event.price.amount : 0).toString()"
                                    :hashtags-prop="event.hashtags"
                                    :description-prop="event.description"
                                    :comments-prop="event.comments"
                                    @show-comments-window="toggleCommentsWindow(event)"
                                />
                            </div>
                        </div>
                        
                        <SearchMenu 
                           :disabled="commentWindowActive"  
                        />

                    </div>
                    <div id="accept-policies-container" v-else>
                        <AcceptPolicies />
                    </div>
                </div>
                <CommentsWindow 
                    v-if="commentWindowActive"
                    ref="target"
                    :viewed-event="viewedEvent"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, onBeforeMount } from 'vue';
    import { useRouter } from 'vue-router';
    import { onClickOutside } from '@vueuse/core';

    import EventPage from './EventPage.vue';
    import ContainerHeader from './ContainerHeader.vue';
    import ContainerNavlist from './ContainerNavlist.vue';
    import AcceptPolicies from './AcceptPolicies.vue';
    import SearchMenu from './SearchMenu.vue';
    import CommentsWindow from './CommentsWindow.vue';

    import { useLoggedUser } from '../states/loggedUser';
    import { backendApiBaseUrl } from  '@/states/backendInfo';

    import { urlToBase64 } from '../middlewares/imagesHandling';
    
    const router = useRouter();

    const events = ref([]);
    const loggedUser = useLoggedUser();

    // For policy acceptance
    const accepted = ref(true);

    // For comment window
    const commentWindowActive = ref(false);
    const viewedEvent = ref(null);

    // Click outside comment window
    const target = ref(null);
    onClickOutside(target, () => toggleCommentsWindow());

    /// TEST ///
    // Example Event
    const exampleOrganizer = {
        username: 'comunedirovereto'
    }
    const exampleEvent = {
        code: '1',
        title: "Concerto fine anno",
        image: '',
        organiser: exampleOrganizer,
        location: 'Rovereto',
        date: new Date(1706820350),
        price: '€15',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        hashtags: ['rovereto', 'festa', 'concerto'],
        comments: []
    };
    events.value.push(exampleEvent);
    events.value.push(exampleEvent);
    /////////////

    onBeforeMount(() => {
        /// DEBUG ///
        urlToBase64('../assets/concert.jpeg')
        .then((base64String) => {
            console.log(base64String);
            exampleEvent.value.image = base64String;
        })
        .catch((err) => {
            console.log(err);
        })
    });

    onMounted(() => {
        // Remove Background Image
        document.body.style.backgroundImage = null;

        console.log('Logged User:', loggedUser.getUsername); // DEBUG
        console.log('Logged Token:', loggedUser.getToken); // DEBUG

        fetch(backendApiBaseUrl + '/home', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',  
                'Authorization': loggedUser.getToken
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('Data:', data); // DEBUG

            if (data.success) {
                accepted.value = true;
                events.value = data.events;
            }
            else if (data.message === 'Authentication token missing') {
                router.push('/login');
            }
            else {
                accepted.value = false;
            }
        })
        .catch((err) => {
            console.log('Error:', err);
        })
    });

    // Toggle comments window
    function toggleCommentsWindow(event) {
        if (commentWindowActive.value) {    // Hide
            commentWindowActive.value = false;
            viewedEvent.value = null;
            document.getElementById('events-list-container').style.overflowY = 'scroll';
            document.getElementById('home').style.filter = 'brightness(1)';
        }
        else {  // Show
            viewedEvent.value = event;
            commentWindowActive.value = true;
            document.getElementById('events-list-container').style.overflowY = 'hidden';
            document.getElementById('home').style.filter = 'brightness(0.7)';
        }
    }
</script>

<style scoped>
@import '../styles/container.css';

#home
{
    position: absolute;
    background-color: rgb(229, 229, 229);
    width: 100%;
    height: 100%;
    
    padding: 0 0;
}

#events-list-container
{
    position: absolute;
    top: 80px;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    filter: brightness(1);
}

#events-list-div
{
    position: relative;
    background-color: white;
    border-radius: 20px;
    padding-top: 30px;
    margin: 30px 40px;
}

#accept-policies-container
{
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;  
    justify-content: center;  
    align-items: center;  
}
</style>