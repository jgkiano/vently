import {
    LOGIN_VALIDATE_FAIL,
    LOGIN_NETWORK_FAIL,
    LOGIN_ONLINE_VALIDATE_FAIL,
    LOADING_STATUS,
} from '../types';

const INITIAL_STATE =  {
    errorMsg: "",
    inputError: {
        email: false,
        pass: false
    },
    loading: false,
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOGIN_VALIDATE_FAIL:
            return { ...state, errorMsg: action.payload.errorMsg, inputError: action.payload.inputError};
        case LOADING_STATUS:
            return {...state, loading: action.payload.loading, networkError: action.payload.networkError};
        case LOGIN_ONLINE_VALIDATE_FAIL:
            return {...state, loading: action.payload.loading, errorMsg: action.payload.errorMsg, inputError: action.payload.inputError}
        case LOGIN_NETWORK_FAIL:
            return {...state, networkError: action.payload.networkError, loading: action.payload.loading};
        default:
            return state;
    }
}
