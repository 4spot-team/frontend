import { reactive } from 'vue';

const loggedUser = reactive({
    username: "",
    token: ""
});

function setData(data) {
    loggedUser.username = data.username;
    loggedUser.token = data.token;
}

function resetData() {
    loggedUser.username = "";
    loggedUser.token = "";
}

function setUsername(username) {
    loggedUser.username = username;
}

function resetUsername() {
    loggedUser.username = "";
}

function setToken(token) {
    loggedUser.token = token;
}

function resetToken() {
    loggedUser.token = "";
}

export {
    loggedUser,
    setData,
    resetData,
    setUsername,
    resetUsername, 
    setToken,
    resetToken
}