import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Icon } from 'native-base';

class BackButton extends Component {
    renderIcon = () => {
        if(Platform.OS === 'ios') {
            return <Icon style={{color:'white', marginLeft: 15}} name = 'ios-arrow-back'/>
        }
        return <Icon style={{color:'white', marginLeft: 15}} name = 'md-arrow-back'/>
    }
    render() {
        const { back } = this.props;
        return (
            <TouchableOpacity onPress={() => back()}>
                {this.renderIcon()}
            </TouchableOpacity>
        );
    }
}

export { BackButton };
