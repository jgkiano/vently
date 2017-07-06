import {
    NAVIGATE_SINGLE,
    GET_EVENT_INFO,
    TICKET_CHANGE,
    DEFAULT_TICKET_STATE
} from '../types';

const INITIAL_STATE = {
    token: null,
    eventId: null,
    data: null,
    ticketPrice: null,
    tickets: 1
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case NAVIGATE_SINGLE:
            return { ...INITIAL_STATE, eventId: action.payload.id, token: action.payload.token };
        case GET_EVENT_INFO:
            return {...state, data: action.payload, ticketPrice: action.payload.price };
        case TICKET_CHANGE:
            return {...state, tickets: action.payload.tickets, ticketPrice: action.payload.ticketPrice}
        case DEFAULT_TICKET_STATE:
            return {...state};
        default:
            return state;
    }
}
