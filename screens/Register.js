import React, { Component } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Item, Input, Label, Button, Picker } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions';

class Register extends Component {

    state = {
        firstname:"",
        lastname:"",
        phone:"",
        password:"",
        email:"",
        confirmPass:"",
        gender: 'male',
    }

    onValueChange (value: string) {
        console.log(value);
        this.setState({
            gender : value
        });
    }

    handleRegistration = () => {
        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            gender: this.state.gender
        }
        this.props.registerUser(user, this.props.navigation);
    }

    render() {

        const {
            buttonStyle,
            buttonTextStyle,
            labelStyle,
            privacyStyle,
            formContainerStyle,
            inputRowContainerStyle,
            inputContainerStyle,
            itemRowContainerStyle,
            pickerContainerStyle
        } = styles;

        return (
            <KeyboardAvoidingView
                style={{flex:1}}
                behavior="padding"
            >
                <View style={ formContainerStyle }>
                    <View style={ inputRowContainerStyle }>
                        <View style={itemRowContainerStyle}>
                            <Item floatingLabel>
                                <Label style={labelStyle}>FIRST NAME*</Label>
                                <Input autoCorrect={false} autoCapitalize="words" value={this.state.firstname} onChangeText={firstname => this.setState({firstname})} />
                            </Item>
                        </View>
                        <View style={ itemRowContainerStyle }>
                            <Item floatingLabel>
                                <Label style={labelStyle}>LAST NAME*</Label>
                                <Input autoCorrect={false} autoCapitalize="words" value={this.state.lastname} onChangeText={lastname => this.setState({lastname})} />
                            </Item>
                        </View>
                    </View>
                    <View style={inputContainerStyle}>
                        <Item floatingLabel>
                            <Label style={labelStyle}>EMAIL ADDRESS*</Label>
                            <Input autoCorrect={false} autoCapitalize="none" keyboardType="email-address" value={this.state.email} onChangeText={email => this.setState({email})} />
                        </Item>
                    </View>
                    <View style={ inputRowContainerStyle }>
                        <View style={ itemRowContainerStyle }>
                            <Item floatingLabel>
                                <Label style={labelStyle}>PHONE*</Label>
                                <Input autoCorrect={false} keyboardType="phone-pad" value={this.state.phone} onChangeText={phone => this.setState({phone})} />
                            </Item>
                        </View>
                        <View style={ pickerContainerStyle }>
                            <Picker
                                supportedOrientations={['portrait','landscape']}
                                iosHeader="Select Gender"
                                mode="dropdown"
                                selectedValue={this.state.gender}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Item label="Male" value="male" />
                                <Item label="Female" value="female" />
                            </Picker>
                        </View>
                    </View>
                    <View style={ inputContainerStyle }>
                        <Item floatingLabel>
                            <Label style={labelStyle}>PASSWORD*</Label>
                            <Input secureTextEntry autoCorrect={false} value={this.state.password} onChangeText={password => this.setState({password})} />
                        </Item>
                    </View>
                    <View style={ inputContainerStyle }>
                        <Item floatingLabel>
                            <Label style={labelStyle}>CONFIRM PASSWORD*</Label>
                            <Input secureTextEntry autoCorrect={false} value={this.state.confirmPass} onChangeText={confirmPass => this.setState({confirmPass})} />
                        </Item>
                    </View>
                    <Button style={ buttonStyle } block warning onPress={() => this.handleRegistration() }>
                        <Text style={buttonTextStyle}>Sign Up</Text>
                    </Button>
                    <TouchableOpacity>
                        <Text style={ privacyStyle }>By singing up, I agree to Vently's terms of service, privacy policy and community guidelines</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = {
    formContainerStyle: {
        flex: 1,
        marginTop: 30,
        justifyContent: 'center'
    },
    buttonStyle: {
        marginTop: 30,
        backgroundColor: '#FF6F00',
        margin: 10
    },
    buttonTextStyle: {
        color: 'white'
    },
    labelStyle: {
        fontSize: 12,
        color: '#FF6F00',
    },
    privacyStyle: {
        padding: 20,
        textAlign: 'center',
        opacity: 0.7
    },
    inputRowContainerStyle:{
        marginBottom: 4,
        flexDirection: 'row'
    },
    inputContainerStyle: {
        marginBottom: 4,
        padding: 10
    },
    itemRowContainerStyle: {
        flex: 1,
        padding: 10
    },
    pickerContainerStyle: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-end'
    }
}



function mapStateToProps({auth}) {
    return auth;
}

export default connect(null, actions)(Register);
