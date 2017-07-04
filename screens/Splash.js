import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage, Alert } from 'react-native';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../actions';

const logo = require('../assets/images/splashlogo.png');



class Splash extends Component {

    state = {
        tryAgain: false
    }

    componentDidMount() {
        this.props.checkToken(this.props.navigation);
    }

    componentWillUpdate() {
        this.props.checkToken(this.props.navigation);
    }

    errorHandler = () => {
        if(this.props.error) {
            Alert.alert(
                'Error Reading Local Storage',
                'Hey there, we are having some trouble accessing your local storage. Try again and if the problem persists contact the developers',
                [
                    {text: 'Try Again', onPress: () => this.setState({ tryAgain: !this.state.tryAgain})},
                ],
                { cancelable: false }
            );
        }
    }

    render() {
        {this.errorHandler()}
        return (
            <View style={{flex: 1, backgroundColor: '#FF6F00', justifyContent:'center', alignItems:'center'}}>
                <Image source={logo} style={{width: 62, height: 162}} />
                <Spinner color='white' />
            </View>
        )
    }
}

function mapStateToProps({auth}) {
    return auth;
}

export default connect(mapStateToProps, actions)(Splash);
