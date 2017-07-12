import { Alert } from 'react-native';
import axios from 'axios';
import config from '../config';

import {
    GET_INTERESTS,
    GET_EVENT_FEED
} from '../types';


export const getInterests = () => async (dispatch) => {
    console.log("lets do this");
    const { interests } = await _getInterests();
    dispatch({
        type: GET_INTERESTS,
        payload: interests
    });
}

_getInterests = async () => {
    try {
        const { data } = await axios.get(config.getInterestsUrl());
        return data;
    } catch (error) {
        //handle error
        console.log(error);
    }
}

export const saveInterests = (interests, token, navigation) => async (dispatch) => {
    if(token) {
        _saveInterests(interests, token, navigation, dispatch);
    }
}

_saveInterests = async (interests, token, navigation, dispatch) => {
    try {
        await axios.put( config.getInterestsUpdateUrl(), { interests }, { headers: { Authorization: token } });
        const { data } = await axios.get(config.getEventsUrl(), {
            headers: { Authorization: token }
        });
        dispatch({type: GET_EVENT_FEED, payload: data.events});
        navigation.navigate('eventFeed');
        console.log(data);
    } catch (error) {
        console.log(error);
        Alert.alert(
            'Could not connected to vently',
            'We\'re having a bit of trouble accessing our servers. check your internet connection and try again',
            [
                {text: 'Cancel', onPress: () => console.log('canceled') , style: 'cancel'},
                {text: 'Try Again', onPress: () => _saveInterests(interests, token, navigation)},
            ],
            { cancelable: true }
        );
    }
}
