import {
    RECEIVE_TOKEN,
    GET_EVENT_FEED,
    SAVE_EVENT,
    REMOVE_EVENT
} from '../types';

const INITIAL_STATE = {
    token: null,
    feed: [],
    savedEvents: []
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_EVENT_FEED:
            return {...state, feed: action.payload};
        case RECEIVE_TOKEN:
            return {...state, token: action.payload.token};
        case SAVE_EVENT:
            return { ...state, savedEvents: [...state.savedEvents, action.payload]};
        case REMOVE_EVENT:
            const arr = state.savedEvents.filter((item) => {
                return !(item === action.payload);
            });
            return { ...state, savedEvents: arr};
        default:
            return state;
    }
}
