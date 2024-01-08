<template>
    <div id="container">
        <div id="container-header">
            <img src="../assets/logo.png" height="70%" id="headLogo">
        </div>

        <div id="usable">
            <div id="nav">
                <ul class="navList">
                    <li> 
                        <img src="../assets/profile-user.png" class="listImg">
                        &emsp;
                        Profilo 
                    
                    </li>
                    <li> 
                        <img src="../assets/location.png" class="listImg">
                        &emsp;
                        Esplora 
                    </li>
                    <li> 
                        <img src="../assets/send.png" class="listImg">
                        &emsp;
                        Messaggi 
                    </li>
                    <li> 
                        <img src="../assets/bell.png" class="listImg">
                        &emsp;
                        Notifiche 
                    </li>
                </ul>
            </div>  

            <div id="component">
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>

<script setup>
</script>

<script>
export default {
    props: ['currentPage']
}
</script>

<style scoped>
@import '../styles/site2.css';
@import '../styles/container.css';
</style>