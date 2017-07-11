import { AsyncStorage, Platform, Alert } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import axios from 'axios';

import {
    GET_EVENT_INFO,
    TICKET_CHANGE,
    DEFAULT_TICKET_STATE,
    PAYMENT_IFRAME
} from '../types';

import config from '../config';

const MAXIMUM_NUMBER_OF_TICKETS = 3;
const MINIMUM_NUMBER_OF_TICKETS = 1;

export const getEventDetailes = (id, token) => async (dispatch) => {
    let url = "";
    const location = await _getLocationAsync();
    if ( location.status ) {
        url = config.getSingleEventUrl(id,location.coords);
    } else {
        url = config.getSingleEventUrl(id);
    }
    const data = await _getEventDetailes(url, token);
    dispatch({
        type: GET_EVENT_INFO,
        payload: data
    });
}

export const ticketCalculator = (op, tickets, ticketPrice) => {
    if (op === "add" && (tickets+=1) <= MAXIMUM_NUMBER_OF_TICKETS) {
        return {
            type: TICKET_CHANGE,
            payload: { tickets: tickets, ticketPrice: ticketPrice * tickets }
        }
    }
    if (op === "sub" && (tickets-=1) >= MINIMUM_NUMBER_OF_TICKETS) {
        return {
            type: TICKET_CHANGE,
            payload: { tickets: tickets, ticketPrice: ticketPrice * tickets }
        }
    }
    return { type: DEFAULT_TICKET_STATE };
}

export const placeOrder = (order, navigation) => async (dispatch) => {
    navigation.navigate('pay');
    if(order.user) {
        const data = await _placeOrder(order);
        dispatch({
            type: PAYMENT_IFRAME,
            payload: {
                iframe: data.iframe,
                token: order.user
            }
        });
    }
}

_placeOrder = async (order) => {
    console.log('called');
    try {
        const query = { tickets: order.tickets, total: order.total, eventId: order.eventId };
        const requestConfig = { headers: { Authorization: order.user } };
        const { data } = await axios.post(config.getPlaceOrderUrl(), query , requestConfig);
        return data;
    } catch (error) {
        //handle error
        console.log(error);
    }
}

_getLocationAsync = async () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
        console.log('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
        return { status: false };
    }
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //location denied, if its android we can persist..ios there's no debate :(
    if (status !== 'granted') {
        return { status: false };
    }
    let location = await Location.getCurrentPositionAsync({});
    return { status: true, coords: location.coords};
};

_getEventDetailes = async (url, token) => {
    try {
        const { data } = await axios.get(url, {
            headers: { Authorization: token }
        });
        return data.event;
    } catch (error) {
        //handle error
    }
}
