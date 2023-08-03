import axios from 'axios';

const url = 'http://localhost:3000/api/';

export default {
    login(credentials) {
        return axios
            .post(url + 'login/', credentials)
            .then(response => response.data);
    },
    signUp(credentials) {
        return axios
            .post(url + 'sign-up/', credentials)
            .then(response => response.data);
    },
    getUser(data) {
        return axios
            .post(url + 'returnUser/', data)
            .then(response => response.data)
    },
    updateUser(data) {
        return axios
            .post(url + 'updateUser/', data)
            .then(response => response.data)
    },
    getUserGuidelines(data) {
        return axios
            .post(url + 'userGuidelines/', data)
            .then(response => response.data)
    },
    saveGuideline(data) {
        return axios
            .post(url + 'saveGuideline/', data)
            .then(response => response.data)
    }
};
