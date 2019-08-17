import axios from 'axios';

const api = axios.create({
    baseURL:'https://tindev-backend-wilkor.herokuapp.com'
})


export default api;
