import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            console.log('start fetch genders', action);
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            console.log('success fetch genders', action);

            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('failed fetch genders', action);
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            console.log('success fetch position', action);
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            console.log('failed fetch position', action);
            state.positions = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            console.log('success fetch role', action);

            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            console.log('failed fetch role', action);
            state.roles = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            console.log('vao top doctor success');
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            console.log('vao top doctor failed');
            state.topDoctors = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDoctors;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default adminReducer;
