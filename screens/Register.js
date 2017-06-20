import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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

        const { buttonStyle, buttonTextStyle, labelStyle, privacyStyle } = styles;

        return (
            <View style={{flex: 1, marginTop: 30, justifyContent: 'center'}}>
                <View style={{marginBottom: 4, flexDirection: 'row'}}>
                    <View style={{flex: 1, padding: 10}}>
                        <Item floatingLabel>
                            <Label style={labelStyle}>FIRST NAME*</Label>
                            <Input />
                        </Item>
                    </View>
                    <View style={{flex: 1, padding: 10}}>
                        <Item floatingLabel>
                            <Label style={labelStyle}>LAST NAME*</Label>
                            <Input />
                        </Item>
                    </View>
                </View>
                <View style={{marginBottom: 4, padding: 10}}>
                    <Item floatingLabel>
                        <Label style={labelStyle}>EMAIL ADDRESS*</Label>
                        <Input />
                    </Item>
                </View>
                <View style={{marginBottom: 4, flexDirection: 'row'}}>
                    <View style={{flex: 1, padding: 10}}>
                        <Item floatingLabel>
                            <Label style={labelStyle}>PHONE*</Label>
                            <Input />
                        </Item>
                    </View>
                    <View style={{flex: 1, padding: 10, justifyContent: 'flex-end'}}>
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
                <View style={{marginBottom: 4, padding: 10}}>
                    <Item floatingLabel>
                        <Label style={labelStyle}>PASSWORD*</Label>
                        <Input />
                    </Item>
                </View>
                <View style={{marginBottom: 4, padding: 10}}>
                    <Item floatingLabel>
                        <Label style={labelStyle}>CONFIRM PASSWORD*</Label>
                        <Input />
                    </Item>
                </View>
                <Button style={ buttonStyle } block warning onPress={() => this.props.navigation.navigate('interests') }>
                    <Text style={buttonTextStyle}>Sign Up</Text>
                </Button>
                <TouchableOpacity>
                    <Text style={ privacyStyle }>By singing up, I agree to Vently's terms of service, privacy policy and community guidelines</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
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
    }
}



export default Register;
