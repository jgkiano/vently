import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Icon, Button, Spinner } from 'native-base';
import moment from 'moment';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { BackButton } from '../components';

const SCREEN_WIDTH = Dimensions.get('window').width;
const camera = require('../assets/images/camera.png');
const LONG_DELTA = 0.0094;
const LAT_DELTA = 0.0139;

class Single extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'React Native Essential Training',
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name = 'ios-home' />;
        },
        headerStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
        },
        headerTitle: <View></View>,
        headerLeft: <BackButton back={navigation.goBack}/>,
        headerRight: <TouchableOpacity><Icon style={{marginRight: 15, color: 'white'}} name='md-star-outline' /></TouchableOpacity>,
    });

    confirmOrder = () => {
        const order = {
            eventId: this.props.data._id,
            tickets: this.props.tickets,
            total: this.props.ticketPrice,
            user: this.props.token
        };
        Alert.alert(
            'Almost there!',
            `You\'re almost done. We need you to confirm your order for ${order.tickets} ticket(s) for ${this.props.data.name} at KES ${order.total}`,
            [
                {text: 'Confirm', onPress: () => this.props.placeOrder(order, this.props.navigation)},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        )
    };

    formatTime = () => {
        if(this.props.data) {
            const dateFrom = moment(this.props.data.dateFrom);
            const dateTo = moment(this.props.data.dateTo);
            const diff = dateTo.diff(dateFrom,'days');
            if (diff === 0) {
                return `${moment(dateFrom).format('dddd')}, ${moment(dateFrom).format('MMM Do h:mm a')} - ${moment(dateTo).format('h:mm a')}`;
            } else {
                return `${moment(dateFrom).format('dddd')}, ${moment(dateFrom).format('MMM Do')} - ${moment(dateTo).format('dddd')}, ${moment(dateTo).format('MMM Do')}`;
            }
        }
        return "";
    }

    renderTicketBuyWidget = () => {
        const {
            ticketBuyContainerStyle,
            ticketBuyButtonContainerStyle,
            ticketBuyButtonStyle,
            ticketBuyButtonTextStyle,
            ticketNumberTextStyle,
            ticketPriceContainer,
            buyTicketButtonContainerStyle,
            buyTicketButtonTextStyle,
        } = styles;
        return (
            <View style={ticketBuyContainerStyle}>
                <View style={ticketBuyButtonContainerStyle}>
                    <Button onPress={() => this.props.ticketCalculator("sub",this.props.tickets,this.props.data.price)} style={ticketBuyButtonStyle} small>
                        <Text style={ticketBuyButtonTextStyle}>-</Text>
                    </Button>
                    <Text style={ticketNumberTextStyle}>{this.props.tickets}</Text>
                    <Button onPress={() => this.props.ticketCalculator("add",this.props.tickets,this.props.data.price) } style={ticketBuyButtonStyle} small>
                        <Text style={ticketBuyButtonTextStyle}>+</Text>
                    </Button>
                </View>
                <View style={ticketPriceContainer}>
                    <Text>KES {this.props.ticketPrice}</Text>
                </View>
                <View style={buyTicketButtonContainerStyle}>
                    <Button onPress={() => this.confirmOrder()} style={ticketBuyButtonStyle}>
                        <Text style={buyTicketButtonTextStyle}>Buy Ticket</Text>
                    </Button>
                </View>
            </View>
        );
    };

    renderMapLocation = () => {
        const {mapViewStyle} = styles;
        const region = {
            latitude: this.props.data.location[0],
            longitude: this.props.data.location[1],
            longitudeDelta: LONG_DELTA,
            latitudeDelta: LAT_DELTA
        }
        return (
            <MapView style={mapViewStyle}
                initialRegion={region}
                cacheEnabled={true}
                scrollEnabled={false}
            >
                <MapView.Marker
                    coordinate={{latitude: this.props.data.location[0], longitude: this.props.data.location[1]}}
                    title={this.props.data.locationDescription}
                    onCalloutPress = {() => console.log("pressed callout")}
                />
            </MapView>
        );
    };

    renderDistance = () => {
        if(this.props.data.duration) {
            return(
                <View style={styles.metaContainerStyle}>
                    <Icon style={styles.metaIconStyle} name='ios-map' />
                    <Text style={styles.metaTextStyle}>{this.props.data.duration} away</Text>
                </View>
            );
        }
    }

    renderWeather = () => {
        if(this.props.data.weather) {
            return(
                <View style={styles.metaContainerStyle}>
                    <Icon style={styles.metaIconStyle} name='ios-shirt' />
                    <Text style={styles.metaTextStyle}>{this.props.data.weather.description}</Text>
                </View>
            );
        }
    }


    renderScreen = () => {
        if(this.props.data) {
            const {
                container,
                scrollContainerStyle,
                heroImageContainerStyle,
                heroImageStyle,
                titleContainerStyle,
                titleTextStyle,
                metaContainerStyle,
                metaIconStyle,
                metaTextStyle,
                sectionTitleStyle,
                plainTextContainerStyle,
                plainTextStyle,
                timeIconStyle
            } = styles;
            return (
                <View style={container}>
                    {this.renderTicketBuyWidget()}
                    <ScrollView style={scrollContainerStyle}>
                        <View style={container}>
                            <View style={heroImageContainerStyle}>
                                <Image source={camera} />
                                <Image
                                    style={heroImageStyle}
                                    source={{uri: this.props.data.banner}}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={titleContainerStyle}>
                                <Text style={titleTextStyle}>{this.props.data.name}</Text>
                                <View style={metaContainerStyle}>
                                    <Icon style={metaIconStyle} name='md-pin' />
                                    <Text style={metaTextStyle}>{this.props.data.locationDescription}</Text>
                                </View>
                                <View style={metaContainerStyle}>
                                    <Icon style={timeIconStyle} name='md-time' />
                                    <Text style={metaTextStyle}>{this.formatTime()}</Text>
                                </View>
                                {this.renderDistance()}
                                {this.renderWeather()}
                            </View>
                            <Text style={sectionTitleStyle}>About</Text>
                            <View style={plainTextContainerStyle}>
                                <Text style={plainTextStyle}>{this.props.data.description}</Text>
                            </View>
                            <Text style={sectionTitleStyle}>Location</Text>
                            {this.renderMapLocation()}
                        </View>
                    </ScrollView>
                </View>
            );
        }
        if(this.props.eventId && !this.props.data) {
            this.props.getEventDetailes(this.props.eventId, this.props.token);
        }
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Spinner color="#FF6F00" />
            </View>
        );
    }

    render() {
        console.ignoredYellowBox = ['Warning: View.propTypes'];
        return (
            <View style={{flex: 1}}>
                {this.renderScreen()}
            </View>
        );
    }

}

