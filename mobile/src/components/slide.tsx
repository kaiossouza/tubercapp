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

const Slide = ({index, navigation} : {index: any, navigation: any}) => {
    let [fontsLoaded] = useFonts({
        Cabin_400Regular,
    });
    const slide = index === 0 ? < Feel /> : (index === 1 ? <Medicine  /> : (index === 2 ? <Symptoms/> : <DiaryResume/> ));
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
        width,
    }
});

export default Slide;