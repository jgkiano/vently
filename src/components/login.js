import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Item, Input,Label, Icon, Button } from 'native-base';

const icon = require('../../assets/images/icon.png');
const back = require('../../assets/images/back.png');

class LoginForm extends Component {
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', marginLeft: 15, marginRight: 15}}>
                <View style={{flex:1, alignItems: 'center', justifyContent:'flex-end', paddingBottom:30}} >
                    <Image style={{width: 100, height: 100}} source={icon} />
                </View>
                <View style={{flex:1, justifyContent: 'center'}}>
                <Label style={{fontWeight:'bold', fontSize: 9, color: '#FF6F00'}}>REQUIRED</Label>
                <Item>
                    <Icon style={{opacity: 0.5}}active name='mail' />
                    <Input placeholder="Email Address" />
                </Item>
                <Label style={{fontWeight:'bold', fontSize: 9, color: '#FF6F00', marginTop: 15}}>REQUIRED</Label>
                <Item>
                    <Icon style={{opacity: 0.5}}active name='lock' />
                    <Input placeholder="Password" />
                </Item>
                <Button style={{marginTop: 30, backgroundColor: '#FF6F00'}} block warning>
                    <Text style={{color: 'white'}}>Login</Text>
                </Button>
                </View>
                <View style={{flex:1, alignItems: 'center', marginBottom:15, justifyContent:'flex-end'}}>
                    <TouchableOpacity>
                        <Text style={{textDecorationLine:'underline', opacity: 0.7}}>Don't have an account?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default LoginForm;
