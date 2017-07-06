import React, { Component } from 'react';
import { View, Text, Image, Alert, Dimensions, FlatList, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native';
import { Button, Icon, Spinner } from 'native-base';
import moment from 'moment';
import Share, {ShareSheet} from 'react-native-share';

import { connect } from 'react-redux';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Feed extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Home',
        headerTitle: <Text style={styles.titleStyle}>VENTLY</Text>,
        headerRight: <TouchableOpacity
            onPress={() => {navigation.navigate('map')}}
            ><Icon style={styles.mapIconStyle} name='md-map' /></TouchableOpacity>,
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name = 'ios-home' />;
        }
    });

    toggleEventSave = (id) => {
        let { savedEvents } = this.props;
        if(savedEvents.indexOf(id) > -1) {
            this.props.removeEvent(id);
        } else {
            this.props.saveEvent(id);
        }
    }

    renderBookmark = (id) => {
        const {
            activeBookmark,
            inactiveBookmark
        } = styles;
        if(this.props.savedEvents.indexOf(id) > -1) {
            return activeBookmark;
        }
        return inactiveBookmark;
    }

    startShareEvent = (event) => {
        Share.open({
            title: event.name,
            message: `Hey, check out ${event.name} thats happening at ${event.locationDescription}. Install Vetly to get your tickets. Download the app`,
            url: 'http://facebook.com',
            subject: "Share Link" //  for email
        }).catch((err) => { err && console.log("error->", err); })
    }

    renderItem = (event) => {
        const {
            cardContainerStyle,
            cardImageStyle,
            eventMetaContainerStyle,
            dateContainerStyle,
            dateStyle,
            timeConatinerStyle,
            timeStyle,
            actionButtonsContainer,
            shareStyle,
            eventNameContainerStyle,
            eventNameStyle,
            bottomMetaContainerStyle,
            locationContainerStyle,
            pinStyle,
            locationNameStyle,
            priceContainerStyle,
            eventPriceStyle
        } = styles;
        return (
            <View style={cardContainerStyle}>
                <TouchableWithoutFeedback onPress={() => this.props.goToEvent(event._id, this.props.navigation, this.props.token)}>
                    <Image
                        style={cardImageStyle}
                        source={{uri: event.banner}}
                        resizeMode="cover" />
                </TouchableWithoutFeedback>
                <View>
                    <View style={eventMetaContainerStyle}>
                        <View style={dateContainerStyle}>
                            <Text style={dateStyle}>{moment(event.dateFrom).format('MMMM DD')}</Text>
                        </View>
                        <View style={timeConatinerStyle}>
                            <Text style={timeStyle}>{moment(event.dateFrom).format('h:hh A')} to {moment(event.dateTo).format('h:hh A')}</Text>
                        </View>
                        <View style={actionButtonsContainer}>
                            <TouchableOpacity onPress={() => { this.toggleEventSave(event._id) } }>
                                <Icon style={ this.renderBookmark(event._id) } name='md-bookmark' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.startShareEvent(event)} }>
                                <Icon style={shareStyle} name='share' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('singleEvent')}>
                        <View style={eventNameContainerStyle}>
                            <Text style={eventNameStyle}>{event.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={bottomMetaContainerStyle}>
                        <View style={locationContainerStyle}>
                            <Icon style={pinStyle} name='md-pin' />
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('map')}>
                                <Text style={locationNameStyle}>{event.locationDescription}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={priceContainerStyle}>
                            <Text style={eventPriceStyle}>KES {event.price}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderScreen = () => {
        if(this.props.feed.length === 0) {
            this.props.getEventFeed(this.props.token);
            return(
                <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                    <Spinner color='#FF6F00' />
                </View>
            );
        }
        return(
            <FlatList
                data={this.props.feed}
                renderItem={ ({item}) => this.renderItem(item) }
                keyExtractor={item => item._id}
                extraData={this.props}
                removeClippedSubviews={false}
            />
        );
    }

    render() {
        const {
            feedContainerStyle
        } = styles;
        return(
            <View style={feedContainerStyle}>
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
    mapIconStyle: {
        marginRight: 15,
        color: 'white'
    },
    activeBookmark: {
        opacity: 1,
        color: '#FF6F00'
    },
    inactiveBookmark: {
        opacity: 0.5,
        color: '#757575'
    },
    cardContainerStyle: {
        backgroundColor: 'white',
        marginTop: 7.5,
        marginBottom: 7.5,
        borderRadius: 3,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(51,51,51,0.2)'
    },
    cardImageStyle: {
        width: SCREEN_WIDTH - 15,
        height: 210
    },
    eventMetaContainerStyle: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingTop: 6,
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderColor: '#F5F5F5'
    },
    dateContainerStyle: {
        flex: 1,
        justifyContent: 'center'
    },
    dateStyle: {
        color: '#757575',
        fontSize: 14
    },
    timeConatinerStyle: {
        flex: 2,
        justifyContent: 'center'
    },
    timeStyle: {
        color: '#757575',
        fontSize: 14
    },
    actionButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    shareStyle: {
        color:'#757575'
    },
    eventNameContainerStyle: {
        paddingLeft: 16,
        paddingTop: 12,
        paddingBottom: 12,
    },
    eventNameStyle: {
        color: '#212121',
        fontSize: 18
    },
    bottomMetaContainerStyle: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
    },
    locationContainerStyle: {
        flex: 2,
        flexDirection: 'row'
    },
    pinStyle: {
        color:'#757575',
        fontSize: 18,
        marginRight: 16
    },
    locationNameStyle: {
        color: '#757575',
        fontSize: 14
    },
    priceContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'flex-end'
    },
    eventPriceStyle: {
        color: '#757575',
        fontSize: 14,
        color: '#FF6F00'
    },
    feedContainerStyle: {
        flex: 1,
        alignItems:'center'
    }
};

function mapStateToProps({events}) {
    return events;
}

export default connect(mapStateToProps, actions)(Feed);
