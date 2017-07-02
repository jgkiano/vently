import React, { Component } from 'react';
import { View, Text, Platform, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Icon, Item, Label, Input, Spinner, Button } from 'native-base';
import Expo from 'expo';
import _ from 'lodash';
import { BackButton } from '../components';


class Share extends Component {
    state = {
        typedValue: "",
        permissionGranted: null,
        contacts: null,
        hasUserStartedTyping: false,
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'React Native Essential Training Ticket',
        headerTitle: <Text style={styles.titleStyle}>SHARE</Text>,
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name = 'md-pricetags' />;
        },
        headerLeft: <BackButton back={navigation.goBack}/>
    });

    componentDidMount() {
        this.getContactsPermission();
    }

    getPhoneContacts = async (offset = 0) => {
        console.log("called");
        const { total } = await Expo.Contacts.getContactsAsync();
        const { data } = await Expo.Contacts.getContactsAsync({
            fields: [
                Expo.Contacts.PHONE_NUMBERS,
                Expo.Contacts.EMAILS,
            ],
            pageSize: total
        });
        const cleanData = _.uniqBy(data, 'name');
        this.setState({contacts: cleanData});
    };

    getContactsPermission = async () => {
        // Ask for permission to query contacts.
        const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
        if (permission.status !== 'granted') {
            this.setState({permissionGranted: false});
            return;
        }
        this.setState({permissionGranted: true});
        this.getPhoneContacts();
    };

    contactPressed = (contact) => {
        Alert.alert(
            `Share ticket with ${contact.name}`,
            `Are you sure you'd like to share this ticket with ${contact.name}, phone number: ${contact.phoneNumbers[0].number}?`,
            [
                {text: 'Share Ticket', onPress: () => console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        );
    };

    renderItem = (contact) => {
        return (
            <TouchableOpacity onPress={() => this.contactPressed(contact)}>
                <View style={{flexDirection: 'row', paddingLeft: 15, paddingRight: 15, alignItems: 'center', backgroundColor: 'white', paddingTop: 15, paddingBottom: 15, borderBottomWidth:1, borderColor:"rgba(51,51,51,0.2)"}}>
                    <View style={{width: 50, height: 50, backgroundColor: 'black', borderRadius: 25, backgroundColor: '#FF6F00', alignItems: 'center', justifyContent:'center'}}>
                        <Text style={{color: 'white', fontSize: 18}}>{contact.name.charAt(0).toUpperCase()}</Text>
                    </View>
                    <Text style={{marginLeft: 15, fontSize: 18, opacity: 0.9}}>{contact.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    renderList = () => {
        if(this.state.typedValue==="") {
            return <View />;
        }
        const numberOfCharsTyped = this.state.typedValue.length;
        const filterContacts = this.state.contacts.filter((contact) => {
            return this.state.typedValue === contact.name.substring(0, numberOfCharsTyped);
        });
        return (
            <FlatList
                data={filterContacts}
                renderItem={({item}) => this.renderItem(item)}
                keyExtractor={item => this.state.contacts.indexOf(item)}
                removeClippedSubviews={false}
                extraData={this.state}
            />
        );
    };

    setInputText = () => {
        if(!this.state.hasUserStartedTyping) {

        }
    }

    renderSpinner = () => {
        const {
            errorButtonStyle,
            errorButtonTextStyle
        } = styles;
        if(this.state.contacts === null && this.state.permissionGranted === true) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                    <Spinner size='large' color='#FF6F00' />
                    <Text>Accessing contacts..this may take a while</Text>
                </View>
            );
        }
        if(this.state.permissionGranted === false) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                    <Text style={{textAlign:"center", fontSize: 16, padding: 18}}>Hey there! To share tickets with your buddies we kinda need to access your contacts. We promise not to spam them.</Text>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Button style={errorButtonStyle} onPress={() => this.getContactsPermission()}><Text style={errorButtonTextStyle}>Grant Permission</Text></Button>
                    </View>
                </View>
            );
        }
        return (
            <View style={{flex: 1, marginTop: 15}}>
                <Item style={{marginLeft: 15, marginRight: 15, marginBottom: 15}} floatingLabel>
                    <Label>Contact Name</Label>
                    <Input autoCapitalize="words" autoCorrect={false} value={this.state.typedValue} onChangeText={(text) => this.setState({typedValue: text})} />
                </Item>
                {this.renderList()}
            </View>
        );
    };

    render() {
        return (
            <View style={{flex: 1}}>
                {this.renderSpinner()}
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
    errorButtonStyle: {
        backgroundColor: '#FF6F00',
        alignItems: 'center'
    },
    errorButtonTextStyle: {
        color: 'white'
    },
}

export default Share;
