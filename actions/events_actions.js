import { AsyncStorage } from 'react-native';
import axios from 'axios';

import {
    GET_EVENT_FEED,
    SAVE_EVENT,
    REMOVE_EVENT
} from '../types';

import config from '../config';

const EVENTSURL = config.getEventsUrl();

export const getEventFeed = (token) => async (dispatch) => {
    if (token) {
        try {
            const { data } = await axios.get(EVENTSURL, {
                headers: { Authorization: token }
            });
            dispatch({type: GET_EVENT_FEED, payload: data.events});
            return;
        } catch (error) {
            console.log('error');
        }
    }
}

export const saveEvent = (id) => {
    return {
        type: SAVE_EVENT,
        payload: id
    };
}

export const removeEvent = (id) => {
    return {
        type: REMOVE_EVENT,
        payload: id
    }
}
