import React, { Component } from 'react';
import { View, Text, Image, ScrollView,TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Icon, Item, Label, Input, Picker, Button, Spinner } from 'native-base';
import { ImagePicker } from 'expo';

import { connect } from 'react-redux';
import * as actions from '../actions';

const DATA = {
    image: "https://static1.squarespace.com/static/52e118c6e4b0c14b4f88dcec/53ea6b48e4b0b68b61945a97/53ea6b72e4b094ab1e4e0c64/1412855342795/Jack+Sparrow-19.jpg",
}

class Profile extends Component {
    state = {
        editMode: true,
        image: DATA.image,
    }

    static navigationOptions = ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name='md-person' />;
        }
    });

    pickImage = async () => {
        if(!this.state.editMode) {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            console.log(result);
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }
        }
        return;
    };

    renderInputStyle = () => {
        if(this.state.editMode) {
            return {
                opacity: 0.5
            }
        }
        return {
            opacity: 1
        }
    }

    renderScreen = () => {
        const {
            containerStyle,
            buttonStyle,
            buttonTextStyle,
            labelStyle,
            privacyStyle,
            formContainerStyle,
            inputRowContainerStyle,
            inputContainerStyle,
            itemRowContainerStyle,
            pickerContainerStyle,
            heroContainerStyle,
            editButtonContainerStyle,
            editButtonStyle,
            imageContainerStyle,
            imageStyle
        } = styles;
        if(this.props.data) {
            return(
                <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <View style={containerStyle}>
                    <View style={heroContainerStyle}>
                        <TouchableOpacity style={editButtonContainerStyle} onPress={() => this.setState({editMode: this.state.editMode ? false : true})}>
                            <Icon style={editButtonStyle} name="md-create" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.pickImage()} style={imageContainerStyle}>
                            <Image source={{uri: this.state.image}} resizeMode="cover" style={imageStyle} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={containerStyle}>
                        <View style={ formContainerStyle }>
                            <View style={ inputRowContainerStyle }>
                                <View style={itemRowContainerStyle}>
                                    <Item stackedLabel>
                                        <Label style={labelStyle}>FIRST NAME*</Label>
                                        <Input style={this.renderInputStyle()} onChangeText={(text) => this.props.changeFirstName(text)} disabled={this.state.editMode} value={this.props.data.firstname} />
                                    </Item>
                                </View>
                                <View style={ itemRowContainerStyle }>
                                    <Item stackedLabel>
                                        <Label style={labelStyle}>LAST NAME*</Label>
                                        <Input style={this.renderInputStyle()} onChangeText={(text) => this.props.changeLastName(text)} disabled={this.state.editMode} value={this.props.data.lastname} />
                                    </Item>
                                </View>
                            </View>
                            <View style={inputContainerStyle}>
                                <Item stackedLabel>
                                    <Label style={labelStyle}>EMAIL ADDRESS*</Label>
                                    <Input keyboardType="email-address" style={this.renderInputStyle()} onChangeText={(text) => this.props.changeEmail(text)} disabled={this.state.editMode} value={this.props.data.email} />
                                </Item>
                            </View>

                            <View style={ inputRowContainerStyle }>
                                <View style={ itemRowContainerStyle }>
                                    <Item stackedLabel>
                                        <Label style={labelStyle}>PHONE*</Label>
                                        <Input keyboardType="phone-pad" style={this.renderInputStyle()} onChangeText={(text) => this.props.changePhone(text)} disabled={this.state.editMode} value={this.props.data.phone.toString()} />
                                    </Item>
                                </View>
                            </View>

                            <Button onPress={() => this.props.saveUser(this.props.data, this.props.token)} style={ buttonStyle } block warning>
                                <Text style={buttonTextStyle}>Update Profile</Text>
                            </Button>
                        </View>
                    </ScrollView>
                </View>
                </KeyboardAvoidingView>
            );
        }
        if(this.props.token && !this.props.data) {
            this.props.getProfile(this.props.token);
        }
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E9E9EF'}}>
                <Spinner color="#FF6F00" />
            </View>
        );
    }

    render() {
        return(
            <View style={{flex: 1}}>
                {this.renderScreen()}
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    },
    heroContainerStyle: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#FF6F00'
    },
    editButtonContainerStyle: {
        position: 'absolute',
        right: 15,
        top: 24
    },
    imageContainerStyle: {
        overflow:'hidden',
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    imageStyle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 6,
        borderColor:'rgba(255,255,255,0.7)'
    },
    editButtonStyle: {
        backgroundColor:'transparent',
        color: 'white',
        fontSize: 24
    },
    formContainerStyle: {
        flex: 1,
        marginTop: 15,
        justifyContent: 'center'
    },
    buttonStyle: {
        marginTop: 15,
        backgroundColor: '#FF6F00',
        margin: 10
    },
    buttonTextStyle: {
        color: 'white'
    },
    labelStyle: {
        fontSize: 12,
        color: '#FF6F00',
        textAlign:'left',
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
}

function mapStateToProps({ profile }) {
    return profile;
}

export default connect(mapStateToProps, actions)(Profile);
