import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import MainNavigator from './router';
import { Provider } from 'react-redux';
import store from './store';


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <StatusBar barStyle="light-content" />
                    <MainNavigator />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
