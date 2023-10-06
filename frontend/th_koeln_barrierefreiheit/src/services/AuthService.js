import axios from 'axios';

//const url = 'http://localhost:3000/api/';
//const url = 'https://barrierefreiheit-api-26d587b906f5.herokuapp.com/api/';
const url = 'http://37.120.175.2:5279/';

export default {
    login(credentials) {
        return axios
            .post(url + 'auth/login', null, {params: {username: credentials.name, password: credentials.password}, headers: {Accept: 'text/plain'}})
            .then(response => response);
    },
    signUp(credentials) {
        return axios
            .post(url + 'auth/register', null, {params: {username: credentials.name, password: credentials.password}, headers: {Accept: 'text/plain'}})
            .then(response => response);
    },
    getCurrentUser() {
      return axios
          .get(url + 'User', {headers: {Accept: 'text/plain'}})
          .then(response => response);
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
    getGuidelines(data){
        return axios
            .post(url + 'guidelines/', data)
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
    },
    getGuideline(data) {
        return axios
            .post(url + 'guideline/', data)
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
