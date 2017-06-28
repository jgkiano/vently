import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image, Platform } from 'react-native';
import { Button } from 'native-base';

const SCREEN_WIDTH = Dimensions.get('window').width;

const slide1 = Platform.OS === 'ios' ? require('../assets/images/slide1.jpg') : require('../assets/images/android-slide1.jpg');
const slide2 = Platform.OS === 'ios' ? require('../assets/images/slide2.jpg') : require('../assets/images/android-slide2.jpg');
const slide3 = Platform.OS === 'ios' ? require('../assets/images/slide3.jpg') : require('../assets/images/android-slide3.jpg');
const slide4 = Platform.OS === 'ios' ? require('../assets/images/slide4.jpg') : require('../assets/images/android-slide4.jpg');

const DATA = [
    {
        key: 0,
        image: slide1,
        text: 'Expereince More, Live More.'
    },
    {
        key: 1,
        image: slide2,
        text: 'Go on memorable adventures'
    },
    {
        key: 2,
        image: slide3,
        text: 'Share those amazing moments'
    },
    {
        key: 3,
        image: slide4,
        text: 'Well, what are you waiting for?'
    }
]

class Slides extends Component {

    renderDots(currentSlide) {
        return DATA.map((slide, index) => {
            if(currentSlide === index) {
                return(
                    <View key={index} style={[styles.dot, styles.dotActive]} />
                );
            }
            return(
                <View key={index} style={[styles.dot]} />
            );
        });
    }

    renderLastSlide(index) {
        if(index === DATA.length -1) {
            return(
                <Button onPress={this.props.onComplete} style={{marginTop: 16, backgroundColor: '#FF6F00'}} block warning>
                    <Text style={{color: 'white', fontSize: 16}}>Get Started!</Text>
                </Button>
            );
        }
    }

    renderSlides() {
        return DATA.map((slide, index) => {
            return (
                <View key={slide.key} style={{flex: 1}}>
                    <Image source={slide.image} style={{flex: 1, width: SCREEN_WIDTH, height: null}} />
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>{slide.text}</Text>
                        <View style={styles.dotContainer}>
                            {this.renderDots(index)}
                        </View>
                        {this.renderLastSlide(index)}
                    </View>
                </View>
            );
        });
    }

    render() {
        return (
            <ScrollView
                horizontal
                style={{flex: 1}}
                pagingEnabled
                style={styles.scrollStyle}
            >
            {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    scrollStyle: {
        backgroundColor: '#333'
    },
    textContainer: {
        position: 'absolute',
        backgroundColor: 'transparent',
        bottom: 64,
        left: 32,
        width: SCREEN_WIDTH - 64
    },
    textStyle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.7)',
        textShadowOffset: {width: 0, height: 2}
    },
    dotContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 16
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FF6F00',
        marginRight: 8
    },
    dotActive: {
        backgroundColor: '#FF6F00'
    }
};

export default Slides;
