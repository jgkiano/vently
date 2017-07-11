import axios from 'axios';
import { Alert } from 'react-native';
import {
    GET_PROFILE,
    FIRST_NAME_CHANGE,
    LAST_NAME_CHANGE,
    EMAIL_CHANGE,
    PHONE_CHANGE,
} from '../types';

import config from '../config';

export const getProfile = (token) => async (dispatch) => {
    if(token) {
        const { data } = await _getProfile(token);
        dispatch({
            type: GET_PROFILE,
            payload: data
        });
    }
}

_getProfile = async (token) => {
    try {
        const requestConfig = { headers: { Authorization: token } };
        const { data } = await axios.get(config.getProfileUrl(), requestConfig);
        return data;
    } catch (error) {
        //handle error
        console.log(error);
    }
}

export const saveUser = (user, token) => async (dispatch) => {
    if(token) {
        const { data } = await _saveUser(user, token);
        dispatch({
            type: GET_PROFILE,
            payload: data
        });
        Alert.alert(
            'Save successful',
            'Your profile has been successfuly updated!',
            [
                {text: 'Okay', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        );
    }
}

_saveUser = async (user, token) => {
    try {
        const requestConfig = { headers: { Authorization: token } };
        const { data } = await axios.put(config.getProfileUrl(), user, requestConfig);
        return data;
    } catch (error) {
        //handle error
        console.log(error);
    }
}

export const changeFirstName = (text) => {
    return {
        type: FIRST_NAME_CHANGE,
        payload: text
    }
}

export const changeLastName = (text) => {
    return {
        type: LAST_NAME_CHANGE,
        payload: text
    }
}

export const changeEmail = (text) => {
    return {
        type: EMAIL_CHANGE,
        payload: text
    }
}

export const changePhone = (text) => {
    return {
        type: PHONE_CHANGE,
        payload: text
    }
}
