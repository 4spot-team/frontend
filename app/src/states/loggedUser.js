import { defineStore } from 'pinia';

export const useLoggedUser = defineStore('user', {
    state: () => ({
        username: '',
        token: ''
    }),
    getters: {
        getUsername() {
            return this.username;
        },
        getToken() {
            return this.token;
        }
    },
    actions: {
        setUsername(username) {
            this.username = username;
        },
        setToken(token) {
            this.token = token;
        }
    }
});

