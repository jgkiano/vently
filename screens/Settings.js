import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

class Settings extends Component {

    static navigationOptions = ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name='md-settings' />;
        }
    });

    render() {
        return (
            <View>
                <Text>Settings</Text>
                <Text>Settings</Text>
                <Text>Settings</Text>
                <Text>Settings</Text>
                <Text>Settings</Text>
                <Text>Settings</Text>
                <Text>Settings</Text>
            </View>
        );
    }
}

export default Settings;
