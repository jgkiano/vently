import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'native-base';
import { BackButton } from '../components';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Map extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Events Near Me',
        headerTitle: <Text style={styles.titleStyle}>Events Near Me</Text>,
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name = 'ios-home' />;
        },
        headerLeft: <BackButton back={navigation.goBack}/>
    });

    render() {
        return (
            <View>
                <Text>Map me</Text>
                <Text>Map me</Text>
                <Text>Map me</Text>
                <Text>Map me</Text>
                <Text>Map me</Text>
                <Text>Map me</Text>
                <Text>Map me</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Home')}
                >
                <Text>Press</Text>
                </Button>
            </View>
        );
    }
}

const styles = {
    titleStyle: {
        letterSpacing: 2,
        fontSize: 18,
        color: 'white'
    },
};

export default Map;
