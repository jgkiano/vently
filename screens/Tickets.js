import React, { Component } from 'react';
import { View, Text, Platform, FlatList, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { Icon, Spinner } from 'native-base';
import { BackButton } from '../components';
import moment from 'moment';

import { connect } from 'react-redux';
import * as actions from '../actions';

class Tickets extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Tickets',
        headerTitle: <Text style={styles.titleStyle}>TICKETS</Text>,
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name = 'md-pricetags' />;
        },
    });

    singleItemView = (ticketInfo) => {
        const {
            name,
            dateFrom,
            totalTickets
        } = ticketInfo;
        const {
            listContainerStyle,
            leftListContainerStyle,
            eventTitleStyle,
            eventMetaContainerStyle,
            singleMetaContainerStyle,
            iconStyle,
            metaTextStyle,
            arrowRightStyle,
            arrowContainerStyle
        } = styles;
        return (
            <View style={listContainerStyle}>
                <View style={leftListContainerStyle}>
                    <Text style={eventTitleStyle}>{name}</Text>
                    <View style={eventMetaContainerStyle}>
                        <View style={singleMetaContainerStyle}>
                            <Icon style={iconStyle} name="md-calendar"></Icon>
                            <Text style={metaTextStyle}>{moment(dateFrom).format('MMMM Do YYYY, h:mm a')}</Text>
                        </View>
                        <View style={singleMetaContainerStyle}>
                            <Icon style={iconStyle} name="md-pricetag"></Icon>
                            <Text style={metaTextStyle}>{totalTickets} ticket(s)</Text>
                        </View>
                    </View>
                </View>
                <View style={arrowContainerStyle}>
                    <Icon style={arrowRightStyle} name="ios-arrow-forward" />
                </View>
            </View>
        );
    };

    renderItem = (ticketInfo) => {
        if (Platform.OS ==='android') {
            return(
                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('single')} useForeground>
                    {this.singleItemView(ticketInfo)}
                </TouchableNativeFeedback>
            );
        }
        return(
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('single')}>
                {this.singleItemView(ticketInfo)}
            </TouchableWithoutFeedback>
        );
    }

    renderScreen = () => {
        if(this.props.token && !this.props.data) {
            this.props.getTickets(this.props.token);
        }
        if(!this.props.data) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                    <Spinner color="#FF6F00" />
                </View>
            );
        } else {
            return (
                <View style={{flex: 1}}>
                    <FlatList
                        data={this.props.data}
                        renderItem={({item}) => this.renderItem(item)}
                        keyExtractor={item => item.eventId}
                    />
                </View>
            )
        }
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
    listContainerStyle: {
        padding:16,
        backgroundColor: "#eeeeee",
        borderBottomWidth: 1,
        borderColor:"rgba(51,51,51,0.1)",
        flexDirection:"row"
    },
    leftListContainerStyle: {
        flex: 9
    },
    eventTitleStyle: {
        fontSize: 16,
        marginBottom: 8,
        opacity: 0.9
    },
    eventMetaContainerStyle: {
        flexDirection: 'row'
    },
    singleMetaContainerStyle: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        marginRight: 16
    },
    iconStyle: {
        fontSize: 18,
        marginRight: 8,
        color: "#FF6F00"
    },
    metaTextStyle: {
        opacity: 0.7
    },
    arrowContainerStyle: {
        flex: 1,
        justifyContent:'center',
        alignItems:'flex-end'
    },
    arrowRightStyle: {
        opacity: 0.3
    }
}

function mapStateToProps({ tickets }) {
    return tickets;
}

export default connect(mapStateToProps, actions)(Tickets);
