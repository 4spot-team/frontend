<template>
    <div id="intro-header">
        <img class="logo" src="../assets/logo.png" alt="Logo 4Spot"> 
    </div>

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

            <input @click.stop.prevent="submit" type="submit" class="submitButton" value="Registrati">
        </form>

        <p class="informativaPrivacy">
            Iscrivendoti, accetti le nostre <a href="policies">Condizioni</a>. Scopri in che modo raccogliamo,
            usiamo e condividiamo i tuoi dati consultando la nostra Informativa sulla privacy 
            e la nostra Informativa sui cookie.
        </p>
        
        <p>
            <a class="intro-a" href="login"> Hai già un account? Login </a>
        </p>

    </div> <!-- Fine decorative box -->
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoggedUser } from '../states/loggedUser';
import { backendApiBaseUrl } from '../states/backendInfo';

const router = useRouter();
const loggedUser = useLoggedUser();

const email = ref ('');
const username = ref('');
const password = ref('');

function submit() {
    fetch(backendApiBaseUrl + '/register', {
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify({ 
            username: username.value, 
            email: email.value,
            password: password.value 
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Data:', data); // DEBUG

        if (data.success) {
            loggedUser.setToken(data.token);
            loggedUser.setUsername(username.value);
            router.push('/');
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
    document.body.style.backgroundImage = "url('./assets/signupBackground.jpg')";
});
</script>

<style scoped>
@import '../styles/intro.css';

.informativaPrivacy
{
    font-size: xx-small;
}

</style>