import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Button, Icon } from 'native-base';
import { MapView, Location, Permissions, Constants } from 'expo';
import { BackButton } from '../components';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const LONG_DELTA = 0.0094;
const LAT_DELTA = 0.0139;

const userMarker = require('../assets/images/happy.png');
const airplaneMarker    = require('../assets/images/markers/airplane-marker.png');
const atomicMarker      = require('../assets/images/markers/atomic-marker.png');
const babyMarker        = require('../assets/images/markers/baby-marker.png');
const charity           = require('../assets/images/markers/charity-marker.png');
const communityMarker   = require('../assets/images/markers/community-marker.png');
const electionsMarker   = require('../assets/images/markers/elections-marker.png');
const footballMarker    = require('../assets/images/markers/football-marker.png');
const idMarker          = require('../assets/images/markers/id-marker.png');
const movieMarker       = require('../assets/images/markers/movie-marker.png');
const musicMarker       = require('../assets/images/markers/music-marker.png');
const playMarker        = require('../assets/images/markers/play-marker.png');
const prayingMarker     = require('../assets/images/markers/praying-marker.png');

const DATA = [
    {
        id: 0,
        eventName: '5 day trip to Dubai',
        eventLocation: {
            latitude: -1.314279,
            longitude: 36.839887
        },
        eventLocationDesc: 'Bonfire Adventures, ThisCoolMall 3rd Floor',
        eventMarker: airplaneMarker
    },
    {
        id: 1,
        eventName: 'React Native Essential Training',
        eventLocation: {
            latitude: -1.304980,
            longitude: 36.812393
        },
        eventLocationDesc: 'Strathmore University 5th Floor',
        eventMarker: atomicMarker
    },
    {
        id: 2,
        eventName: 'Family Health Training Seminar',
        eventLocation: {
            latitude: -1.301140,
            longitude: 36.821645
        },
        eventLocationDesc: 'CoolBuilding, 2nd Floor',
        eventMarker: babyMarker
    },
    {
        id: 3,
        eventName: 'Matter Heart Run',
        eventLocation: {
            latitude: -1.304564,
            longitude: 36.824398
        },
        eventLocationDesc: 'Nyayo Stadium',
        eventMarker: charity
    },
    {
        id: 4,
        eventName: 'JS Developer Community Meet Up',
        eventLocation: {
            latitude: -1.313398,
            longitude: 36.805862
        },
        eventLocationDesc: 'Dev Building 12th Floor',
        eventMarker: communityMarker
    },
    {
        id: 5,
        eventName: 'Jubilee Public Meeting',
        eventLocation: {
            latitude: -1.316054,
            longitude: 36.816939
        },
        eventLocationDesc: 'Jubilee House',
        eventMarker: electionsMarker
    },
    {
        id: 6,
        eventName: 'SportPesa Launch Party',
        eventLocation: {
            latitude: -1.312790,
            longitude: 36.821101
        },
        eventLocationDesc: 'Pesa House 3rd Floor',
        eventMarker: footballMarker
    },
    {
        id: 7,
        eventName: 'Business Ethics Seminar',
        eventLocation: {
            latitude: -1.296627,
            longitude: 36.819788
        },
        eventLocationDesc: 'Lower Hill Rd',
        eventMarker: idMarker
    },
    {
        id: 8,
        eventName: 'Black Panther Launch',
        eventLocation: {
            latitude: -1.294578,
            longitude: 36.819564
        },
        eventLocationDesc: 'IMAXX, CBD Area',
        eventMarker: movieMarker
    },
    {
        id: 9,
        eventName: 'Sauti Sol LIVE!',
        eventLocation: {
            latitude: -1.291538,
            longitude: 36.818027
        },
        eventLocationDesc: 'Uhuru Park',
        eventMarker: musicMarker
    },
    {
        id: 10,
        eventName: 'Living Art Debut',
        eventLocation: {
            latitude: -1.303796,
            longitude: 36.800164
        },
        eventLocationDesc: 'Some Hippy Place',
        eventMarker: playMarker
    },
    {
        id: 11,
        eventName: 'Worship Movement',
        eventLocation: {
            latitude: -1.297587,
            longitude: 36.807591
        },
        eventLocationDesc: 'All Saints',
        eventMarker: prayingMarker
    },
]

