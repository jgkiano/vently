import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

class Tickets extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name='md-pricetags' />;
        }
    });


    render() {
        return (
            <View>
                <Text>Tickets</Text>
                <Text>Tickets</Text>
                <Text>Tickets</Text>
                <Text>Tickets</Text>
                <Text>Tickets</Text>
                <Text>Tickets</Text>
                <Text>Tickets</Text>
            </View>
        );
    }
}

export default Tickets;
