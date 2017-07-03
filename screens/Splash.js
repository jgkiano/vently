import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage, Alert } from 'react-native';
import { Spinner } from 'native-base';

const logo = require('../assets/images/splashlogo.png');

class Splash extends Component {
    componentDidMount() {
        this.getToken();
    }
    getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                this.props.navigation.navigate('mainApp', { token });
                return;
            }
            this.props.navigation.navigate('welcome');
        } catch (error) {
            Alert.alert(
                'Error Reading Local Storage',
                'Hey there, we are having some trouble accessing your local storage. Try again and if the problem persists contact the developers',
                [
                    {text: 'Try Again', onPress: () => this.getToken()},
                ],
                { cancelable: false }
            );
        }
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FF6F00', justifyContent:'center', alignItems:'center'}}>
                <Image source={logo} style={{width: 62, height: 162}} />
                <Spinner color='white' />
            </View>
        )
    }
}

export default Splash;
