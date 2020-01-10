import axios from './AxiosConfig';



function getCompanies(){
    return axios.get('/company');
}



const service = {
    getCompanies : getCompanies,
}

export default service;