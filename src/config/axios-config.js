import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://dmclavelproject.com'
});

export default axiosConfig;