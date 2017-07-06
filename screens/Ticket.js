import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity, Dimensions, Image, TouchableHighlight } from 'react-native';
import { Icon, Button, Spinner } from 'native-base';
import moment from 'moment';
import { BackButton } from '../components';
import QRCode from 'react-native-qrcode';

import { connect } from 'react-redux';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SingleTicket extends Component {
    state = {
        isCodeVisible: false,
    }
    static navigationOptions = ({ navigation }) => ({
        title: 'React Native Essential Training Ticket',
        headerTitle: <Text style={styles.titleStyle}>EVENT TICKET</Text>,
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name = 'md-pricetags' />;
        },
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('share')}><Icon style={styles.planeIconStyle} name='md-paper-plane' /></TouchableOpacity>,
        headerLeft: <BackButton back={navigation.goBack}/>
    });

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    formatTime = () => {
        if(this.props.data) {
            const {
                _dateFrom,
                _dateTo
            } =  this.props.data.eventId;
            const dateFrom = moment(_dateFrom);
            const dateTo = moment(_dateTo);
            const diff = dateTo.diff(dateFrom,'days');
            if (diff === 0) {
                return `${moment(dateFrom).format('dddd')}, ${moment(dateFrom).format('MMM Do h:mm a')} - ${moment(dateTo).format('h:mm a')}`;
            } else {
                return `${moment(dateFrom).format('dddd')}, ${moment(dateFrom).format('MMM Do')} - ${moment(dateTo).format('dddd')}, ${moment(dateTo).format('MMM Do')}`;
            }
        }
        return "";
    }

    renderTicketInfo = () => {
        const {
            leftTicketCircleStyle,
            rightTicketCircleStyle,
            singleMetaContainerStyle,
            iconStyle,
            metaTextStyle,
            buttonStyle,
            buttonTextStyle,
            qrContainer,
            backTextStyle
        } = styles;
        const {
            _id,
            name,
            locationDescription
        } = this.props.data.eventId;
        if(this.state.isCodeVisible) {
            return (
                <View style={qrContainer}>
                    <TouchableHighlight onPress={() => this.setState({isCodeVisible: false})}>
                        <View>
                            <QRCode
                                value={_id}
                                bgColor='#FF6F00'
                                fgColor='white'
                            />
                        </View>
                    </TouchableHighlight>
                    <Text style={backTextStyle}>Tap code to go back</Text>
                </View>
            );
        }
        return(
            <View>
                <View style={singleMetaContainerStyle}>
                    <Icon style={iconStyle} name="md-pricetag"></Icon>
                    <Text style={metaTextStyle}>{this.props.totalTickets} Ticket(s)</Text>
                </View>
                <Text style={{fontSize: 18, marginBottom: 12, marginTop: 12}}>{name}</Text>
                <View style={[singleMetaContainerStyle, {marginBottom: 8}]}>
                    <Icon style={iconStyle} name="md-calendar"></Icon>
                    <Text style={[metaTextStyle]}>{this.formatTime()}</Text>
                </View>
                <View style={singleMetaContainerStyle}>
                    <Icon style={iconStyle} name="md-pin"></Icon>
                    <Text style={metaTextStyle}>{locationDescription}</Text>
                </View>
                <Button style={ buttonStyle } block warning onPress={() =>  this.setState({isCodeVisible: true})}>
                    <Text style={buttonTextStyle}>Generate Code</Text>
                </Button>
            </View>
        );
    };

    renderScreen = () => {
        const {
            leftTicketCircleStyle,
            rightTicketCircleStyle,
            singleMetaContainerStyle,
            iconStyle,
            metaTextStyle,
            buttonStyle,
            buttonTextStyle,
            ticketContainerStyle,
            ticketImageStyle,
            ticketInfoContainerStyle
        } = styles;
        if(!this.props.data) {
            return(
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Spinner color="#FF6F00" />
                </View>
            );
        }
        const { banner } = this.props.data.eventId;

        return(
            <View style={{flex: 1, width: SCREEN_WIDTH}}>
                <View style={ticketContainerStyle}>
                    <View style={leftTicketCircleStyle} />
                    <View style={rightTicketCircleStyle} />
                    <View style={{flex:1}}>
                        <Image resizeMode="cover" source={{uri: banner}} style={ticketImageStyle} />
                    </View>
                    <View style={ticketInfoContainerStyle}>
                        {this.renderTicketInfo()}
                    </View>
                </View>
            </View>
        );
    }
    render() {
        return (
            <View style={{flex: 1}}>
                {this.renderScreen()}
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
        backgroundColor:'#E9E9EF',
        position: 'absolute',
        top: "50%",
        transform:[{translateY: -20},{translateX: -20}],
        borderRadius: 20,
        zIndex: 50
    },
    rightTicketCircleStyle: {
        width: 40,
        height: 40,
        backgroundColor:'#E9E9EF',
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
    ticketContainerStyle: {
        position: 'absolute',
        top: 15,
        left: 15,
        right: 15,
        bottom: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        overflow:"hidden"
    },
    ticketImageStyle: {
        width: "100%",
        flex:1,
        borderRadius: 15,
        overflow:"hidden"
    },
    ticketInfoContainerStyle: {
        flex:1,
        position:"relative",
        top: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    qrContainer: {
        flex: 1,
        position:"relative",
        top: -20,
        justifyContent: "center",
        alignItems:"center"
    },
    backTextStyle: {
        marginTop: 8,
        opacity: 0.8
    }
}


function mapStateToProps({ singleTicket }) {
    return singleTicket;
}

export default connect(mapStateToProps, actions)(SingleTicket);
