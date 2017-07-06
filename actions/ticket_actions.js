import axios from 'axios';

import {
    GET_TICKETS,
    GET_SINGLE_TICKET
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

export const goToSingleTicket = (ticketInfo, token, navigation) => async (dispatch) => {
    navigation.navigate('single');
    if (token) {
        const data = await _goToSingleTicket(ticketInfo, token, navigation);
        dispatch({
            type: GET_SINGLE_TICKET,
            payload: {
                data,
                totalTickets: ticketInfo.totalTickets
            }
        })
    }
}

_goToSingleTicket = async (ticketInfo, token, navigation) => {
    try {
        const { data } = await axios.get(config.getSingleTicketUrl(ticketInfo.ticket), {
            headers: { Authorization: token }
        });
        return data.ticket;
    } catch (error) {

    }
}
