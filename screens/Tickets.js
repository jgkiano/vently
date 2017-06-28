import React, { Component } from 'react';
import { View, Text, Platform, FlatList, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'native-base';
import { BackButton } from '../components';

const DATA = [
    {
        id: 0,
        eventName: "React Native Essential Training",
        time: "29th July, 8:00AM",
        tickets: 1
    },
    {
        id: 1,
        eventName: "Burger Fest",
        time: "30th July, 11:00AM",
        tickets: 1
    }
];

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
            eventName,
            time,
            tickets
        } = ticketInfo;
        return (
            <View style={{padding:16, backgroundColor: "#eeeeee", borderBottomWidth: 1, borderColor:"rgba(51,51,51,0.1)", flexDirection:"row"}}>
                <View style={{flex: 9}}>
                    <Text style={{fontSize: 16, marginBottom: 8, opacity: 0.9}}>{eventName}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center', marginRight: 16}}>
                            <Icon style={{fontSize: 18, marginRight: 8, color: "#FF6F00"}} name="md-calendar"></Icon>
                            <Text style={{opacity: 0.7}}>{time}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center', marginRight: 16}}>
                            <Icon style={{fontSize: 18, marginRight: 8, color: "#FF6F00"}} name="md-pricetag"></Icon>
                            <Text style={{opacity: 0.7}}>{tickets} ticket</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent:"center", alignItems:"flex-end"}}>
                    <Icon style={{opacity: 0.3}} name="ios-arrow-forward" />
                </View>
            </View>
        );
    };

    renderItem = (ticketInfo) => {
        if (Platform.OS ==='android') {
            return(
                <TouchableNativeFeedback useForeground>
                    {this.singleItemView(ticketInfo)}
                </TouchableNativeFeedback>
            );
        }
        return(
            <TouchableWithoutFeedback>
                {this.singleItemView(ticketInfo)}
            </TouchableWithoutFeedback>
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
            <FlatList
                data={DATA}
                renderItem={({item}) => this.renderItem(item)}
                keyExtractor={item => item.id}
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
}

export default Tickets;
