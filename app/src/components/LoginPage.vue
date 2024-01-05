<template>
    <img class="logo" src="../assets/logo.png" alt="Logo 4Spot"> 

    <div class="decorativeBox">
    
        <p class="titoloPagina"> Accedi al tuo account </p>  

        <form class="authForm"> <!-- form action = "?????" method = "post"--> <!-- Form login -->
            <p>
                <label for = "username"> Username </label> <br>
                <input v-model="username" type = "text" id = "username" name = "username" placeholder = "Username" required> <br>
            </p>

            <p>
                <label for = "password"> Password </label> <br>
                <input v-model="password" type = "password" id = "password" name = "password" placeholder = "Password" required> <br>
                <i class="bi bi-eye-slash" id="togglePassword"></i>
            </p>

            <input @click="submit" type="submit" class="submitButton" value="Accedi">
        </form> 

        <p>
            <a href="passwordrecover.html">Password dimenticata?</a>
        </p>
        
        <p>
            <a href="signup.html">Non hai ancora un account? Iscriviti.</a>
        </p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const username = ref('');
const password = ref('');

function submit() { // For testing
    alert("The username is " + username.value + "\n" + "Password is " + password.value);
}

onMounted(() => {
    document.body.style.backgroundImage = "url('./assets/loginBackground.jpg')";
});

</script>

<style scoped>
@import '../styles/site.css';

header
{
    margin-top: 5%;
    font-size: x-large;
    margin-bottom: 5%;
    position: absolute center;
}

a
{
    color: white;
    text-shadow: #262626 0.1em 0.1em 0.2em;
    font-size: x-small;
}

#username, #password
{
    margin-left: 7px;
    text-align: left;
    font-size: smaller;
}

.prova{
    color: red;
}

</style>

<!-- <style>
body 
{
    height: 100%;
    background-image: url("../assets/loginBackground.jpg") ;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
</style> -->