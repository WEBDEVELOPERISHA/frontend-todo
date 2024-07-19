import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8180',
   
    // good choice
    
});

export default instance;