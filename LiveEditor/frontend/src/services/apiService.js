import axios from 'axios';

const url = 'http://localhost:3001/api/';

export default {
    test() {
        return axios
            .get(url + 'test/')
            .then(response => response.data);
    },
    positionChange(data) {
        return axios
            .post(url + 'positionChange/', data)
            .then(response => response.data);
    },
};