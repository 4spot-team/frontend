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
                                <EventPage />
                                <EventPage />
                            </div>
                        </div>
                        
                        <SearchMenu />

                    </div>
                    <div id="accept-policies-container" v-else>
                        <AcceptPolicies />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';

    import EventPage from './EventPage.vue';
    import ContainerHeader from './ContainerHeader.vue';
    import ContainerNavlist from './ContainerNavlist.vue';
    import AcceptPolicies from './AcceptPolicies.vue';
    import SearchMenu from './SearchMenu.vue';

    import { useLoggedUser } from '../states/loggedUser';
    import { backendApiBaseUrl } from '@/states/backendInfo';
    
    const router = useRouter();

    //const filter = ref('');
    const events = ref([]);
    const loggedUser = useLoggedUser();

    // For policy acceptance
    const accepted = ref(true);


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
                events.value.concat(data.events);
            }
            else if (data.message === 'Authentication token missing') {
                router.push('/login');
            }
            else {
                //alert(data.message);
                accepted.value = false;
            }
        })
        .catch((err) => {
            console.log('Error:', err);
        })
    });
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
    /* overflow-y: scroll; */
}

#events-list-container
{
    position: absolute;
    top: 80px;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}

#events-list-div
{
    position: absolute;
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