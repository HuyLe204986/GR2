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

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};

const getExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data);
};

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data);
};

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data);
};

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
};

const getDetailSpecialtyById = (id, location) => {
    return axios.get(`/api/get-detail-special-by-id?id=${id}&location=${location}`);
};

const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data);
};

const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`);
};

const getDetailClinicById = (id) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${id}`);
};

const getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
};

const sendRemedy = (data) => {
    return axios.post('/api/send-remedy', data);
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
    getScheduleDoctorByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    createNewClinic,
    getAllClinic,
    getDetailClinicById,
    getListPatientForDoctor,
    sendRemedy,
};
