import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

class Profile extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name='md-person' />;
        }
    });

    render() {
        return (
            <View>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
                <Text>Profile</Text>
            </View>
        );
    }
}

export default Profile;
