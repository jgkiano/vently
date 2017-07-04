import { AsyncStorage } from 'react-native';

import {
    FETCH_TOKEN,
    FETCH_TOKEN_ERROR
} from '../types';

export const fetchToken = (navigation) => async (dispatch) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if(token) {
            dispatch({ type: FETCH_TOKEN, payload: token });
            navigation.navigate('mainApp');
            return;
        }
        navigation.navigate('welcome');
    } catch (error) {
        dispatch({ type: FETCH_TOKEN_ERROR});
    }
}
