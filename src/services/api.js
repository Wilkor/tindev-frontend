import axios from 'axios';

const api = axios.create({
    baseURL:'https://tindev-wilkor-backend.herokuapp.com'
})


export default api;
