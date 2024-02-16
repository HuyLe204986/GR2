import axios from '../axios';

const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password });
};

const getAllUSers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUser = (data) => {
    return axios.post('/api/cerate-new-user', data);
};

export { handleLogin, getAllUSers, createNewUser };
