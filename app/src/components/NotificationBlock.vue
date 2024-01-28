<template>
    <div id="notification-block">
        <div id="notification-img">
            <img src="../assets/concert.jpeg">
        </div>
        <div id="notification-text">
            <header>
                Titolo
            </header>
            <p>
                Testo
            </p>
        </div>
    </div>
</template>

<style scoped>
#notification-block
{
    width: 100%;
    height: 100px;
    background-color: white;
    border: 1px solid grey;
}

#notification-img
{
    display: inline-block;
    margin: 10px 10px;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    overflow-x: hidden;
    overflow-y: hidden;
    justify-content: start;
    box-shadow: 0 2px 1px 1px rgb(154, 154, 154);
}

#notification-text
{
    display: inline-block;
    height: 80px;
    margin: 10px 10px;
    vertical-align: top;
    padding: 15px 0;
}

#notification-text header
{
    font-size: 20px;
    vertical-align: bottom;
}

#notification-text p
{
    font-size: 16px;
    vertical-align: middle;
    margin: 2px 15px;
}

#notification-img img
{
    height: 80px;
    margin-left: -50%;
}
</style>