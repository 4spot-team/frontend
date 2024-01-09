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

                <input @click.prevent="submit" type="submit" class="submitButton" value="Accedi">
            </form> 
        </div>

        <p>
            <a href="passwordrecover">Password dimenticata?</a>
        </p>
        
        <p>
            <a href="signup">Non hai ancora un account? Iscriviti.</a>
        </p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { setUsername, setToken } from '../states/loggedUser';
import { backendApiBaseUrl } from '../states/backendInfo';

const username = ref('');
const password = ref('');

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
            setToken(data.token);
            setUsername(username.value);
            window.location.href = '/home';   
        }
        else {
            alert(data.message);
        }
    })
    .catch((err) => {
        console.log('Error:', err);
    });
}

onMounted(() => {
    document.body.style.backgroundImage = "url('./assets/loginBackground.jpg')";
});

</script>

<style scoped>
@import '../styles/intro.css';
</style>