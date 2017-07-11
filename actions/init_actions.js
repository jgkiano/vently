import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

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
        registerForPushNotificationsAsync();
    } catch (error) {
        dispatch({ type: FETCH_TOKEN_ERROR});
    }
}

async function registerForPushNotificationsAsync() {
    console.log('hththt');
    let previousToken = await AsyncStorage.getItem('pushtoken');
      console.log(previousToken);
      if(previousToken) {
          return;
      }
      let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
      if(status !== 'granted') {
          return;
      }
      let token = await Notifications.getExponentPushTokenAsync();
      console.log(token,"<<<<<<<<<");

}
