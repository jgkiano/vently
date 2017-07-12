import { AsyncStorage } from 'react-native';

export const logOut = (navigation) => async (dispatch) => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('login');
}
