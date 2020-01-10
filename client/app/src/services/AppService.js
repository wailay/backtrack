import axios from './AxiosConfig';
import userService from './UserService';


function getApplications(){

    return axios.get('/user/application');

};

const service = {
    getApplications : getApplications,
};

export default service;