import {
    RECEIVE_TOKEN,
    EVENTS_NEAR_LOCATION
} from '../types';

const INITIAL_STATE = {
    data: null
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case RECEIVE_TOKEN:
            return {...state, token: action.payload.token};
        case EVENTS_NEAR_LOCATION:
            return {...state, data: action.payload.data, userLoc: action.payload.coords}
        default:
            return state;
    }
}
