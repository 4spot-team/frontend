<template>
    <div id="accept-policies">
        <div id="accept-header">
            Accept Policies
        </div>

        <p style="text-align: center;">
           Devi accettare i 
           <a href='/policies'>termini e condizioni</a>
            per poter proseguire.
        </p>

        <button @click="acceptPolicies" id="accept-btn">
            Accetta
        </button>

    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    
    import { backendApiBaseUrl } from '@/states/backendInfo';
    import { useLoggedUser } from '@/states/loggedUser';

    const router = useRouter();

    const loggedUser = useLoggedUser();

    function acceptPolicies() {
        fetch(backendApiBaseUrl + '/accept-terms', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',  
                'Authorization': loggedUser.getToken
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                console.log(data.message); 
                router.go();
            }
            else {
                console.log(data.message); // DEBUG
            }
        })
        .catch((err) => {
            console.log(err);   // DEBUG
        })
    }
</script>

<style scoped>
    #accept-policies
    {   
        position: relative;

        background: linear-gradient(180deg, rgba(255,255,255,0.8464635854341737) 0%, rgba(255,255,255,0) 100%);    
        border: 0px;
        height: 40%;
        width: 40%;

        max-height: 300px;
        /* max-width: 300px; */

        padding: 20px 20px;
        text-align: center;
    }

    #accept-header
    {
        margin-bottom: 30px; /* Separate from body */
        text-align: center;
        font-size: 30px;
    }

    #accept-btn
    {
        position: relative;
        margin-top: 10%;
        

        background-color: rgb(197, 197, 197);
        box-shadow: 0 3px 2px 2px rgb(154, 154, 154); 
        
        height: 40px;
        width: 50%;
        max-width: 190px;
        
        border: none;
        border-radius: 20px;

        text-align: center;
        font-size: 20px;

    }
    
    #accept-btn:hover
    {
        background-color: rgb(202, 202, 202);
        box-shadow: 0 2.5px 1.5px 1.5px rgb(169, 169, 169);
    }
</style>