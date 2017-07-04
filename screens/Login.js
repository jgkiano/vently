import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { Item, Input, Label, Icon, Button, Spinner } from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../actions';


const icon = require('../assets/images/icon.png');
const back = require('../assets/images/back.png');
const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class LoginScreen extends Component {
    state = {
        email: "",
        pass: "",
        currentlyShowingError: false,
    }

    errorHandler = () => {
        if(this.props.networkError) {
            Alert.alert(
                'Could not connected to vently',
                'We\'re having a bit of trouble accessing our servers. Check your internet connection and try again',
                [
                    {text: 'Cancel', onPress: () => console.log('canceled'), style: 'cancel'},
                    {text: 'Try Again', onPress: () => this.props.loginUser(this.state.email, this.state.pass, this.props.navigation)},
                ],
                { cancelable: true }
            );
        }
    }

    renderErrorText = () => {
        if (this.props.errorMsg !== "") {
            return(
                <Text style={{marginTop: 15, marginBottom: -15, fontSize: 16, color: '#d50000'}}>{this.props.errorMsg}</Text>
            );
        }
        return;
    }

    renderLoginSpinner = () => {
        const {
            buttonTextStyle
        } = styles;
        if (this.props.loading) {
            return <Spinner color="white" />;
        }
        return(
            <Text style={buttonTextStyle}>Login</Text>
        );
    }

    render() {
        {this.errorHandler()}
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
                    <Item error={this.props.inputError.email}>
                        <Icon style={inputIconStyle}active name='mail' />
                        <Input disabled={this.state.loading} autoCapitalize="none" autoCorrect={false} value={this.state.email} onChangeText={email => this.setState({email})} placeholder="Email Address" />
                    </Item>
                    <Label style={labelStyle}>REQUIRED</Label>
                    <Item error={this.props.inputError.pass}>
                        <Icon style={inputIconStyle}active name='lock' />
                        <Input disabled={this.state.loading} secureTextEntry={true} value={this.state.pass} onChangeText={pass => this.setState({pass})} placeholder="Password" />
                    </Item>
                    {this.renderErrorText()}
                    <Button style={ buttonStyle } block warning onPress={() => this.props.loginUser(this.state.email, this.state.pass, this.props.navigation)}>
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

function mapStateToProps({login}) {
    return login;
}

export default connect(mapStateToProps, actions)(LoginScreen);
