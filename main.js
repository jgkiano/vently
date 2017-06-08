import Expo from 'expo';
import React, { Component } from 'react';
import LoginForm from './src/components/login';

class App extends Component {
    render() {
        return (
            <LoginForm />
        );
    }
}

Expo.registerRootComponent(App);
