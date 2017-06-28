import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image, LayoutAnimation, UIManager } from 'react-native';
import { Button } from 'native-base';

//get screen width
const SCREEN_WIDTH = Dimensions.get('window').width;

//temporary icons
const musicIcon         = require('../assets/icons/interests/music.png');
const airplaneIcon      = require('../assets/icons/interests/airplane.png');
const atomIcon          = require('../assets/icons/interests/atomic.png');
const babyIcon          = require('../assets/icons/interests/baby.png');
const charityIcon       = require('../assets/icons/interests/charity.png');
const communityIcon     = require('../assets/icons/interests/community.png');
const electionsIcon     = require('../assets/icons/interests/elections.png');
const footballIcon      = require('../assets/icons/interests/football.png');
const idIcon            = require('../assets/icons/interests/id.png');
const movieIcon         = require('../assets/icons/interests/movie.png');
const playIcon          = require('../assets/icons/interests/play.png');
const prayIcon          = require('../assets/icons/interests/praying.png');

//tenporary data
const DATA = {
    interests: [
        {
            id: 0,
            name: "Music",
            icon: musicIcon
        },
        {
            id: 1,
            name: "Travel",
            icon: airplaneIcon
        },
        {
            id: 2,
            name: "Science & Tech",
            icon: atomIcon
        },
        {
            id: 3,
            name: "Education",
            icon: babyIcon
        },
        {
            id: 4,
            name: "Charity",
            icon: charityIcon
        },
        {
            id: 5,
            name: "Community",
            icon: communityIcon
        },
        {
            id: 6,
            name: "Government",
            icon: electionsIcon
        },
        {
            id: 7,
            name: "Sports",
            icon: footballIcon
        },
        {
            id: 8,
            name: "Business",
            icon: idIcon
        },
        {
            id: 9,
            name: "Movies",
            icon: movieIcon
        },
        {
            id: 10,
            name: "The Arts",
            icon: playIcon
        },
        {
            id: 11,
            name: "Spirituality",
            icon: prayIcon
        }
    ]
};

class Interests extends Component {

    componentDidMount() {
        //poor android
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    //nice spring animation
    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    //default component level state
    state = {
        progress: 0,
        interests: []
    };

    //render border of selected tile
    renderBorder(id) {
        if(this.state.interests.indexOf(id) > -1) {
            return styles.selectedInterestStyle;
        }
        return;
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
            console.log(this.state.interests)
        } else {
            let interests = this.state.interests;
            interests.splice(interests.indexOf(id), 1);
            this.setState({
                progress: this.state.progress - 0.2,
                interests
            });
            console.log(this.state.interests)
        }
    }

    //render the different tiles
    renderInterests() {
        const {
            interestGridStyle,
            interestContainerStyle,
            interestIconStyle,
            interestTextStyle
        } = styles;
        return DATA.interests.map((interest) => {
            return (
                <TouchableOpacity onPress={() => {this.renderProgress(interest.id)}} key={interest.id}>
                    <View style={ interestGridStyle }>
                        <View style={[ interestContainerStyle , this.renderBorder(interest.id)]}>
                            <Image source={interest.icon} style={ interestIconStyle } />
                            <Text style={ interestTextStyle }>{interest.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        });
    }

    //if user has selected 5 or more interests, show continue button
    renderContinueButton() {
        const {
            buttonStyleContainer,
            buttonStyle,
            buttonTextStyle
        } = styles;
        if( this.state.interests.length >= 5) {
            return(
                <View style={ buttonStyleContainer }>
                    <Button onPress={() => this.props.navigation.navigate('mainApp') } style={ buttonStyle }>
                        <Text style={ buttonTextStyle }>You're all set! Start Your Adventure</Text>
                    </Button>
                </View>
            );
        }
        return;
    }

    render() {
        if(this.props.navigation.state.params) {
            console.log("-->",this.props.navigation.state.params.user,"<--");
        }
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
                <View style={ scrollContainerStyle }>
                    <ScrollView contentContainerStyle={ scrollViewStyle }>
                        {this.renderInterests()}
                    </ScrollView>
                </View>
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
        marginTop: 6
    },
    selectedInterestStyle: {
        borderWidth: 4,
        borderColor: '#FF6F00'
    }
}

export default Interests;