class Map extends Component {

    state = {
        location: null,
        errorMessage: null,
    };

    static navigationOptions = ({ navigation }) => ({
        title: 'Events Near Me',
        headerTitle: <Text style={styles.titleStyle}>Events Near Me</Text>,
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name = 'ios-home' />;
        },
        headerLeft: <BackButton back={navigation.goBack}/>
    });

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    renderMarkerCallouts = (event) => {
        const {
            eventLocation,
            eventName,
            eventLocationDesc,
            eventMarker,
            id
        } = event;
        const {
            calloutContainerStyle,
            calloutLocationTextStyle,
            calloutViewContainerStyle,
            calloutViewIconStyle,
            calloutViewTextStyle
        } = styles;
        return (
            <MapView.Callout>
                <View style={calloutContainerStyle}>
                    <Text>{eventName}</Text>
                    <Text style={calloutLocationTextStyle}>{eventLocationDesc}</Text>
                    <View style={calloutViewContainerStyle}>
                        <Icon style={calloutViewIconStyle} name="md-eye" />
                        <Text style={calloutViewTextStyle}>View Event</Text>
                    </View>
                </View>
            </MapView.Callout>
        );
    }

    renderMarkers = () => {
        return DATA.map((event) => {
            return (
                <MapView.Marker
                    key={event.id}
                    coordinate={event.eventLocation}
                    title={event.eventName}
                    description={event.eventLocationDesc}
                    image={event.eventMarker}
                >
                    {this.renderMarkerCallouts(event)}
                </MapView.Marker>
            );
        });
    };

    renderEventMap = () => {
        const {
            errorContainerStyle,
            errorButtonContainerStyle,
            errorButtonStyle,
            errorButtonTextStyle,
            container
        } = styles;
        if(this.state.location === null) {
            if(this.state.errorMessage !== null) {
                return (
                    <View style={errorContainerStyle}>
                        <Text>{this.state.errorMessage}</Text>
                        <View style={errorButtonContainerStyle}>
                            <Button onPress={() => this._getLocationAsync()} style={errorButtonStyle}>
                                <Text style={errorButtonTextStyle}>Grant Permission</Text>
                            </Button>
                        </View>
                    </View>
                );
            }
            return;
        }
        const {
            latitude,
            longitude
        } = this.state.location.coords;
        return (
            <MapView
                style={container}
                initialRegion={{
                    latitude,
                    longitude,
                    longitudeDelta: LONG_DELTA,
                    latitudeDelta: LAT_DELTA
                }}
                onRegionChangeComplete = { (region) => console.log(region) }
                >
                <MapView.Marker
                    coordinate={{latitude, longitude}}
                    title={"There you are!"}
                    description={"Your current location"}
                    image={userMarker}
                    onCalloutPress = {() => console.log("pressed callout")}
                />
                {this.renderMarkers()}
            </MapView>
        );
    };

    render() {
        console.ignoredYellowBox = ['Warning: View.propTypes'];
        return (
            <View style={styles.container}>
                { this.renderEventMap() }
            </View>
        );
    }
}

const styles = {
    titleStyle: {
        letterSpacing: 2,
        fontSize: 18,
        color: 'white'
    },
    calloutContainerStyle: {
        width: 250,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 8
    },
    calloutLocationTextStyle: {
        opacity:0.7,
        fontSize: 12,
        marginTop: 4
    },
    calloutViewContainerStyle: {
        flexDirection:'row',
        alignItems:'center',
        marginTop: 4
    },
    calloutViewIconStyle: {
        fontSize: 16,
        color:'#FF6F00',
        marginRight: 4
    },
    calloutViewTextStyle: {
        fontSize: 12,
        color:'#FF6F00'
    },
    errorContainerStyle: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorButtonContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    errorButtonStyle: {
        backgroundColor: '#FF6F00',
        alignItems: 'center'
    },
    errorButtonTextStyle: {
        color: 'white'
    },
    container: {
        flex: 1
    }
};

export default Map;
