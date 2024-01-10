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
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';

    import EventPage from './EventPage.vue';
    import ContainerHeader from './ContainerHeader.vue';
    import ContainerNavlist from './ContainerNavlist.vue';

    import { useLoggedUser } from '../states/loggedUser';
    import { backendApiBaseUrl } from '@/states/backendInfo';
    
    const router = useRouter();

    const events = ref([]);
    const loggedUser = useLoggedUser();

    onMounted(() => {
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
                events.value.concat(data.events);
            }
            else if (data.message === 'Authentication token missing') {
                router.push('/login');
            }
            else {
                alert(data.message);
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