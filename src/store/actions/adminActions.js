import actionTypes from './actionTypes';
import { userService } from '../../services';
import { toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            });
            let res = await userService.getAllCode('gender');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('error fetchGenderStart', e);
        }
    };
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCode('position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('error fetchPositionFailed', e);
        }
    };
};

export const fetchPositionSuccess = (posititonData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: posititonData,
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCode('role');
            console.log('check role', res);
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('error fetchRoleFailed', e);
        }
    };
};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.createNewUser(data);
            console.log('check create user redux', res);
            if (res && res.errCode === 0) {
                toast.success('Create a new user successfully');
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('error saveUserFailed', e);
        }
    };
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUSers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                toast.error('Fetch all user failed');
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            toast.error('Fetch all user failed');
            dispatch(fetchAllUserFailed());
            console.log('error fetchAllUserFailed', e);
        }
    };
};

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data,
});

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.deleteUser(userId);
            if (res && res.errCode === 0) {
                toast.success('Delete user successfully');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error('Delete user failed');
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error('Delete user failed');
            dispatch(deleteUserFailed());
            console.log('error deleteUserFailed', e);
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.editUser(data);
            if (res && res.errCode === 0) {
                toast.success('Update user successfully');
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error('Update user failed');
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error('Update user failed');
            dispatch(editUserFailed());
            console.log('error UpdateUserFailed', e);
        }
    };
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getTopDoctorHome('');
            console.log('check res top doctor', res);
            if (res && res.errCode === 0) {
                console.log('check ok top doctor', res);
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                });
            }
        } catch (error) {
            console.log('error fetchTopDoctor failed', error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            });
        }
    };
};

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                });
            }
        } catch (error) {
            console.log('error fetchAllDoctors failed', error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            });
        }
    };
};

export const  saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.saveDetailDoctor(data);
            if (res && res.errCode === 0) {
                toast.success("Save detail doctor successfully")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
            } else {
                toast.error("Save detail doctor error")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            toast.error("Save detail doctor error")
            console.log('error saveDetailDoctor failed', error);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            });
        }
    };
};

