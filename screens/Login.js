import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Item, Input,Label, Icon, Button } from 'native-base';

const icon = require('../assets/images/icon.png');
const back = require('../assets/images/back.png');

class LoginScreen extends Component {
    render() {

        const {
            mainContainerStyle,
            imageContainerStyle,
            imageStyle,
            formContainerStyle,
            labelStyle,
            inputIconStyle,
            buttonStyle,
            buttonTextStyle,
            signUpLinkContainer,
            signUpLinkTextStyle
        } = styles;

        return (
            <View style={mainContainerStyle}>
                <View style={imageContainerStyle} >
                    <Image style={imageStyle} source={icon} />
                </View>
                <View style={formContainerStyle}>
                    <Label style={labelStyle}>REQUIRED</Label>
                    <Item>
                        <Icon style={inputIconStyle}active name='mail' />
                        <Input placeholder="Email Address" />
                    </Item>
                    <Label style={labelStyle}>REQUIRED</Label>
                    <Item>
                        <Icon style={inputIconStyle}active name='lock' />
                        <Input placeholder="Password" />
                    </Item>
                    <Button style={ buttonStyle } block warning>
                        <Text style={buttonTextStyle}>Login</Text>
                    </Button>
                </View>
                <View style={signUpLinkContainer}>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('register') }>
                        <Text style={signUpLinkTextStyle}>Don't have an account?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = {
    mainContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 15,
        marginRight: 15
    },
    imageContainerStyle: {
        flex:1,
        alignItems: 'center',
        justifyContent:'flex-end',
        paddingBottom:30
    },
    formContainerStyle: {
        flex:1,
        justifyContent: 'center'
    },
    imageStyle: {
        width: 100,
        height: 100
    },
    labelStyle: {
        fontWeight:'bold',
        fontSize: 9,
        color: '#FF6F00',
        marginTop: 15
    },
    inputIconStyle: {
        opacity: 0.5
    },
    buttonStyle: {
        marginTop: 30,
        backgroundColor: '#FF6F00'
    },
    buttonTextStyle: {
        color: 'white'
    },
    signUpLinkContainer: {
        flex:1,
        alignItems: 'center',
        marginTop:15,
        justifyContent:'flex-start'
    },
    signUpLinkTextStyle: {
        textDecorationLine:'underline',
        opacity: 0.7,
        marginTop: 16
    }
}

export default LoginScreen;
