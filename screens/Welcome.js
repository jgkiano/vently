import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';

class WelcomeScreen extends Component {
    onSlidesComplete = () => {
        this.props.navigation.navigate('login');
    }
    render() {
        return (
            <Slides onComplete={this.onSlidesComplete} />
        );
    }
}

export default WelcomeScreen;
