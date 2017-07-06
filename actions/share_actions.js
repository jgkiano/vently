import axios from 'axios';
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation'

import {
    SHARE_TICKET,
    GET_TICKETS
} from '../types';

import config from '../config';


export const shareTicket = (shareInfo, navigation, token) => async (dispatch) => {
    const phone = shareInfo.user
    console.log(phone.substr(0,2));
    if(phone.substr(0,2) === "07" || phone.substr(0,4) === "+254" || phone.substr(0,3) === "254") {
        if(token) {
            remainingTickets = await _shareTicket(shareInfo, navigation, token);
            dispatch({
                type: GET_TICKETS,
                payload: remainingTickets
            });
            Alert.alert(
                'Ticket shared successfully!',
                'Sharing is ventling! You have successfully shared you ticket. What will your next adventure be?',
                [
                    {text: 'Go Back', onPress: () => goBackToListing(navigation)},
                ],
                { cancelable: true }
            );
        }
    } else {
        handleBadNumber(navigation);
    }
}

_shareTicket = async (shareInfo, navigation, token) => {
    try {
        const query = { phone: shareInfo.user, eventId: shareInfo.eventId};
        const requestConfig = { headers: { Authorization: token } };
        const response = await axios.post(config.getTicketShareUrl(), query , requestConfig);
        console.log(response.data);
        if (response.data.success) {
            const { data } = await axios.get(config.getTicketsUrl(), requestConfig);
            return data.data;
        }
    } catch (error) {
        const { response } = error;
        if (response) {
            const { data } = response;
            if(data.error === 423) {
                handleBadNumber(navigation);
                return;
            }
            if(data.error === 420) {
                handleNoUser(navigation);
                return;
            }
            handleSomethingWentWrong(shareInfo, navigation, token);
            return;
        } else {
            //network error
        }
    }
}

handleBadNumber = (navigation) => {
    Alert.alert(
        'Hey there! We don\'t support this number',
        'Currently vently only supports phone numbers registred in Kenya. e.g 07xx, 254xx, +254xx',
        [
            {text: 'Okay', onPress: () => navigation.goBack()},
        ],
        { cancelable: true }
    );
}

handleNoUser = (navigation) => {
    Alert.alert(
        'Tell them to get Vently!',
        'Seems like this user isn\'t registred with vently. Should we notify them to download the app?',
        [
            {text: 'Notify', onPress: () => navigation.goBack()},
            {text: 'Cancel', onPress: () => navigation.goBack()},
        ],
        { cancelable: true }
    );
}

handleSomethingWentWrong = (shareInfo, navigation, token) => {
    Alert.alert(
        'Something went wrong :(',
        'Seems like there was a problem sharing this ticket. Try again?',
        [
            {text: 'Try Again', onPress: () => _shareTicket(shareInfo, navigation, token)},
            {text: 'Go Back', onPress: () => navigation.goBack()},
        ],
        { cancelable: true }
    );
}
goBackToListing = (navigation) => {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'list'})
        ]
    })
    navigation.dispatch(resetAction);
}
