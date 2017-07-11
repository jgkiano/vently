import {
    RECEIVE_TOKEN,
    GET_PROFILE,
    FIRST_NAME_CHANGE,
    LAST_NAME_CHANGE,
    EMAIL_CHANGE,
    PHONE_CHANGE,
} from '../types';

const INITIAL_STATE = {
    data: null
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case RECEIVE_TOKEN:
            return {...state, token: action.payload.token};
        case GET_PROFILE:
            return {...state, data: action.payload };
        case FIRST_NAME_CHANGE: {
            const data = {...state.data, firstname: action.payload }
            return {...state, data };
        }
        case LAST_NAME_CHANGE: {
            const data = {...state.data, lastname: action.payload }
            return {...state, data };
        }
        case EMAIL_CHANGE: {
            const data = {...state.data, email: action.payload }
            return {...state, data };
        }
        case PHONE_CHANGE: {
            const data = {...state.data, phone: action.payload }
            return {...state, data };
        }
        default:
            return state;
    }
}
