import axios from 'axios';

//const url = 'http://localhost:3000/api/';
const url = 'https://api.burnoutstud.io/';

export default {
    login(credentials) {
        return axios
            .post(url + 'auth/login/', credentials)
            .then(response => response.data);
    },
    signUp(credentials) {
        return axios
            .post(url + 'auth/register/', credentials)
            .then(response => response.data);
    },
    getUser() {
        return axios
            .get(url + 'User/')
            .then(response => response.data)
    },
    updateUser(data) {
        return axios
            .put(url + 'User/', data)
            .then(response => response.data)
    },
    getGuidelines(){
        return axios
            .get(url + 'Guideline/GetAll/')
            .then(response => response.data)
    },
    getUserGuidelines(data) {
        
        // fetch from user/guidelines
        return axios
            .post(url + 'userGuidelines/', data)
            .then(response => response.data)
    },
    saveGuideline(data) {
        return axios
            .post(url + 'Guideline/', data)
            .then(response => response.data)
    },
    getGuideline(data) {
        return axios
            .get(url + 'guideline/' + data.guideline_id)
            .then(response => response.data)
    },
    approveGuideline(data) {
        return axios
            .post(url + 'approveGuideline/', data)
            .then(response => response.data)
    },
    revertApproval(data) {
        return axios
            .post(url + 'revertApproval/', data)
            .then(response => response.data)
    },
    saveAnnotation(data) {
        return axios
            .post(url + 'saveAnnotation/', data)
            .then(response => response.data)
    },
    getAnnotation(data) {
        return axios
            .post(url + 'getAnnotation/', data)
            .then(response => response.data)
    },
    voteAnnotation(data) {
        return axios
            .post(url + 'voteAnnotation/', data)
            .then(response => response.data)
    }
};
