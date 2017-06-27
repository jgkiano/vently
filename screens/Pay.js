import React, { Component } from 'react';
import { View, Text, WebView, Dimensions } from 'react-native';
import { Icon, Spinner } from 'native-base';
import { BackButton } from '../components';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PAY_URL = 'http://192.168.1.100:3000/api/pay/dummy';

class Pay extends Component {

    state = {
        webLoaded: false
    };

    static navigationOptions = ({ navigation }) => ({
        title: 'Payment',
        headerTitle: <Text style={styles.titleStyle}>Payment</Text>,
        tabBarIcon: ({ tintColor }) => {
            return <Icon style={{ color: tintColor }} name = 'ios-home' />;
        },
        headerLeft: <BackButton back={navigation.goBack}/>
    });

    render() {
        return (
            <View style={{flex:1, backgroundColor:'white'}}>
                {(this.state.webLoaded) ? null : <Spinner style={{backgroundColor: 'transparent'}} color="#FF6F00" />}
                <WebView
                    source={{uri: PAY_URL}}
                    style={{flex:1, width: SCREEN_WIDTH}}
                    onLoadEnd={() => this.setState({webLoaded: true})}
                />
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

export default Pay;