const styles = {
    container: {
        flex: 1
    },
    titleStyle: {
        fontSize: 18,
        color: 'white'
    },
    ticketBuyContainerStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        flexDirection:'row',
        padding: 8, zIndex: 80
    },
    ticketBuyButtonContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row'
    },
    ticketBuyButtonStyle: {
        backgroundColor: '#FF6F00',
        height: 30
    },
    ticketBuyButtonTextStyle: {
        color:'white',
        fontWeight: 'bold'
    },
    ticketNumberTextStyle: {
        fontSize: 18,
        marginLeft: 16,
        marginRight: 16,
        opacity: 0.8
    },
    ticketPriceContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row'
    },
    buyTicketButtonContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row'
    },
    buyTicketButtonTextStyle: {
        color:'white'
    },
    scrollContainerStyle: {
        flex: 1,
        marginBottom: 46
    },
    heroImageContainerStyle: {
        width: SCREEN_WIDTH,
        height: 275,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heroImageStyle: {
        position:'absolute',
        top:0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 5
    },
    titleContainerStyle: {
        flex: 1,
        padding: 15,
        backgroundColor: 'white'
    },
    titleTextStyle: {
        fontSize: 22,
        opacity: 0.9,
        marginBottom: 15
    },
    metaContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6
    },
    metaIconStyle: {
        fontSize: 16,
        marginRight: 17,
        color:'#FF6F00',
        opacity: 0.9
    },
    timeIconStyle: {
        fontSize: 16,
        marginRight: 15,
        color:'#FF6F00',
        opacity: 0.9
    },
    metaTextStyle: {
        opacity: 0.8
    },
    sectionTitleStyle: {
        margin: 15,
        fontSize: 16
    },
    plainTextContainerStyle: {
        padding: 15,
        backgroundColor: 'white'
    },
    plainTextStyle: {
        opacity: 0.7,
        lineHeight: 26
    },
    mapViewStyle: {
        width: SCREEN_WIDTH,
        height: 200
    }
}

function mapStateToProps({ singleEvent }) {
    return singleEvent;
}

export default connect(mapStateToProps, actions)(Single);
