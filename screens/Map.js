import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Button, Icon, Spinner } from 'native-base';
import { MapView, Location, Permissions, Constants } from 'expo';

import { connect } from 'react-redux';
import * as actions from '../actions';


import { BackButton } from '../components';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const LONG_DELTA = 0.0094;
const LAT_DELTA = 0.0139;

const userMarker = require('../assets/images/happy.png');


class Map extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Events Near Me',
        headerTitle: <Text style={styles.titleStyle}>Events Near Me</Text>,
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name = 'ios-home' />;
        },
        headerLeft: <BackButton back={navigation.goBack}/>
    });

    renderMarkerCallouts = (event) => {
        const {
            name,
            locationDescription,
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
                    <Text>{name}</Text>
                    <Text style={calloutLocationTextStyle}>{locationDescription}</Text>
                    <View style={calloutViewContainerStyle}>
                        <Icon style={calloutViewIconStyle} name="md-eye" />
                        <Text style={calloutViewTextStyle}>View Event</Text>
                    </View>
                </View>
            </MapView.Callout>
        );
    }

    renderMarkers = () => {
        return this.props.data.map((event) => {
            console.log(event);
            return (
                <MapView.Marker
                    key={event._id}
                    coordinate={{latitude: event.location[0], longitude: event.location[1]}}
                    title={event.name}
                    description={event.locationDescription}
                    image={event.interest.icon}
                    onCalloutPress = {() => this.props.goToEvent(event._id, this.props.navigation, this.props.token)}
                >
                    {this.renderMarkerCallouts(event)}
                </MapView.Marker>
            );
        });
    };

    renderEventMap = () => {
        if(this.props.data) {
            const {
                errorContainerStyle,
                errorButtonContainerStyle,
                errorButtonStyle,
                errorButtonTextStyle,
                container
            } = styles;

            return (
                <MapView
                    style={container}
                    initialRegion={{
                        latitude: this.props.userLoc.latitude,
                        longitude: this.props.userLoc.longitude,
                        longitudeDelta: LONG_DELTA,
                        latitudeDelta: LAT_DELTA
                    }}
                    onRegionChangeComplete = { (region) => this.props.getEventsOnRegionChange(this.props.token, region) }
                    >
                    <MapView.Marker
                        coordinate={{latitude: this.props.userLoc.latitude, longitude: this.props.userLoc.longitude,}}
                        title={"There you are!"}
                        description={"Your current location"}
                        image={userMarker}
                        onCalloutPress = {() => console.log("pressed callout")}
                    />
                    {this.renderMarkers()}
                </MapView>
            );
        }
        if(this.props.token && !this.props.data) {
            this.props.getEventsNear(this.props.token, this.props.navigation);
        }
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Spinner color="#FF6F00" />
            </View>
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
        width: Platform.OS === 'android' ? 250 : 200,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: Platform.OS === 'android' ? 8 : 0
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

function mapStateToProps({ map }) {
    return map;
}

export default connect(mapStateToProps, actions)(Map);
