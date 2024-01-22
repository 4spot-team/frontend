<template>
    <div id="intro-header">
        <img class="logo" src="../assets/logo.png" alt="Logo 4Spot"> 
    </div>

    <div class="decorativeBox">
    
        <p class="titoloPagina"> Recupera la tua Password </p>  
        
        <div class="input-div">
            <form class="authForm"> <!-- form action = "?????" method = "post"--> <!-- Form login -->

                <!-- Input section for password -->
                <p class="input-section">
                    <label for = "password"> Password </label> <br>
                    <input v-model="password" type = "password" id = "password" name = "password" placeholder = "Password" required> <br>
                    <i class="bi bi-eye-slash" id="togglePassword"></i>
                </p>
                <p class="input-section">
                    <label for = "password"> Ripeti Password </label> <br>
                    <input v-model="repeatedPassword" type = "password" id = "password" name = "password" placeholder = "Ripeti Password" required> <br>
                    <i class="bi bi-eye-slash" id="togglePassword"></i>
                </p>
                <input type="submit" class="submitButton" value="Cambia Password"
                    style="margin-top: 20px;" @click.stop.prevent="resetPassword"
                >
            </form> 
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { backendApiBaseUrl } from '../states/backendInfo';

const route = useRoute();

const password = ref('');
const repeatedPassword = ref('');

onMounted(() => {
    document.body.style.backgroundImage = "url('/assets/loginBackground.jpg')";
    alert(route.params.token);
});

// Reset password
function resetPassword() {
    if (password.value !== repeatedPassword.value) {
        alert('Le password non coincidono')
    }
    else {
        fetch(backendApiBaseUrl + '/recover/' + 
            route.params.token, {
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json',  
            },
            body: JSON.stringify({ password: password.value })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                alert(data.message);
            }
            else {
                alert(data.message !== undefined ? data.message : data.errors[0].msg);    // JUST FOR NOW
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
</script>

<style scoped>
@import '../styles/intro.css';
</style>