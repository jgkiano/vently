import axios from 'axios';

import {
    GET_TICKETS,
} from '../types';

import config from '../config';

export const getTickets = (token) => async (dispatch) => {
    if (token) {
        const tickets = await _getTickets(token);
        dispatch({
            type: GET_TICKETS,
            payload: tickets
        });
    }
}

_getTickets = async (token) => {
    try {
        const { data } = await axios.get(config.getTicketsUrl(), {
            headers: { Authorization: token }
        });
        return data.data;
    } catch (error) {
        //handle error
    }
}
