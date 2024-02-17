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

const deleteUser = (id) => {
    return axios.delete('/api/delete-user', {
        data: {
            id,
        },
    });
};

const editUser = (data) => {
    return axios.put('/api/edit-user', data);
};

export { handleLogin, getAllUSers, createNewUser, deleteUser, editUser };
