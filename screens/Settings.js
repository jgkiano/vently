import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Icon, Button } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions';

class Settings extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Settings',
        headerTitle: <Text style={styles.titleStyle}>SETTINGS</Text>,
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name = 'md-settings' />;
        },
    });

    render() {
        const {
            buttonStyle,
            buttonTextStyle,
            buttonStyleRed
        } = styles;
        return (
            <View>
                <Button style={ buttonStyle } block warning onPress={() => this.props.navigation.navigate('interests') }>
                    <Icon name="md-clipboard" />
                    <Text style={buttonTextStyle}>SELECT YOUR INTERESTS</Text>
                </Button>
                <Button onPress={() => this.props.logOut(this.props.navigation)} style={ buttonStyleRed } block warning>
                    <Icon name="md-exit" />
                    <Text style={buttonTextStyle}>LOG OUT</Text>
                </Button>
            </View>
        );
    }
}

const styles = {
    titleStyle: {
        letterSpacing: 2,
        fontSize: 18,
        color: 'white',
        paddingLeft: (Platform.OS === 'ios') ? 0 : 15,
    },
    buttonStyle: {
        marginTop: 30,
        backgroundColor: '#FF6F00',
        margin: 10
    },
    buttonStyleRed: {
        marginTop: 30,
        backgroundColor: '#DD2C00',
        margin: 10
    },
    buttonTextStyle: {
        color: 'white'
    },
}

function mapStateToProps({settings}) {
    return settings;
}

export default connect(null, actions)(Settings);
