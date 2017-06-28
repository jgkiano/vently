import React, { Component } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Item, Input, Label, Button, Picker } from 'native-base';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: undefined,
            selected1: 'key0',
            results: {
                items: []
            }
        }
    }
    onValueChange (value: string) {
        this.setState({
            selected1 : value
        });
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
                                <Input />
                            </Item>
                        </View>
                        <View style={ itemRowContainerStyle }>
                            <Item floatingLabel>
                                <Label style={labelStyle}>LAST NAME*</Label>
                                <Input />
                            </Item>
                        </View>
                    </View>
                    <View style={inputContainerStyle}>
                        <Item floatingLabel>
                            <Label style={labelStyle}>EMAIL ADDRESS*</Label>
                            <Input />
                        </Item>
                    </View>
                    <View style={ inputRowContainerStyle }>
                        <View style={ itemRowContainerStyle }>
                            <Item floatingLabel>
                                <Label style={labelStyle}>PHONE*</Label>
                                <Input />
                            </Item>
                        </View>
                        <View style={ pickerContainerStyle }>
                            <Picker
                                supportedOrientations={['portrait','landscape']}
                                iosHeader="Select Gender"
                                mode="dropdown"
                                selectedValue={this.state.selected1}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Item label="Male" value="key0" />
                                <Item label="Female" value="key1" />
                            </Picker>
                        </View>
                    </View>
                    <View style={ inputContainerStyle }>
                        <Item floatingLabel>
                            <Label style={labelStyle}>PASSWORD*</Label>
                            <Input />
                        </Item>
                    </View>
                    <View style={ inputContainerStyle }>
                        <Item floatingLabel>
                            <Label style={labelStyle}>CONFIRM PASSWORD*</Label>
                            <Input />
                        </Item>
                    </View>
                    <Button style={ buttonStyle } block warning onPress={() => this.props.navigation.navigate('interests',{user:'julius'}) }>
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



export default Register;
