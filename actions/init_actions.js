import { AsyncStorage } from 'react-native';

import {
    FETCH_TOKEN_ERROR,
    RECEIVE_TOKEN
} from '../types';

export const checkToken = (navigation) => async (dispatch) => {
    try {
        // await AsyncStorage.removeItem('token');
        const token = await AsyncStorage.getItem('token');
        if(token) {
            navigation.navigate('mainApp');
            dispatch({ type: RECEIVE_TOKEN, payload: { token }});
            return;
        }
        navigation.navigate('welcome');
    } catch (error) {
        dispatch({ type: FETCH_TOKEN_ERROR});
    }
}
