<template>
    <img class="logo" src="../assets/logo.png" alt="Logo 4Spot"> 

    <div class="decorativeBox"> <!-- Blocco bianco decorativo sotto il form -->

        <p class="titoloPagina"> Registrati per iniziare a condividere i tuoi eventi. </p>

        <form class="authForm"> <!-- form action = "?????" method = "post"--> <!-- Form login -->
            <p>
                <label for = "email"> Email </label> <br>
                <input v-model="email" type = "text" id = "email" name = "email" placeholder = "Email" required> <br>
            </p>

            <p>
                <label for = "username"> Username </label> <br>
                <input v-model="username" type = "text" id = "username" name = "username" placeholder = "Username" required> <br>
            </p>

            <p>
                <label for = "password"> Password </label> <br>
                <input v-model="password" type = "password" id = "password" name = "password" placeholder = "Password" required> <br>
                <i class="bi bi-eye-slash" id="togglePassword"></i>
            </p>

            <input @click="submit" type="submit" class="submitButton" value="Registrati">
        </form>

        <p class="informativaPrivacy">
            Iscrivendoti, accetti le nostre <a href="privacy.html">Condizioni</a>. Scopri in che modo raccogliamo,
            usiamo e condividiamo i tuoi dati consultando la nostra Informativa sulla privacy 
            e la nostra Informativa sui cookie.
        </p>
        
    ls      <p>
            <a href="login.html"> Hai già un account? Login </a>
        </p>

    </div> <!-- Fine decorative box -->
</template>

<script setup>
import { onMounted, ref } from 'vue';

const email = ref ('');
const username = ref('');
const password = ref('');

function submit() {
    alert(email.value + " " + username.value + " " + password.value);
}

onMounted(() => {
    document.body.style.backgroundImage = "url('./assets/signupBackground.jpg')";
});
</script>

<style scoped>
@import '../styles/site.css';

.informativaPrivacy
{
    font-size: xx-small;
}

</style>