import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

class Share extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name='md-person' />;
        }
    });

    render() {
        return (
            <View>
                <Text>Share</Text>
                <Text>Share</Text>
                <Text>Share</Text>
                <Text>Share</Text>
                <Text>Share</Text>
                <Text>Share</Text>
                <Text>Share</Text>
            </View>
        );
    }
}

export default Share;
