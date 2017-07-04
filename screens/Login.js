import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { Item, Input,Label, Icon, Button, Spinner } from 'native-base';
import axios from 'axios';
import config from '../config';


const icon = require('../assets/images/icon.png');
const back = require('../assets/images/back.png');
const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const AUTHURL = config.getAuthUrl();

class LoginScreen extends Component {
    state = {
        email: "",
        pass: "",
        errorMsg: "",
        emailError: false,
        passError: false,
        loading: false
    }

    validateEntry = () => {
        this.setState({
            errorMsg: "",
            emailError: false,
            passError: false
        });
        const {
            email,
            pass,
            emailError,
            passError
        } = this.state;
        if (email === "" && pass === "") {
            this.setState({
                errorMsg: "Please provide both an email address and password",
                emailError: true,
                passError: true
            });
            return;
        }
        if (email === "" || !emailReg.test(email)) {
            this.setState({
                errorMsg: "Please provide a valid email address",
                emailError: true
            });
            return;
        }
        if(!emailError && !passError) {
            this.loginUser();
        }
    }

    setError = errorMsg => this.setState({errorMsg, loading: false });

    loginUser = async () => {
        try {
            this.setState({loading: true});
            const {data} = await axios.post(AUTHURL, {
                email: this.state.email,
                password: this.state.pass,
            });
            if(data.success && data.token) {
                this.saveUser(data.token);
            } else {
                this.setError('Something went wrong');
            }
        } catch ({ request, response }) {
            if(response && response.status === 500) {
                this.setError(response.data.message);
                return;
            }
            //probably network fail
            if(request._response) {
                Alert.alert(
                    'Could not connected to vently',
                    'We\'re having a bit of trouble accessing our servers. check your internet connection and try again',
                    [
                        {text: 'Cancel', onPress: () => this.setState({loading: false}), style: 'cancel'},
                        {text: 'Try Again', onPress: () => this.loginUser()},
                    ],
                    { cancelable: true }
                )
                return;
            }
        }
    }

    saveUser = async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
            this.setState({loading: false});
            this.props.navigation.navigate('mainApp', {token});
        } catch (error) {
            Alert.alert(
                'Something went wrong',
                'We can\'t access the local phone storage. Please chack your app permissions and trye again',
                [
                    {text: 'Cancel', onPress: () => console.log('canceled'), style: 'cancel'},
                    {text: 'Try Again', onPress: () => this.saveUser(token, user)},
                ],
                { cancelable: true }
            )
        }
    }
    renderErrorText = () => {
        if (this.state.errorMsg !== "") {
            return(
                <Text style={{marginTop: 15, marginBottom: -15, fontSize: 16, color: '#d50000'}}>{this.state.errorMsg}</Text>
            );
        }
        return;
    }

    renderLoginSpinner = () => {
        const {
            buttonTextStyle
        } = styles;
        if (this.state.loading) {
            return <Spinner color="white" />;
        }
        return(
            <Text style={buttonTextStyle}>Login</Text>
        );
    }

    render() {
        console.log(AUTHURL);
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
                    <Item error={this.state.emailError}>
                        <Icon style={inputIconStyle}active name='mail' />
                        <Input disabled={this.state.loading} autoCapitalize="none" autoCorrect={false} value={this.state.email} onChangeText={email => this.setState({email})} placeholder="Email Address" />
                    </Item>
                    <Label style={labelStyle}>REQUIRED</Label>
                    <Item error={this.state.passError}>
                        <Icon style={inputIconStyle}active name='lock' />
                        <Input disabled={this.state.loading} secureTextEntry={true} value={this.state.pass} onChangeText={pass => this.setState({pass})} placeholder="Password" />
                    </Item>
                    {this.renderErrorText()}
                    <Button style={ buttonStyle } block warning onPress={() => this.validateEntry()}>
                        {this.renderLoginSpinner()}
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
        marginTop:30,
        justifyContent:'flex-start'
    },
    signUpLinkTextStyle: {
        textDecorationLine:'underline',
        opacity: 0.7,
        marginTop: 16
    }
}

export default LoginScreen;
