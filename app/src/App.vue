<template>
    <component :is="selectedComponent"></component>
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import SignupPage from './components/SignupPage.vue'
import PrivacyPage from './components/PrivacyPage.vue'

export default({
    name:'App',
    data() {
        return {
            /* FOR DEBUG */
            //selectedComponent: 'LoginPage',
            //selectedComponent: 'SignupPage',
            selectedComponent: 'PrivacyPage',
        }
    },
    components: {
        LoginPage,
        SignupPage,
        PrivacyPage
    }
});
</script>

<style>
body 
{
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;
}

#app
{
    height: 100%;
}
</style>