import axios from './AxiosConfig';



function checkAuth() {
    
    return axios.get('/auth');
}

function login(data){
    
    axios.post('/auth/login', data).then(res => {
        console.log('login', res);
        return true;
    }).catch(err => {
        return false;
    });

    
}
function logout(){
    return axios.get('auth/logout');
}
function getUser(){
    
    return axios.get('/user/me');

    
}; 


const service = {
    getUser : getUser,
    checkAuth : checkAuth,
    login : login,
    logout : logout,

}

export default service;