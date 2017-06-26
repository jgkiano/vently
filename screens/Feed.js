import React, { Component } from 'react';
import { View, Text, StatusBar, Image, Dimensions, FlatList, List, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';

import Share, {ShareSheet} from 'react-native-share';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const DATA = [
    {
        id: 0,
        banner: 'https://blog.algolia.com/wp-content/uploads/2015/12/react-native.png',
        eventName: "React Native Essential Training",
        date: 'June 7th',
        from: '8 pm',
        to: '11 pm',
        locationName: 'Strathmore University',
        price: 500
    },
    {
        id: 1,
        banner: 'http://lorempixel.com/1920/1080/',
        eventName: "Burger Fest",
        date: 'June 10th',
        from: '7 am',
        to: '12 pm',
        locationName: 'Burger King',
        price: 750
    },
    {
        id: 2,
        banner: 'http://lorempixel.com/1920/1080/',
        eventName: "Ultimate Rap and Dance Battle",
        date: 'May 7th',
        from: '9 am',
        to: '3 pm',
        locationName: 'Lifestyle Building, 5th floor',
        price: 350
    },
    {
        id: 3,
        banner: 'http://lorempixel.com/1920/1080/',
        eventName: "First Person Shooter Game Tournament",
        date: 'May 15th',
        from: '11 am',
        to: '9 pm',
        locationName: 'Dev Building',
        price: 1200
    },
    {
        id: 4,
        banner: 'http://lorempixel.com/1920/1080/',
        eventName: "Introduction To Hacking Seminar",
        date: 'May 20th',
        from: '8 am',
        to: '4 pm',
        locationName: 'Strathmore University',
        price: 700
    },
];

class Feed extends Component {

    state = {
        savedEvents: []
    }

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
        let savedEvents = this.state.savedEvents;
        if(savedEvents.indexOf(id) > -1) {
            savedEvents.splice(savedEvents.indexOf(id), 1);
            this.setState({
                savedEvents
            });
        } else {
            savedEvents.push(id);
            this.setState({
                savedEvents
            });
        }
    }

    renderBookmark = (id) => {
        const {
            activeBookmark,
            inactiveBookmark
        } = styles;
        if(this.state.savedEvents.indexOf(id) > -1) {
            return activeBookmark;
        }
        return inactiveBookmark;
    }


    startShareEvent = (event) => {
        Share.open({
            title: "React Native",
            message: "Hola mundo",
            url: 'http://facebook.com',
            subject: "Share Link" //  for email
        }).catch((err) => { err && console.log("error->", err); })
    }

    renderList = (event) => {
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
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('singleEvent')}>
                    <Image
                        style={cardImageStyle}
                        source={{uri: event.banner}}
                        resizeMode="cover" />
                </TouchableWithoutFeedback>
                <View>
                    <View style={eventMetaContainerStyle}>
                        <View style={dateContainerStyle}>
                            <Text style={dateStyle}>{event.date}</Text>
                        </View>
                        <View style={timeConatinerStyle}>
                            <Text style={timeStyle}>{event.from} to {event.to}</Text>
                        </View>
                        <View style={actionButtonsContainer}>
                            <TouchableOpacity onPress={() => { this.toggleEventSave(event.id) } }>
                                <Icon style={ this.renderBookmark(event.id) } name='md-bookmark' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.startShareEvent(event)} }>
                                <Icon style={shareStyle} name='share' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('singleEvent')}>
                        <View style={eventNameContainerStyle}>
                            <Text style={eventNameStyle}>{event.eventName}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={bottomMetaContainerStyle}>
                        <View style={locationContainerStyle}>
                            <Icon style={pinStyle} name='md-pin' />
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('map')}>
                                <Text style={locationNameStyle}>{event.locationName}</Text>
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


    render() {
        const {
            feedContainerStyle
        } = styles;
        return(
            <View style={feedContainerStyle}>
            <StatusBar
            backgroundColor="blue"
            barStyle="light-content"
            />
                <FlatList
                    data={DATA}
                    renderItem={ ({item}) => this.renderList(item) }
                    keyExtractor={item => item.id}
                    extraData={this.state}
                />
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
        flex: 1,
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
        flex: 1,
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

export default Feed;
