import { AsyncStorage } from 'react-native'
import axios from 'axios';
import {
    LOGIN_VALIDATE_FAIL,
    LOGIN_NETWORK_FAIL,
    LOGIN_ONLINE_VALIDATE_FAIL,
    LOADING_STATUS,
    RECEIVE_TOKEN
} from '../types';

import config from '../config';
const AUTHURL = config.getAuthUrl();
const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const loginUser = (email, password, navigation) => async (dispatch) => {
    if (email === "" && password === "") {
        dispatch({
            type: LOGIN_VALIDATE_FAIL,
            payload: {
                errorMsg: 'Please provide both an email address and password',
                inputError: {
                    email: true,
                    pass: true
                }
            }
        });
        return;
    }
    if (email === "" || !emailReg.test(email)) {
        dispatch({
            type: LOGIN_VALIDATE_FAIL,
            payload: {
                errorMsg: 'Please provide a valid email address',
                inputError: {
                    email: true,
                    pass: false
                }
            }
        });
        return;
    }
    if (password === "") {
        dispatch({
            type: LOGIN_VALIDATE_FAIL,
            payload: {
                errorMsg: 'Please provide a valid password',
                inputError: {
                    email: false,
                    pass: true
                }
            }
        });
        return;
    }
    try {
        dispatch({ type: LOADING_STATUS, payload: { loading: true, networkError: false }});
        const token = await getToken(email, password);
        await AsyncStorage.setItem('token', token);
        navigation.navigate('mainApp');
        dispatch({ type: RECEIVE_TOKEN, payload: { token }});
        return;
    } catch (error) {
        if(error.response) {
            const message = error.response.data.message;
            dispatch({
                type: LOGIN_ONLINE_VALIDATE_FAIL,
                payload: {
                    errorMsg: message,
                    inputError: {
                        email: true,
                        pass: true
                    },
                    loading: false
                }
            });
            return;
        }
        if(error.request && !error.repsonse) {
            dispatch({
                type: LOGIN_NETWORK_FAIL,
                payload: {
                    networkError: true,
                    loading: false
                }
            });
            return;
        }
    }
}

getToken = async (email, password) => {
    const { data } = await axios.post(AUTHURL, {
        email,
        password
    });
    return data.token;
}
