import {
    PAYMENT_IFRAME
} from '../types';

const INITIAL_STATE = {
    iframe: null,
    token: ""
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case PAYMENT_IFRAME:
        return { iframe: action.payload.iframe, token: action.payload.token };
        default:
            return state;
    }
}
