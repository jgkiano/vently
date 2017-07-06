import {
    GET_SINGLE_TICKET
} from '../types';

const INITIAL_STATE = {
    data: null
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_SINGLE_TICKET:
            return {...state, data: action.payload.data, totalTickets: action.payload.totalTickets, token: action.payload.token };
        default:
            return state;
    }
}
