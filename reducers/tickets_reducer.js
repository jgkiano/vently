import {
    RECEIVE_TOKEN,
    GET_TICKETS
} from '../types';

const INITIAL_STATE = {
    data: null
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case RECEIVE_TOKEN:
            return {...state, token: action.payload.token};
        case GET_TICKETS:
            return {...state, data: action.payload };
        default:
            return state;
    }
}
