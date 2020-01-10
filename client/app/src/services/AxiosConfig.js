import axios from 'axios';
import env from '../environment/environment';

const axiosInstance = axios.create({
    baseURL : env.API_URL,
    withCredentials : true,
});


export default axiosInstance;