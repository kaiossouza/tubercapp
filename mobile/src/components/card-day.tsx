import React from 'react';
import { Card } from 'react-native-elements';
import { StyleSheet, Text } from 'react-native';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';

const CardDay = ({itemDay, itemName}) => {
    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else if(itemDay == 2){
        return (
            <Card containerStyle={[styles.content, { backgroundColor: '#5B939A', borderColor: '#5B939A'}]} >
                <Text style={[styles.day, {color: 'white'}]}>{itemDay}</Text>
                <Text style={[styles.dayName, {color: 'white'}]}>{itemName}</Text>
            </Card>
        )
    } else{
        return (
            <Card containerStyle={styles.content} >
                <Text style={styles.day}>{itemDay}</Text>
                <Text style={styles.dayName}>{itemName}</Text>
            </Card>
        )
    }
}

export default CardDay;


const styles = StyleSheet.create({
    content: {
        backgroundColor: '#fff',
        width: 50,
        height: 80,
        borderRadius: 30,
        margin: 7,
    },
    day:{
        alignSelf: 'center',
        fontFamily: 'Cabin_400Regular',
        width: 30,
        textAlign: 'center',
        fontSize: 20,
    },
    dayName:{
        fontSize: 13,
        alignSelf: 'center',
        textAlign: 'center',
        width: 30,
    },
});