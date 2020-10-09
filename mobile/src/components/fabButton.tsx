import React, {Component} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();

export default function FabButton({style}) {
    return (
            <View style={[styles.container, style]}>
                <TouchableWithoutFeedback >
                    <Animated.View style={styles.button}>
                        <AntDesign name="plus" size={15} color="white"/>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
}

const styles = StyleSheet.create({
    container:{
        // alignItems: 'center',
        // position: 'absolute'
        justifyContent: 'flex-end'
    },
    button:{
        // position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 60 / 2,
        justifyContent: 'center',
        backgroundColor: '#5B939A',
        alignItems: 'center',
        shadowRadius: 10,
        shadowColor: '#00213B',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10,
            width: 10
        }
    }
});