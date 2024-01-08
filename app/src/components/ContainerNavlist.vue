<template>
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
</template>

<style scoped>
/* @import '../styles/site2.css'; */

#nav
{
    background-color: rgb(68, 68, 68);
    color: white;
    position: absolute;
    height: 100%;
    width: 25%;
    left: 0;
    bottom: 0;
}
.navList
{
    list-style-type: none;
    height: 25%;
    text-align: left;
    font-size: 20px;
    margin-top: 30px;
    padding-left: 0px;
}

.navList li
{
    padding-left: 30px;
    margin-bottom: 30px;
    padding-bottom: 30px;
    width:100%;
    border-bottom: 1px solid white;
}

.listImg
{
    width: 30px;
    vertical-align: middle;
}
</style>