import { defineStore } from 'pinia';

export const useLoggedUser = defineStore('user', {
    state: () => {
        if (localStorage.getItem('user') !== undefined)
            return JSON.parse(localStorage.getItem('user'));
        return {
            username: '',
            token: ''
        }
    },
    getters: {
        getUsername() {
            return this.username;
        },
        getToken() {
            return this.token;
        }
    },
    actions: {
        isAuthenticated() {
            return (typeof this.token === 'string' && this.token !== '');
        },
        setUsername(username) {
            this.username = username;
        },
        setToken(token) {
            this.token = token;
        }
    }
});