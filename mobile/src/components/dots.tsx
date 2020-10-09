import React from 'react';
import {  Animated } from 'react-native';

const Dot = ({index, currentIndex}) => {
    let opacity = currentIndex.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0.5, 1, 0.5],
        extrapolate: 'clamp',
    });
    let scale =  currentIndex.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [1, 1.25, 1],
        extrapolate: 'clamp',
    });
    return (
        <Animated.View style={{
            opacity,
            backgroundColor: '#fff',
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 10,
            marginRight: 10,
            transform: [{scale}],
        }}/>
    )
}

export default Dot;