<template>
    <div id="intro-header">
        <img class="logo" src="../assets/logo.png" alt="Logo 4Spot"> 
    </div>

    <div class="decorativeBox">
    
        <p class="titoloPagina"> Recupera la tua Password </p>  
        
        <div class="input-div">
            <form class="authForm"> <!-- form action = "?????" method = "post"--> <!-- Form login -->
                <!-- Input section for email -->
                <p class="input-section">
                    <label for = "email"> Email </label> <br>
                    <input v-model="email" type = "text" id = "email" name = "email" placeholder = "Email" required> <br>
                </p>
                <input type="submit" class="submitButton" value="Invia email"
                    style="margin-top: 20px;" @click.stop.prevent="sendEmail"
                >
            </form> 
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { backendApiBaseUrl } from '../states/backendInfo';

const email = ref('');

onMounted(() => {
    document.body.style.backgroundImage = "url('/assets/loginBackground.jpg')";
});

// REACTIVE FUNCTIONS

// Send email
function sendEmail() {
    fetch(backendApiBaseUrl + '/recover', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ email: email.value })
    })
    .then((res) => res.json())
    .then((data) => {
        alert(data.message !== undefined ? data.message : data.errors[0].msg);    // JUST FOR NOW
    })
    .catch((err) => {
        console.log(err)
    }) 
}
</script>

<style scoped>
@import '../styles/intro.css';
</style>