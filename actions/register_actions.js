import axios from 'axios';

import config from '../config';
import {
    RECEIVE_TOKEN
} from '../types';

export const registerUser = (user, navigation) => async (dispatch) => {
    if(user) {
        const token = await _registerUser(user);
        if(token) {
            console.log(token)
            navigation.navigate('interests');
        }
    }
}

_registerUser = async (user)  => {
    try {
        const { data } = await axios.post(config.getProfileUrl(), user);
        return data.token;
    } catch (error) {
        //handle error
        console.log(error);
    }
}
