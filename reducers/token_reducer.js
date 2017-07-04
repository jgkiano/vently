import {
    FETCH_TOKEN,
    FETCH_TOKEN_ERROR
} from '../types';

const INITIAL_STATE = {
    token: null,
    error: null
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_TOKEN:
            return { token: action.payload };
        case FETCH_TOKEN_ERROR:
            return { error: true };
        default:
            return state;
    }
}
