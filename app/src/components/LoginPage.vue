<template>
    <div id="intro-header">
        <img class="logo" src="../assets/logo.png" alt="Logo 4Spot"> 
    </div>

    <div class="decorativeBox">
    
        <p class="titoloPagina"> Accedi al tuo account </p>  
        
        <div class="input-div">
            <form class="authForm"> <!-- form action = "?????" method = "post"--> <!-- Form login -->
                <p class="input-section">
                    <label for = "username"> Username </label> <br>
                    <input v-model="username" type = "text" id = "username" name = "username" placeholder = "Username" required> <br>
                </p>

                <p class="input-section">
                    <label for = "password"> Password </label> <br>
                    <input v-model="password" type = "password" id = "password" name = "password" placeholder = "Password" required> <br>
                    <i class="bi bi-eye-slash" id="togglePassword"></i>
                </p>

                <input @click.stop.prevent="submit" type="submit" class="submitButton" value="Accedi">
            </form> 
        </div>

        <p>
            <a class="intro-a" href="/passwordrecover">Password dimenticata?</a>
        </p>
        
        <p>
            <a class="intro-a" href="/signup">Non hai ancora un account? Iscriviti.</a>
        </p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useLoggedUser } from '../states/loggedUser.js';
import { backendApiBaseUrl } from '../states/backendInfo';

const username = ref('');
const password = ref('');

const router = useRouter();
const loggedUser = useLoggedUser();

function submit() { 
    fetch(backendApiBaseUrl + '/login', {
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify({ username: username.value, password: password.value })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Data:', data);

        if (data.message === 'Authentication successful') {
            loggedUser.setUsername(username.value);
            loggedUser.setToken(data.token);
            router.push('/');
        }
        else {
            alert(data.message !== undefined ? data.message : data.errors[0].msg);    // JUST FOR NOW
        }
    })
    .catch((err) => {
        console.log('Error:', err);
    });
}

onMounted(() => {
    document.body.style.backgroundImage = "url('/assets/loginBackground.jpg')";
});

</script>

<style scoped>
@import '../styles/intro.css';
</style>