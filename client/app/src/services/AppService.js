import axios from './AxiosConfig';
import userService from './UserService';


function getApplications(){

    return axios.get('/user/application');

};

function changeStatus(appId, newStatus){
    let data = {
        status : newStatus,
    }
    return axios.post(`/user/application/${appId}/edit`, data);
}

const service = {
    getApplications : getApplications,
    changeStatus : changeStatus,
};

export default service;