import axios from './AxiosConfig';


function getApplications(){

    return axios.get('/user/application');

};

function changeStatus(appId, newStatus){
    let data = {
        status : newStatus,
    }
    return axios.post(`/user/application/${appId}/edit`, data);
}

function addApplication(data){
    let newApp = {
        app : data,
    }
    return axios.post('/user/application/add', newApp);
}

function deleteApplication(appId){

    return axios.delete(`/user/application/${appId}`);
}

const service = {
    getApplications : getApplications,
    changeStatus : changeStatus,
    addApplication : addApplication,
    deleteApplication : deleteApplication,
};

export default service;