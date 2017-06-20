import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { Item, Input, Label, Button, Picker } from 'native-base';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ICON_DIR = '../assets/icons/interests/';

const musicIcon     = require('../assets/icons/interests/music.png');
const airplaneIcon  = require('../assets/icons/interests/airplane.png');
const atomIcon  = require('../assets/icons/interests/atomic.png');
const babyIcon  = require('../assets/icons/interests/baby.png');
const charityIcon  = require('../assets/icons/interests/charity.png');
const communityIcon  = require('../assets/icons/interests/community.png');
const electionsIcon  = require('../assets/icons/interests/elections.png');
const footballIcon  = require('../assets/icons/interests/football.png');
const idIcon  = require('../assets/icons/interests/id.png');
const movieIcon  = require('../assets/icons/interests/movie.png');
const playIcon  = require('../assets/icons/interests/play.png');
const prayIcon  = require('../assets/icons/interests/praying.png');

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
    renderInterests() {
        return DATA.interests.map((interest) => {
            return (
                <TouchableOpacity key={interest.id}>
                    <View style={{width: SCREEN_WIDTH / 3, height: SCREEN_WIDTH / 3, position:'relative'}}>
                        <View style={{position: 'absolute', left: 8, right: 8, bottom: 8, top: 8, backgroundColor: 'white', alignItems: 'center', justifyContent:'center'}}>
                            <Image source={interest.icon} style={{width: 50, height: 50}} />
                            <Text style={{marginTop: 6}}>{interest.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold', color: '#FF6F00'}}>Let's Get Personal</Text>
                    <Text style={{textAlign: 'center', fontSize: 18, color: '#333', padding: 16}}>For a personalized experience we need to know what are you in to. Choose your favorite interests</Text>
                </View>
                <View style={{height: 6, width: SCREEN_WIDTH, backgroundColor:'#F5F5F5'}}>
                    <View style={{height: 6, width: SCREEN_WIDTH / 3, backgroundColor: '#FF6F00'}} />
                </View>
                <View style={{flex: 2, backgroundColor: '#EEEEEE', flexDirection:'row', flexWrap: 'wrap'}}>
                    <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        {this.renderInterests()}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default Interests;
