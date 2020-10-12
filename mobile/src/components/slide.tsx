import React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import Feel from '../pages/my-diary/feel';
import Medicine from '../pages/my-diary/medicine';
import Symptoms from '../pages/my-diary/symptoms';
import DiaryResume from '../pages/my-diary/resume';
import Icon from 'react-native-vector-icons/Fontisto';
import {
    useFonts,
    Cabin_400Regular
  } from '@expo-google-fonts/cabin';
import { AppLoading } from 'expo';
Icon.loadFont();

const {width, height} = Dimensions.get("window");

const Slide = ({index, navigation}) => {
    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });
    const slide = index === 0 ? < Feel /> : (index === 1 ? <Medicine navigation={navigation} /> : (index === 2 ? <Symptoms/> : <DiaryResume/> ));
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return ( 
            <View style={styles.slide}>
                { slide }
            </View>     
        );
    }
};

const styles = StyleSheet.create({
    slide:{
        width
    },
    container:{
        
    },
    card:{
        height: 430,
        marginTop: 30,
    },
    logo:{
        alignSelf: 'center',
        marginTop: 20
    },
    divider:{
        height: 1,
        marginTop: 20,
        width: 350,
        alignSelf:'center',
        backgroundColor: '#9c9c9c',
    },
    titleFeel:{
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
    },
    option:{
        fontSize:15,
        marginLeft: 60,
        marginTop: 40,
        fontFamily: 'Cabin_400Regular',
        fontStyle: 'normal',
        marginBottom: 20,
    },
    options:{
        marginTop: 5,
    },
});

export default Slide;