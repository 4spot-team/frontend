<template>
    <router-view></router-view>
</template>

<script>
export default({
    name:'App',
    data() {
        return {
            /* FOR DEBUG */
            //selectedComponent: 'LoginPage',
            //selectedComponent: 'SignupPage',
            //selectedComponent: 'PrivacyPage',
        }
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