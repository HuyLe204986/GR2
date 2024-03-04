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

const getAllCode = (type) => {
    return axios.get(`/api/allcode?type=${type}`);
};

const getTopDoctorHome = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctor = (data) => {
    return axios.post('/api/save-infor-doctors', data);
};

const getDetailDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
};
export {
    handleLogin,
    getAllUSers,
    createNewUser,
    deleteUser,
    editUser,
    getAllCode,
    getTopDoctorHome,
    getAllDoctors,
    saveDetailDoctor,
    getDetailDoctor,
    saveBulkScheduleDoctor,
};
