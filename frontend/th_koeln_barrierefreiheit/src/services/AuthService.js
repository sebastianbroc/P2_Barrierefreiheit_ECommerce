import axios from 'axios';

//const url = 'http://localhost:3000/api/';
const url = 'https://api.burnoutstud.io/';

export default {
    login(credentials) {
        return axios
            .post(url + 'auth/login/', credentials)
            .then(response => response);
    },
    signUp(credentials) {
        return axios
            .post(url + 'auth/register/', credentials)
            .then(response => response);
    },
    getUser() {
        return axios
            .get(url + 'User/')
            .then(response => response)
    },
    updateUser(data) {
        return axios
            .put(url + 'User/', data)
            .then(response => response)
    },
    getGuidelines(){
        return axios
            .get(url + 'Guideline/GetAll/')
            .then(response => response)
    },
    getUserGuidelines(data) {
        
        // fetch from user/guidelines
        return axios
            .post(url + 'userGuidelines/', data)
            .then(response => response)
    },
    getUserActivity(data) {
        return axios
            .post(url + 'userActivity/', data)
            .then(response => response)
    },
    saveGuideline(data) {
        return axios
            .post(url + 'Guideline/', data)
            .then(response => response)
    },
    getGuideline(data) {
        return axios
            .get(url + 'guideline/' + data.guideline_id)
            .then(response => response)
    },
    approveGuideline(data) {
        return axios
            .post(url + 'approveGuideline/', data)
            .then(response => response)
    },
    revertApproval(data) {
        return axios
            .post(url + 'revertApproval/', data)
            .then(response => response)
    },
    saveAnnotation(data) {
        return axios
            .post(url + 'saveAnnotation/', data)
            .then(response => response)
    },
    deleteAnnotation(data) {
        return axios
            .post(url + 'deleteAnnotation/', data)
            .then(response => response)
    },
    getAnnotation(data) {
        return axios
            .post(url + 'getAnnotation/', data)
            .then(response => response)
    },
    voteAnnotation(data) {
        return axios
            .post(url + 'voteAnnotation/', data)
            .then(response => response)
    }
};
