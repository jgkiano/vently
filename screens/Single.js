import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Icon, Button } from 'native-base';
import { BackButton } from '../components';
import { MapView } from 'expo';

const SCREEN_WIDTH = Dimensions.get('window').width;

const camera = require('../assets/images/camera.png');

const LONG_DELTA = 0.0094;
const LAT_DELTA = 0.0139;

const MINIMUM_NUMBER_OF_TICKETS = 1;
const MAXIMUM_NUMBER_OF_TICKETS = 3;

const DATA = {
    id: 0,
    eventName: 'React Native Essential Training',
    banner: 'https://blog.algolia.com/wp-content/uploads/2015/12/react-native.png',
    locationDesc: 'Strathmore University',
    time: 'Wed, Nov 29, 8:00AM - 4:00PM',
    distance: '2hrs',
    weather: 'Partly Cloudy',
    eventDesc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    locationRegion: {
        latitude: -1.3100821,
        longitude: 36.8103461,
        longitudeDelta: LONG_DELTA,
        latitudeDelta: LAT_DELTA
    },
    ticketPrice: 500
}

class Single extends Component {

    state = {
        pricePerTicket: DATA.ticketPrice,
        total: DATA.ticketPrice,
        tickets: 1,
        liked: false
    }

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

    ticketCalculator = async (op) => {
        await this.setState({
            tickets: op == 'add' ? this.state.tickets + 1: this.state.tickets - 1
        }, async () => {
            if(this.state.tickets > MAXIMUM_NUMBER_OF_TICKETS) {
                await this.setState({ tickets: MAXIMUM_NUMBER_OF_TICKETS });
            }
            if(this.state.tickets < MINIMUM_NUMBER_OF_TICKETS) {
                await this.setState({ tickets: MINIMUM_NUMBER_OF_TICKETS });
            }
            await this.setState({
                total: this.state.tickets * this.state.pricePerTicket
            });
        });
    };

    confirmOrder = () => {
        Alert.alert(
            'Almost there!',
            `You\'re almost done. We need you to confirm your order for ${this.state.tickets} ticket(s) for ${DATA.eventName} at KES ${this.state.total}`,
            [
                {text: 'Confirm', onPress: () => this.props.navigation.navigate('pay') },
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
        )
    };

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
                    <Button onPress={() => this.ticketCalculator()} style={ticketBuyButtonStyle} small>
                        <Text style={ticketBuyButtonTextStyle}>-</Text>
                    </Button>
                    <Text style={ticketNumberTextStyle}>{this.state.tickets}</Text>
                    <Button onPress={() => this.ticketCalculator("add") } style={ticketBuyButtonStyle} small>
                        <Text style={ticketBuyButtonTextStyle}>+</Text>
                    </Button>
                </View>
                <View style={ticketPriceContainer}>
                    <Text>KES {this.state.total}</Text>
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
        return (
            <MapView style={mapViewStyle}
                initialRegion={DATA.locationRegion}
                cacheEnabled={true}
                scrollEnabled={false}
            >
                <MapView.Marker
                    coordinate={{latitude: DATA.locationRegion.latitude, longitude: DATA.locationRegion.longitude}}
                    title={DATA.locationDesc}
                    onCalloutPress = {() => console.log("pressed callout")}
                />
            </MapView>
        );
    };



    render() {
        console.ignoredYellowBox = ['Warning: View.propTypes'];
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
                                source={{uri: DATA.banner}}
                                resizeMode="cover" />
                        </View>
                        <View style={titleContainerStyle}>
                            <Text style={titleTextStyle}>{DATA.eventName}</Text>
                            <View style={metaContainerStyle}>
                                <Icon style={metaIconStyle} name='md-pin' />
                                <Text style={metaTextStyle}>{DATA.locationDesc}</Text>
                            </View>
                            <View style={metaContainerStyle}>
                                <Icon style={timeIconStyle} name='md-time' />
                                <Text style={metaTextStyle}>{DATA.time}</Text>
                            </View>
                            <View style={metaContainerStyle}>
                                <Icon style={metaIconStyle} name='ios-map' />
                                <Text style={metaTextStyle}>{DATA.distance} away</Text>
                            </View>
                            <View style={metaContainerStyle}>
                                <Icon style={metaIconStyle} name='ios-shirt' />
                                <Text style={metaTextStyle}>{DATA.weather}</Text>
                            </View>
                        </View>
                        <Text style={sectionTitleStyle}>About</Text>
                        <View style={plainTextContainerStyle}>
                            <Text style={plainTextStyle}>{DATA.eventDesc}</Text>
                        </View>
                        <Text style={sectionTitleStyle}>Location</Text>
                        {this.renderMapLocation()}
                    </View>
                </ScrollView>
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

export default Single;
