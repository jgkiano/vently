import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity, Dimensions, Image, TouchableHighlight } from 'react-native';
import { Icon, Button } from 'native-base';
import { BackButton } from '../components';
import QRCode from 'react-native-qrcode';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SingleTicket extends Component {
    state = {
        isCodeVisible: false
    }
    static navigationOptions = ({ navigation }) => ({
        title: 'React Native Essential Training Ticket',
        headerTitle: <Text style={styles.titleStyle}>EVENT TICKET</Text>,
        headerRight: <TouchableOpacity
            onPress={() => {navigation.navigate('map')}}
            ><Icon style={styles.planeIconStyle} name='ios-paper-plane' /></TouchableOpacity>,
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name = 'ios-home' />;
        },
        headerLeft: <BackButton back={navigation.goBack}/>
    });

    renderTicketInfo = () => {
        const {
            leftTicketCircleStyle,
            rightTicketCircleStyle,
            singleMetaContainerStyle,
            iconStyle,
            metaTextStyle,
            buttonStyle,
            buttonTextStyle
        } = styles;
        if(this.state.isCodeVisible) {
            return (
                <View style={{flex: 1, position:"relative", top: -20, justifyContent: "center", alignItems:"center"}}>
                    <TouchableHighlight onPress={() => this.setState({isCodeVisible: false})}>
                        <View>
                            <QRCode
                                value={"hello"}
                                bgColor='#FF6F00'
                                fgColor='white'
                            />
                        </View>
                    </TouchableHighlight>
                    <Text style={{marginTop: 8, opacity: 0.8}}>Tap code to go back</Text>
                </View>
            );
        }
        return(
            <View>
                <View style={singleMetaContainerStyle}>
                    <Icon style={iconStyle} name="md-pricetag"></Icon>
                    <Text style={metaTextStyle}>1 Ticket</Text>
                </View>
                <Text style={{fontSize: 18, marginBottom: 12, marginTop: 12}}>React Native Essential Training</Text>
                <View style={[singleMetaContainerStyle, {marginBottom: 8}]}>
                    <Icon style={iconStyle} name="md-calendar"></Icon>
                    <Text style={[metaTextStyle]}>Wed, 27 July 8:00AM to 12:00PM</Text>
                </View>
                <View style={singleMetaContainerStyle}>
                    <Icon style={iconStyle} name="md-pin"></Icon>
                    <Text style={metaTextStyle}>Strathmore University</Text>
                </View>
                <Button style={ buttonStyle } block warning onPress={() => this.setState({isCodeVisible: true})}>
                    <Text style={buttonTextStyle}>Generate Code</Text>
                </Button>
            </View>
        );
    };

    render() {
        const {
            leftTicketCircleStyle,
            rightTicketCircleStyle,
            singleMetaContainerStyle,
            iconStyle,
            metaTextStyle,
            buttonStyle,
            buttonTextStyle
        } = styles;
        return (
            <View style={{flex: 1, width: SCREEN_WIDTH}}>
                <View style={{position: 'absolute', top: 15, left: 15, right: 15, bottom: 15, backgroundColor: 'white', borderRadius: 15, overflow:"hidden"}}>
                    <View style={leftTicketCircleStyle} />
                    <View style={rightTicketCircleStyle} />
                    <View style={{flex:1}}>
                        <Image resizeMode="cover" source={{uri: 'https://blog.algolia.com/wp-content/uploads/2015/12/react-native.png'}} style={{width: "100%", flex:1, borderRadius: 15, overflow:"hidden"}} />
                    </View>
                    <View style={{flex:1, position:"relative", top: 20, paddingLeft: 15, paddingRight: 15}}>
                        {this.renderTicketInfo()}
                    </View>
                </View>
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
    planeIconStyle: {
        marginRight: 15,
        fontSize: 28,
        color: 'white'
    },
    buttonStyle: {
        marginTop: 10,
        backgroundColor: '#FF6F00',
    },
    buttonTextStyle: {
        color: 'white'
    },
    leftTicketCircleStyle: {
        width: 40,
        height: 40,
        backgroundColor:'#E6E5ED',
        position: 'absolute',
        top: "50%",
        transform:[{translateY: -20},{translateX: -20}],
        borderRadius: 20,
        zIndex: 50
    },
    rightTicketCircleStyle: {
        width: 40,
        height: 40,
        backgroundColor:'#E6E5ED',
        position: 'absolute',
        right: 0,
        top: "50%",
        transform:[{translateY: -20},{translateX: 20}],
        borderRadius: 20,
        zIndex: 50
    },
    singleMetaContainerStyle: {
        flexDirection: 'row',
        alignItems:'center',
        marginRight: 16,
    },
    iconStyle: {
        fontSize: 18,
        marginRight: 8,
        color: "#FF6F00"
    },
    metaTextStyle: {
        opacity: 0.7
    },
}

export default SingleTicket;
