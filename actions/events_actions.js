import { AsyncStorage, Alert } from 'react-native';
import axios from 'axios';

import {
    GET_EVENT_FEED,
    SAVE_EVENT,
    REMOVE_EVENT,
    NAVIGATE_SINGLE,
} from '../types';

import config from '../config';

const EVENTSURL = config.getEventsUrl();

export const getEventFeed = (token) => async (dispatch) => {
    if(token) {
        _getEventFeed(token, dispatch);
    }
}

_getEventFeed = async (token, dispatch) => {
    try {
        const { data } = await axios.get(EVENTSURL, {
            headers: { Authorization: token }
        });
        dispatch({type: GET_EVENT_FEED, payload: data.events});
    } catch (error) {
        Alert.alert(
            'Could not connected to vently',
            'We\'re having a bit of trouble accessing our servers. Check your internet connection and try again',
            [
                {text: 'Cancel', onPress: () => console.log('canceled'), style: 'cancel'},
                {text: 'Try Again', onPress: () => _getEventFeed(token, dispatch)},
            ],
            { cancelable: true }
        );
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

export const goToEvent = (id, navigation, token) => {
    navigation.navigate('singleEvent');
    return {
        type: NAVIGATE_SINGLE,
        payload: { id, token}
    };
}
