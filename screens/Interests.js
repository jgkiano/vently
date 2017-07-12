import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity, Dimensions, ScrollView, Image, LayoutAnimation, UIManager } from 'react-native';
import { Button, Spinner } from 'native-base';

import { connect } from 'react-redux';
import * as actions from '../actions';

import config from '../config';

//get screen width
const SCREEN_WIDTH = Dimensions.get('window').width;

class Interests extends Component {
    //default component level state
    state = {
        loading: true,
        data: [],
        progress: 0,
        interests: [],
        saving: false
    }

    componentDidMount() {
        //poor android
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    //nice spring animation
    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    //determine progress as user taps
    renderProgress = (id) => {
        if(this.state.interests.indexOf(id) === -1) {
            let interests = this.state.interests;
            interests.push(id);
            this.setState({
                progress: this.state.progress + 0.2,
                interests
            });
        } else {
            let interests = this.state.interests;
            interests.splice(interests.indexOf(id), 1);
            this.setState({
                progress: this.state.progress - 0.2,
                interests
            });
        }
    }

    //render border of selected tile
    renderBorder = (id) => {
        if(this.state.interests.indexOf(id) > -1) {
            return styles.selectedInterestStyle;
        }
        return;
    }

    //render the different tiles
    renderInterests = () => {
        const {
            interestGridStyle,
            interestContainerStyle,
            interestIconStyle,
            interestTextStyle
        } = styles;
        return this.props.data.map((interest) => {
            return (
                <TouchableOpacity onPress={() => {this.renderProgress(interest._id)}} key={interest._id}>
                    <View style={ interestGridStyle }>
                        <View style={[ interestContainerStyle , this.renderBorder(interest._id)]}>
                            <Image source={{uri: interest.icon}} style={ interestIconStyle } />
                            <Text style={ interestTextStyle }>{interest.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        });
    }

    renderBottomSection = () => {
        const {scrollContainerStyle, scrollViewStyle } = styles;
        if(this.props.data) {
            return(
                <View style={ scrollContainerStyle }>
                    <ScrollView contentContainerStyle={ scrollViewStyle }>
                        {this.renderInterests()}
                    </ScrollView>
                </View>
            );
        }
        if(this.props.token && !this.props.data) {
            console.log(this.props.token);
            this.props.getInterests();
        }
        return(
            <View style={{flex: 2, backgroundColor:'#eeeeee', justifyContent: 'center', alignItems: 'center'}}>
                <Spinner color="#FF6F00" />
            </View>
        );
    }

    renderButtonContent = () => {
        if(this.state.saving) {
            return <Spinner color='white' />;
        }
        return <Text style={ styles.buttonTextStyle }>You are all set. Start Your Adventure</Text>;
    }

    //if user has selected 5 or more interests, show continue button
    renderContinueButton = () => {
        const {
            buttonStyleContainer,
            buttonStyle,
        } = styles;
        if( this.state.interests.length >= 5) {
            return(
                <View style={ buttonStyleContainer }>
                    <Button onPress={() => this.props.saveInterests(this.state.interests, this.props.token, this.props.navigation) } style={ buttonStyle }>
                        {this.renderButtonContent()}
                    </Button>
                </View>
            );
        }
        return;
    }

    render() {
        const {
            mainContainerStyle,
            heroMessageContainerStyle,
            mainTextStyle,
            mainTextDescStyle,
            progressContainerStyle,
            progressStyle,
            scrollContainerStyle,
            scrollViewStyle
        } = styles;
        return (
            <View style={ mainContainerStyle }>
                <View style={ heroMessageContainerStyle }>
                    <Text style={ mainTextStyle }>Let's Get Personal</Text>
                    <Text style={ mainTextDescStyle }>
                        For a personalized experience we need to know what are you in to. Choose your favorite interests
                    </Text>
                    {this.renderContinueButton()}
                </View>
                <View style={ progressContainerStyle }>
                    <View style={ [ progressStyle, { width: SCREEN_WIDTH * this.state.progress } ] } />
                </View>
                {this.renderBottomSection()}
            </View>
        );
    }
}

const styles = {
    mainContainerStyle: {
        flex: 1
    },
    heroMessageContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainTextStyle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF6F00'
    },
    mainTextDescStyle: {
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
        padding: 16
    },
    progressContainerStyle: {
        height: 6,
        width: SCREEN_WIDTH,
        backgroundColor:'#F5F5F5'
    },
    progressStyle: {
        height: 6,
        backgroundColor: '#FF6F00'
    },
    scrollContainerStyle: {
        flex: 2,
        backgroundColor: '#EEEEEE',
        flexDirection:'row',
        flexWrap: 'wrap'
    },
    scrollViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    buttonStyleContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: '#FF6F00',
        alignItems: 'center'
    },
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold'
    },
    interestGridStyle: {
        width: SCREEN_WIDTH / 3,
        height: SCREEN_WIDTH / 3,
        position:'relative'
    },
    interestContainerStyle: {
        position: 'absolute',
        left: 8,
        right: 8,
        bottom: 8,
        top: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 30
    },
    interestIconStyle: {
        width: 50,
        height: 50
    },
    interestTextStyle: {
        marginTop: 6,
        paddingLeft: 2,
        paddingRight: 2,
        textAlign: 'center'
    },
    selectedInterestStyle: {
        borderWidth: 4,
        borderColor: '#FF6F00'
    }
}

function mapStateToProps({ interests }) {
    return interests;
}

export default connect(mapStateToProps, actions)(Interests);
