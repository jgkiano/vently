import React, { Component } from 'react';
import { View, Text, WebView, Dimensions } from 'react-native';
import { Icon, Spinner, Button } from 'native-base';
import { BackButton } from '../components';

import { connect } from 'react-redux';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const PAY_URL = 'http://192.168.88.37:3000/api/pay/dummy';

class Pay extends Component {

    state = {
        webLoaded: false
    };

    // static navigationOptions = ({ navigation }) => ({
    //     title: 'Payment',
    //     headerTitle: <Text style={styles.titleStyle}>Payment</Text>,
    //     tabBarIcon: ({ tintColor }) => {
    //         return <Icon style={{ color: tintColor }} name = 'ios-home' />;
    //     },
    //     headerLeft: <BackButton back={navigation.goBack}/>
    // });

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Payment',
            headerTitle: <Text style={styles.titleStyle}>Payment</Text>,
            tabBarIcon: ({ tintColor }) => {
                return <Icon style={{ color: tintColor }} name = 'ios-home' />;
            },
            headerLeft: <BackButton onUnMount="getTickets" back={navigation.goBack}/>,
        };
    };

    renderScreen = () => {
        if(this.props.iframe) {
            return(
                <WebView style={{flex: 1, width: SCREEN_WIDTH}} source={{html: this.props.iframe }} />
            );
        }
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Spinner color="#FF6F00" />
            </View>
        );
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:'white'}}>
                {this.renderScreen()}
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
}

function mapStateToProps({ pay }) {
    return pay;
}

export default connect(mapStateToProps, actions)(Pay);
