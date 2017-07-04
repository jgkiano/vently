import {
    FETCH_TOKEN_ERROR
} from '../types';

const INITIAL_STATE = {
    error: null
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_TOKEN_ERROR:
            return { error: true };
        default:
            return state;
    }
}
