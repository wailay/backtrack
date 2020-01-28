import axios from './AxiosConfig';



function checkAuth() {

    return axios.get('/auth');
}

function login(data) {

    return axios.post('/auth/login', data);


}
function logout() {
    return axios.get('auth/logout');
}

function signup(data) {
    return axios.post('auth/signup', data);
}
function getUser() {

    return axios.get('/user/me');


};


const service = {
    getUser: getUser,
    checkAuth: checkAuth,
    login: login,
    signup: signup,
    logout: logout,

}

export default service;