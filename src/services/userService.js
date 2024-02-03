import axios from '../axios';

export const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password });
};

export const getAllUSers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};
