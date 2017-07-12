import { Platform, Alert } from 'react-native';
import { MapView, Location, Permissions, Constants } from 'expo';
import axios from 'axios';

import {
    EVENTS_NEAR_LOCATION
} from '../types';

import config from '../config';

export const getEventsNear = (token, navigation) => async (dispatch) => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
        console.log("you need to run this on an actual device, sorry bud");
    } else {
        const location = await _getLocationAsync(navigation);
        if ( location ) {
            const { coords } = location;
            const { events } = await _getEventsNear(token, coords);
            dispatch({
                type: EVENTS_NEAR_LOCATION,
                payload: {
                    coords,
                    data: events
                }
            });
        }
    }
}

export const getEventsOnRegionChange = (token, region) => async (dispatch) => {
    console.log(region);
    // try {
    //     console.log(config.getEventsNearMeUrl(region));
    //     const requestConfig = { headers: { Authorization: token } };
    //     const { data } = await axios.get(config.getEventsNearMeUrl(coords), requestConfig);
    //     console.log(data);
    // } catch (error) {
    //     //handle error
    //     console.log(error);
    // }
}

_getEventsNear = async (token, coords) => {
    try {
        console.log(config.getEventsNearMeUrl(coords));
        const requestConfig = { headers: { Authorization: token } };
        const { data } = await axios.get(config.getEventsNearMeUrl(coords), requestConfig);
        return data;
    } catch (error) {
        //handle error
        console.log(error);
    }
}

_getLocationAsync = async (navigation) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        handleDeniedPermission(navigation);
        return null;
    }
    return await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
}

handleDeniedPermission = (navigation) => {
    if ( Platform.OS === 'android' ) {
        console.log("andy")
        //handle android deny
    } else {
        Alert.alert(
            'We don\'t have permissions for this',
            'To access events near you we need you to enable location services in the settings section of your phone and try again',
            [
                {text: 'Okay', onPress: () => navigation.goBack()}
            ],
            { cancelable: false }
        );
    }
}
